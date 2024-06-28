import { useState } from "react"
import IconButtons from "../icon-buttons"
import Modal from "../common/modal"
import BorderContainer from "../border-container"
import { GAME_STATE } from "@/core/gameState"
import clsx from "clsx"
import BugPattern from "../bug-pattern"

export default function Genes() {
  const [show, setShow] = useState(false)
  return (
    <>
      <IconButtons onClick={() => setShow(true)}>Genes</IconButtons>
      {show && (
        <Modal handleClose={() => setShow(false)}>
          <BorderContainer className="bg-black/60 p-4">
            <h1 className="text-center">Genes Collection</h1>

            <div className="">
              <h1 className="text-3xl">Custom genes</h1>
              <div
                className="grid gap-4 w-[70vw] max-w-[1000px]"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                }}
              >
                {GAME_STATE.appearance.value.map((app: IAppearance) => {
                  return (
                    <BorderContainer
                      key={app._id}
                      className={clsx(
                        "border-2 p-2 hover:bg-green-600 gap-4 text-white cursor-pointer"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-fit bg-red-600">
                          <BugPattern app={app} />
                        </div>
                        <div className="py-2">
                          <p>
                            <b>Pattern</b>: {app.name}
                          </p>
                          <p>Score: {app.score}</p>
                        </div>
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
