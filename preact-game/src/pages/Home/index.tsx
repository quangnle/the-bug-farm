import BorderContainer from "../../components/border-container"
import "./style.css"

import { GAME_STATE, sketchInstance } from "../../core/gameState"
import GameBody from "../../components/game-body"
import LoginForm from "../../components/login-form"
import SelectTank from "../../components/select-tank"

export default function Home() {
  return (
    <div className="homepage">
      <div className="container">
        <div className="flex flex-col gap-8">
					<LoginForm show={!GAME_STATE.value.user} />
					<SelectTank show={GAME_STATE.value.user && !GAME_STATE.value.tank} />
          <BorderContainer className="header">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            ullam commodi ea eum quia ipsum, veniam ipsa similique molestias
            quae? Ab amet consequuntur fugit sed a, vitae dolorum numquam.
            Blanditiis.
          </BorderContainer>
          <div className="flex gap-8">
            <GameBody />
            <BorderContainer className="content flex-1"></BorderContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
