const boardEle = document.querySelector("#board")
const boardControlEle = boardEle.querySelector(".board-control")
const boardObjListEle = boardEle.querySelector(".object-list")
const toggleEles = document.querySelectorAll(".board-toggle")

let boardSelectedBugs = []

toggleEles.forEach((ele) => {
  ele.addEventListener("click", () => {
    boardEle.classList.toggle("show")
    drawBoard()
  })
})

const drawBoard = () => {
  const container = boardEle.querySelector('.board-content')
  container.parentElement.addEventListener('click', (e) => {
    !container.contains(e.target) && boardEle.classList.remove('show')
  })
  drawControl()
  
  boardObjListEle.innerHTML = ''
  farm?.colony?.forEach(bug => {
    const child = document.createElement("div")
    child.className = "object-list__item border-wrapper border-2"
    child.setAttribute('data-id', bug._id)

    createObjectItem(child, bug)

    child.addEventListener('click', () => {
      child.classList.toggle('selected')

      if (boardSelectedBugs.includes(bug._id)) {
        boardSelectedBugs.splice(boardSelectedBugs.indexOf(bug._id), 1)
      } else {
        boardSelectedBugs.push(bug._id)  
      }

      toggleBoardBug()
    })
    boardObjListEle.appendChild(child)
  })
}

const drawControl = () => {
  const sellAllBtn = document.querySelector('button[name="sell-all"]')
  sellAllBtn.addEventListener('click', async () => {
    await api.sellBugs({
      tankId: tank._id,
      bugIds: boardSelectedBugs
    })
    sellBugEffect(0, 0)
    farm.colony = farm.colony.filter(x => !boardSelectedBugs.includes(x._id))
    boardSelectedBugs = []
    handleUpdateInformation()
  })
}

const toggleBoardBug = () => {
  document.querySelectorAll('.object-list__item').forEach((ele) => {
    if (boardSelectedBugs.includes(ele.attributes['data-id'].value)) {
      ele.classList.add('selected')
    } else {
      ele.classList.remove('selected')
    }
  })

  if (boardSelectedBugs.length > 0) {
    boardControlEle.classList.add('selected')
  } else {
    boardControlEle.classList.remove('selected')
  }
}

const drawCollection = () => {
  
}