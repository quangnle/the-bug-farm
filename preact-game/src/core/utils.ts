import { PATTERN_DEFAULT } from "./constants"
import Bug from "./entity/bug"
import { GAME_STATE } from "./gameState"

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

export const getSaleGenesInfo = (genes: IAppearance[] | string[]) => {
  if (genes.length === 0) return ''
  let _genes: IAppearance[]
  if (typeof genes[0] === 'string') {
    _genes = (genes as unknown as string[]).map((x: string) => {
      const _find = GAME_STATE.appearance.value.find((app: any) => app._id === x)
      return _find || PATTERN_DEFAULT
    })
  } else {
    _genes = genes as IAppearance[]
  }
  const total = _genes.reduce((sum, gene) => sum + gene.score, 0)
  return _genes.map(x => `- ${x.name} (${Math.round(x.score / total * 100)}%)`).join("\n")
}