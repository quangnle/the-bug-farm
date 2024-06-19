import { useEffect, useState } from "react"
import Modal from "../common/modal"
import BorderContainer from "../border-container"
import Bug from "@/core/entity/bug"
import { GAME_STATE, sketchInstance } from "@/core/gameState"
import BugPattern from "../bug-pattern"
import clsx from "clsx"
import api from "@/core/axios"
import Button from "../common/button"
import { sellBugEffect } from "@/core/effect"

export default function BugList() {
  const [show, setShow] = useState(false)
  const [bugs, setBugs] = useState<Bug[]>([])
  const [selectedBugs, setSelectedBugs] = useState<Bug[]>([])

  useEffect(() => {
    if (show) {
      sketchInstance.noLoop()
      setBugs(GAME_STATE.farm.value.colony)
    } else {
      sketchInstance.loop()
    }
  }, [show])

  const handleSellAll = async () => {
    try {
      await api.sellBugs({
        tankId: GAME_STATE.tank.value?._id,
        bugIds: selectedBugs.map((bug) => bug._id),
      })
      GAME_STATE.farm.value.colony = GAME_STATE.farm.value.colony.filter(
        (bug) => !selectedBugs.includes(bug)
      )
      setSelectedBugs([])
      setBugs(GAME_STATE.farm.value.colony)
      sellBugEffect(0, 0)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Button onClick={() => setShow(true)}>Bug List</Button>
      {show && (
        <Modal handleClose={() => setShow(false)}>
          <BorderContainer className="bg-black/60 w-[80vw]">
            <div className="h-[70vh] overflow-y-auto overflow-x-hidden p-4">
              <h1 className="font-bold text-center mb-6">Bug List</h1>
              <div className="h-20 flex items-center">
                {selectedBugs.length > 0 && (
                  <Button onClick={handleSellAll}>Sell All</Button>
                )}
              </div>

              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                }}
              >
                {bugs.map((bug) => {
                  const total = bug.genes.reduce(
                    (acc, gene) => acc + gene.score,
                    0
                  )

                  return (
                    <BorderContainer
                      key={bug._id}
                      className={clsx(
                        "border-2 p-2 hover:bg-green-600 flex items-center gap-4 text-white cursor-pointer",
                        selectedBugs.includes(bug) && "bg-green-600"
                      )}
                      onClick={() => {
                        setSelectedBugs((prev) => {
                          if (prev.includes(bug)) {
                            return prev.filter((b) => b !== bug)
                          } else {
                            return [...prev, bug]
                          }
                        })
                      }}
                    >
                      <div className="w-16 h-16 bg-red-600">
                        <BugPattern appc={bug.appearance._id} />
                      </div>
                      <div className="py-2">
                        <p>
                          <b>Pattern</b>: {bug.appearance.name}
                        </p>
                        <p>
                          <b>Genes</b>:
                        </p>
                        <ul>
                          {bug.genes.map((gene) => (
                            <li>
                              &middot; {gene.name} -{" "}
                              {Math.round((gene.score / total) * 100)}%
                            </li>
                          ))}
                        </ul>
                      </div>
                    </BorderContainer>
                  )
                })}
              </div>
            </div>
          </BorderContainer>
        </Modal>
      )}
    </>
  )
}
