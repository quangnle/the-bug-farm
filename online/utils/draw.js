function drawSvg(tag, rows) {
  // If you're sure all rows are always the same size, it's
  // faster and simpler to just do `rows[0].length`.
  const pixelWidth = rows.reduce((max, row) => Math.max(max, row.length), 0)
  const pixelHeight = rows.length

  // The `viewBox` of a SVG tag is the viewport to draw to.
  // Since we want 1 "pixel" in our vector to be 1 pixel in the output,
  // the viewbox will be 0 -0.5 4 3 for our 4x3 sample image.
  // The -0.5 shift upwards is because of how SVG aligns things.
  tag.setAttribute("viewBox", `0 -0.5 ${pixelWidth} ${pixelHeight}`)
  // The width/height of a SVG tag can be overwritten by CSS to your liking,
  // but having them makes sure the image stays the correct aspect ratio.
  tag.setAttribute("width", pixelWidth)
  tag.setAttribute("height", pixelHeight)

  const path = tag.querySelector("path")

  let data = ""
  for (let line = 0; line < rows.length; line++) {
    // [M]ove absolutely to 0,Y
    data += ` M0,${line}`
    const row = rows[line]
    for (const pixel of row) {
      if (pixel) {
        // Draw a [h]orizontal line, 1 unit wide.
        data += ` h1`
      } else {
        // [m]ove relatively to +1,+0.
        data += ` m1,0`
      }
    }
  }
  // Output will be something like 'M0,0 h1 m1,0 h1'.
  path.setAttribute("d", data)
  const href = `data:image/svg+xml,${encodeURIComponent(tag.outerHTML)}`
}

const createObjectItem = (tag, bug) => {
  tag.innerHTML = `
          <div class="avatar">
            <svg class="output" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" shape-rendering="crispEdges">
              <path fill="none" stroke="#000000" d="M0" />
            </svg>
          </div>
          <div>
            <p><b>ID</b>: ${bug._id}</p>
            <p><b>Pattern: </b>${bug.appearance.name}</p>
          </div>
      `

  // console.log(bug)
  drawSvg(tag.querySelector("svg"), bug.appearance.pattern)
  setupBorder(tag)
  tag.addEventListener("click", () => {
    selectedObj = bug
  })
}
