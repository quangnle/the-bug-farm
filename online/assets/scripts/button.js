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


  document.querySelectorAll('.border-wrapper').forEach(ele => {
    setupBorder(ele)
  })

  document.querySelectorAll('.tabs > .btn').forEach((ele, key) => {
    const target = document.querySelector('.tab-body')
    ele.addEventListener('click', () => {
      target.setAttribute('data-tab', [
        'flower-seed',
        'object-list'
      ][key])
    })
  })

  document.querySelectorAll('input[name="mode-switch"]').forEach(ele => {
    ele.addEventListener('click', event => {
      const { value } = event.target
      farm.mode = value
      ele.parentElement.classList.toggle('active')
    })
  })
}

const setupBorder = (tag) => {
  const decorEle = document.createElement('div')
  decorEle.className = 'decor'
  decorEle.innerHTML = `
    <div class="corner__top-left corner"></div>
    <div class="corner__top-right corner"></div>
    <div class="corner__bottom-left corner"></div>
    <div class="corner__bottom-right corner"></div>

    <div class="line__left line"></div>
    <div class="line__right line"></div>
    <div class="line__top line"></div>
    <div class="line__bottom line"></div>
  `
  tag.appendChild(decorEle)
}