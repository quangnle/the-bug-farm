import LoginForm from "@/components/login-form"
import BorderContainer from "../../components/border-container"
import "./style.css"
import SelectTank from "@/components/select-tank"
import GameBody from "@/components/game-body"
import FlowerPlant from "@/components/flower-plant"
import GameHeader from "@/components/game-header"
import SelectedObject from "@/components/selected-object"
import { GAME_STATE } from "@/core/gameState"
import { useEffect } from "react"

export default function Home() {
  

  const handleSelectTank = (x: ITank) => {
    GAME_STATE.tank.value = x
  }

  return (
    <div className="homepage h-screen overflow-hidden">
      <div className="mx-auto">
        <div className="flex flex-col gap-8">
          <LoginForm />
          <SelectTank
            show={!!(GAME_STATE.user.value?._id && !GAME_STATE.tank.value?._id)}
            onSelectTank={handleSelectTank}
          />
          <BorderContainer className="header">
            <GameHeader />
          </BorderContainer>
          <div className="flex gap-8">
            <GameBody />
            <div className="flex flex-col gap-8 flex-1 min-w-[300px]">
              <BorderContainer className="flex-1 p-4 bg-green-200">
                <SelectedObject />
              </BorderContainer>
              <BorderContainer className="flex-1 p-4 bg-green-200">
                <FlowerPlant />
              </BorderContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
