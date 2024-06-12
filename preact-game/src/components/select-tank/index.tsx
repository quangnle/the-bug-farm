import { useEffect, useState } from "react"
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import { GAME_STATE } from "../../core/gameState"
import BorderContainer from "../border-container"
import api from "../../core/axios"

export default function SelectTank({ show }: { show: boolean }) {
  const [tanks, setTanks] = useState<ITank[]>([])

  useEffect(() => {
    const getListTanks = async () => {
      const { data } = await api.getAllTanks({
        userId: GAME_STATE.value.user?._id,
      })
      setTanks(data.data)
    }

    GAME_STATE.value.user?._id && getListTanks()
  }, [GAME_STATE.value.user])

  const handleSelectTank = (x: ITank) => {
    GAME_STATE.value = { ...GAME_STATE.value, tank: x }
  }

  return (
    <Transition show={show}>
      <Dialog className="relative z-10" onClose={() => {}}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <BorderContainer className="bg-white p-8">
                <DialogPanel className="bg-white">
                  {tanks?.map((x) => (
                    <div onClick={() => handleSelectTank(x)}>{x.name}</div>
                  ))}
                </DialogPanel>
              </BorderContainer>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
