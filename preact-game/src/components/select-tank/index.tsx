import { useEffect, useState } from "react"
import { GAME_STATE } from "../../core/gameState"
import BorderContainer from "../border-container"
import api from "../../core/axios"
import Modal from "../common/modal"

export default function SelectTank() {
  const [tanks, setTanks] = useState<ITank[]>([])

  useEffect(() => {
    const getListTanks = async () => {
      const { data } = await api.getAllTanks({
        userId: GAME_STATE.user.value?._id,
      })
      setTanks(data.data)
    }

    const getListAppearance = async () => {
      const { data } = await api.getAllAppearances()
      GAME_STATE.appearance.value  = data
    }

    GAME_STATE.user.value?._id && getListTanks()
    GAME_STATE.user.value?._id && getListAppearance()
  }, [GAME_STATE.user.value])

  const handleSelectTank = (x: ITank) => {
    GAME_STATE.tank.value = x
  }

  return (
    <>
      {GAME_STATE.user.value?._id && !GAME_STATE.tank.value?._id && (
        <Modal handleClose={() => {}}>
          <BorderContainer className="w-full h-full bg-white p-8 text-center min-w-[650px]">
            <h1>Tank List</h1>
            {tanks.map((x) => (
              <button
                className="bg-orange-50 hover:bg-orange-400 px-8 py-4"
                onClick={() => handleSelectTank(x)}
              >
                {x.name}
              </button>
            ))}
          </BorderContainer>
        </Modal>
      )}
    </>
  )
}
