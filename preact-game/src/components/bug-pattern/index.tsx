import { PATTERN_DEFAULT } from "@/core/constants"
import { GAME_STATE } from "@/core/gameState"
import { drawSvg } from "@/core/utils"
import { useEffect, useRef } from "react"

export default function BugPattern({ appc } : { appc:  string}) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      const { pattern } =
        GAME_STATE.appearance.value.find((x) => x._id === appc) ||
        PATTERN_DEFAULT
      drawSvg(ref.current, pattern)
    }
  }, [appc])

  return (
    <svg
      ref={ref}
      className="output w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1 1"
      shape-rendering="crispEdges"
    >
      <path fill="red" stroke="#000000" d="M0" />
    </svg>
  )
}