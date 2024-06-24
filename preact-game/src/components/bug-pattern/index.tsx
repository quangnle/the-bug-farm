import { PATTERN_DEFAULT } from "@/core/constants"
import { GAME_STATE } from "@/core/gameState"
import { drawSvg } from "@/core/utils"
import { useEffect, useRef } from "react"

export default function BugPattern({ appc }: { appc?: string }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current) {
      const { pattern } =
        GAME_STATE.appearance.value.find((x) => x._id === appc) ||
        PATTERN_DEFAULT

      const ctx = (canvasRef.current as HTMLCanvasElement).getContext("2d")
      if (!ctx) return
      ctx.fillStyle = "#77dd22"
      ctx.strokeStyle = "#000"
      ctx.rect(0, 0, 80, 80)
      ctx.fill()
      ctx.stroke()

      ctx.clearRect(0, 0, 80, 80)
      let size = 80 / pattern.length
      for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern[i].length; j++) {
          if (pattern[j][i] !== 0) {
            ctx.fillStyle =
              typeof pattern[j][i] === "string" ? pattern[j][i] : "black"
            ctx.fillRect(i * size, j * size, size + 0.5, size + 0.5)
          }
        }
      }
    }
  }, [appc])

  return (
    <canvas
      ref={canvasRef}
      className="object-render-canvas w-full"
      width={80}
      height={80}
    />
  )
}
