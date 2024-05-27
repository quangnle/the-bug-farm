// Element
const AUTH_ELE = document.querySelector('.auth-overlay')
const LOGIN_ELE = document.querySelector('.login-box')
const TANKS_ELE = document.querySelector('.tank-list')

// State
let farm = null
let controlPanel = null
let user = null
let tank = null
let appearances = []

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

  const { data } = await api.getAllTanks()
  console.log(data)
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
}

const handleSelectTank = async (x) => {
  if (!x._id) return
  const {data} = await api.getTank(x._id)
  console.log(data)
  tank = data

  AUTH_ELE.classList.toggle('hidden')
  
  tank.bugs.forEach(x => {
    const bug = new Bug(x._id, "#f00", 100, 100, 20, x.angle, x.appearance, x.genes);
    farm.colony.push(bug)
  })
  tank.flowers.forEach(flo => {
    const flower = new Flower(flo.x, flo.y, flo.pistilSize, flo.pistilColor, flo.petalSize, flo.petalColor, flo.petalNumber)
    farm.addObject(flower)
  })
}

const handleSellBug = async () => {
  if (farm.colony.length === 1) return;

  const _find = farm.colony.findIndex(x => x === selectedObj)
  console.log(_find)
  if (_find) {
    const _bug = farm.colony.splice(_find, 1)
    console.log(_bug[0])
    const { data } = await api.sellBug(_bug[0]._id)
    console.log({ data })
  }
}