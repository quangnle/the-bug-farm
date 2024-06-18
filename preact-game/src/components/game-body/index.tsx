import BorderContainer from "../border-container"
import './style.css'

export default function GameBody() {
  return (
    <div className="game-body">
      <BorderContainer className="sketch-holder">
        <canvas id="main-canvas" />
      </BorderContainer>
    </div>
  )
}
