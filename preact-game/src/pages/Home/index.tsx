import LoginForm from "@/components/login-form"
import BorderContainer from "../../components/border-container"
import "./style.css"
import GameBody from "@/components/game-body"
import FlowerPlant from "@/components/flower-plant"
import { useEffect, useState } from "react"
import { handleError } from "@/utils/helpers"
import api from "@/core/axios"
import { GAME_STATE } from "@/core/gameState"
import GameHeader from "@/components/game-header"
import SelectedObject from "@/components/selected-object"
import IconButtons from "@/components/icon-buttons"
import BugList from "@/components/bug-list"
import Market from "@/components/market"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const { data } = await api.me()
        if (data) {
          GAME_STATE.user.value = data
        }
      } catch (error) {
        handleError(error)
      } finally {
        setLoading(false)
      }
    }

    autoLogin()
  }, [])

  return (
    <div className="homepage h-screen overflow-hidden">
      <div className="mx-auto">
        <div className="flex flex-col gap-8">
          {!loading && <LoginForm />}
          <GameHeader />
          <div className="flex gap-8">
            <GameBody loading={loading} />
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
