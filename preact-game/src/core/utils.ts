export const drawSvg = (tag: SVGElement, rows: number[][]) => {
  const pixelWidth = rows.reduce((max, row) => Math.max(max, row.length), 0)
  const pixelHeight = rows.length
  tag.setAttribute("viewBox", `0 -0.5 ${pixelWidth} ${pixelHeight}`)
  tag.setAttribute("width", pixelWidth.toString())
  tag.setAttribute("height", pixelHeight.toString())

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
  path?.setAttribute("d", data)
}
