import { useEffect, useState } from "react"
import { GAME_STATE } from "../../core/gameState"
import BorderContainer from "../border-container"
import api from "../../core/axios"
import Modal from "../common/modal"
import Loading from "../common/loading"
import { handleError } from "@/utils/helpers"

const MAX_TANK = 5

export default function SelectTank({ show, onSelectTank = () => {}, onClose = () => {} } : { show: boolean, onSelectTank?: (x: ITank) => void, onClose?: () => void}) {
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

    GAME_STATE.user.value?._id && show && getListTanks()
    GAME_STATE.user.value?._id && getListAppearance()
  }, [GAME_STATE.user.value, show])

  const handleNewTank = async () => {
    try {
      let newTank = prompt('Enter tank name', `Tank ${tanks.length + 1}`)
      const { data } = await api.createTank(newTank)
      if (data._id) {
        onSelectTank(data)
      }
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <>
      {show && (
        <Modal handleClose={onClose}>
          <BorderContainer className="w-full h-full bg-white p-8 text-center min-w-[650px]">
            <h1 className="mb-8">Tank List</h1>
            {loading ? (
              <div className="h-40 flex items-center">
                <Loading className="scale-150" />
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-4 max-w-[700px]">
                {tanks.slice(0, MAX_TANK).map((x) => (
                  <div
                    className="flex gap-4 p-4 border-4 border-dashed hover:border-[burlywood] hover:bg-[burlywood]/20 rounded-xl cursor-pointer w-[240px] aspect-[3/2]"
                    onClick={() => onSelectTank(x)}
                  >
                    <div className="text-xl text-left">
                      <p>
                        <b>Name</b>: {x.name}
                      </p>
                      <p>
                        <b>Capacity</b>: {x.noBug}/{x.size}
                      </p>
                      <p>
                        <b>Flower</b>: {x.noFlower}
                      </p>
                    </div>
                  </div>
                ))}
                {new Array(MAX_TANK - tanks.length).fill(null).map(() => (
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
