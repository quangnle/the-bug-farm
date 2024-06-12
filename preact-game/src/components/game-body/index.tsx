import { useEffect } from "preact/hooks"
import BorderContainer from "../border-container"
import { GAME_STATE } from "../../core/gameState"


export default function GameBody() {
  useEffect(() => {
  }, [GAME_STATE.value])
  return (
    <div class="game-body">
      <BorderContainer className="sketch-holder">
        <canvas id="main-canvas" />
      </BorderContainer>
    </div>
  )
}
