window.onload = () => {
  document.querySelectorAll('.btn.no-border').forEach(ele => {
    const decorEle = document.createElement('div')
    decorEle.className = 'decor'
    decorEle.innerHTML = `
      <div class="corner corner__top-left"></div>
      <div class="corner corner__top-right"></div>
      <div class="corner corner__bottom-left"></div>
      <div class="corner corner__bottom-right"></div>
    `
    ele.appendChild(decorEle)
  })
}