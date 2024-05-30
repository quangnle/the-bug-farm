// Element
const AUTH_ELE = document.querySelector('.auth-overlay')
const LOGIN_ELE = document.querySelector('.login-box')
const TANKS_ELE = document.querySelector('.tank-list')

const MONEY_ELE = document.querySelectorAll('[data-stat="money"]')
const CAPACITY_ELE = document.querySelectorAll('[data-stat="capacity"]')
const FLOWERS_ELE = document.querySelectorAll('[data-stat="flowers"]')
const POPULATION_ELE = document.querySelectorAll('[data-stat="population"]')

// Socket

// State
let farm = null
let controlPanel = null
let user = null
let tank = null
let appearances = []

const syncMe = async () => {
  const { data } = await api.me()
  user = data
  handleUpdateInformation()
} 

const setupInit = async () => {
  console.log('loaded')
  // load appearance
  api.getAllAppearances().then(res => {
    appearances = res.data

    farm = new Farm(0, 0, farmWidth, farmHeight, "#77dd22");
    controlPanel = new ControlPanel(0, farmHeight, farmWidth, 30, "#ffffff");
  })

  const { data } = await api.me()
  if (data._id) {
    user = data
    handleLoginSuccess()
  }
}

LOGIN_ELE.addEventListener('submit', async (event) => {
  event.preventDefault()

  const formData = Object.fromEntries(new FormData(event.target).entries())

  const { data } = await api.login(formData)
  if (data.user._id) {
    user = data.user
    handleLoginSuccess()
  }
})

const handleLoginSuccess = async () => {
  if (!user._id) return

  // Connect socket

  handleUpdateInformation()
  const { data } = await api.getAllTanks({ userId: user._id })
  showTankList(data.data)
}

const showTankList = (list) => {
  LOGIN_ELE.classList.toggle('hidden')
  list.forEach((x, index) => {
    const child = document.createElement('div')
    child.innerText = `Tank #${index + 1}: ${x.name}`
    child.addEventListener('click', event => {
      event.preventDefault()
      handleSelectTank(x)
    })

    TANKS_ELE.appendChild(child)
  })

  const newTankEle = document.createElement('div')
  newTankEle.addEventListener('click', async () => {
    let newTank = prompt('Enter tank name', `Tank ${list.length + 1}`)
    const { data } = await api.createTank(newTank)
    if (data._id) {
      handleSelectTank(data)
    }
  })
  newTankEle.innerText = 'Create new Tank'
  TANKS_ELE.appendChild(newTankEle)
}

const handleSelectTank = async (x) => {
  if (!x._id) return
  const {data} = await api.getTank(x._id)
  tank = data

  AUTH_ELE.classList.toggle('hidden')
  
  tank.bugs.forEach(x => {
    const _x = Math.random() * 1000 + 100
    const _y = Math.random() * 600 + 100
    const bug = new Bug(x._id, "#f00", _x, _y, 20, x.angle, x.appearance, x.genes);
    farm.colony.push(bug)
  })
  tank.flowers.forEach(flo => {
    const flower = new Flower(flo._id, flo.x, flo.y, flo.pistilSize, flo.pistilColor, flo.petalSize, flo.petalColor, flo.petalNumber, flo.hasPollen)
    flower.numberOfPollens = flo.numberOfPollens
    flower.spawningTime = flo.spawningTime
    farm.addObject(flower)
  })
  handleUpdateInformation()

  const eventSource = new EventSource(BASE_URL + '/events-flower');
  eventSource.onmessage = ({ data }) => {
    const {flower} = JSON.parse(data).data
    if (flower._id) {
      const _flower = farm.objects.find(x => x._id === flower._id)
      if (_flower) {
        _flower.hasPollen = flower.hasPollen
        _flower.numberOfPollens = flower.numberOfPollens
        _flower.spawningTime = flower.spawningTime
      }
    }
  };
}

const handleSellBug = async () => {
  if (farm.colony.length === 1) return;

  const _find = farm.colony.findIndex(x => x === selectedObj)
  if (_find >= 0) {
    const _bug = farm.colony.splice(_find, 1)
    await api.sellBug(_bug[0]._id)
    user.money += 1
    handleUpdateInformation()
  }
}

const handleRemoveFlower = async () => {
  farm.objects.forEach(async (obj, index) => {
    if (obj === selectedObj) {
      const removeFlower = farm.objects.splice(index, 1)

      await api.removeFlower(removeFlower[0]._id)
    }
  })
}   

const handleUpdateInformation = () => {
  MONEY_ELE.forEach(x => {
    x.innerText = '$' + user.money
  })
  CAPACITY_ELE.forEach(x => {
    x.innerText = tank?.size || 0
  })
  maxPopulation = tank?.size || 0

  FLOWERS_ELE.forEach(x => {
    x.innerText = farm?.objects.length || 0
  })
  POPULATION_ELE.forEach(x => {
    x.innerText = farm?.colony.length || 0
  })
}