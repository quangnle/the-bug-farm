import { useEffect, useState } from "react"
import { GAME_STATE } from "../../core/gameState"
import BorderContainer from "../border-container"
import api from "../../core/axios"
import Modal from "../common/modal"
import Loading from "../common/loading"

export default function SelectTank() {
  const [tanks, setTanks] = useState<ITank[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getListTanks = async () => {
      try {
        setLoading(true)

        const { data } = await api.getAllTanks({
          userId: GAME_STATE.user.value?._id,
        })
        setTanks(data.data)
      } catch(error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
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

  const handleNewTank = async () => {
    try {
      let newTank = prompt('Enter tank name', `Tank ${tanks.length + 1}`)
      const { data } = await api.createTank(newTank)
      if (data._id) {
        handleSelectTank(data)
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <>
      {GAME_STATE.user.value?._id && !GAME_STATE.tank.value?._id && (
        <Modal handleClose={() => {}}>
          <BorderContainer className="w-full h-full bg-white p-8 text-center min-w-[650px]">
            <h1 className="mb-8">Tank List</h1>
            {loading ? (
              <div className="h-40 flex items-center">
                <Loading className="scale-150" />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4">
                {tanks.slice(0, 3).map((x) => (
                  <div
                    className="flex gap-4 p-4 border-4 border-dashed hover:border-[burlywood] rounded-xl cursor-pointer w-[200px] aspect-[3/2]"
                    onClick={() => handleSelectTank(x)}
                  >
                    <div className="text-xl">
                      <p>
                        <b>Name</b>: {x.name}
                      </p>
                      <p>
                        <b>Capacity</b>: {x.size}
                      </p>
                    </div>
                  </div>
                ))}
                {new Array(3 - tanks.length).fill(null).map(() => (
                  <div
                    className="flex gap-4 px-4 py-2 items-center justify-center border-4 border-dashed hover:border-[burlywood] rounded-xl cursor-pointer w-[200px] aspect-[3/2]"
                    onClick={handleNewTank}
                  >
                    <span className="font-bold text-[32px] text-[#e5e7eb]">
                      EMPTY
                    </span>
                  </div>
                ))}
              </div>
            )}
          </BorderContainer>
        </Modal>
      )}
    </>
  )
}
