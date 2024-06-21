import { useEffect, useRef, useState } from "react";
import Button from "../common/button";
import Modal from "../common/modal";
import BorderContainer from "../border-container";
import p5 from "p5";
import { PATTERN, SELECTED_COLOR, draw, mouseDragged, setup } from "./useCreatePattern"
import { sketchInstance } from "@/core/gameState";
import api from "@/core/axios";
import { handleError } from "@/utils/helpers";

export default function CreatePattern() {
  const [show, setShow] = useState(false)
  const canvasRef = useRef(null)
  const p5Ref = useRef<p5 | null>(null)

  const [name, setName] = useState('')

  useEffect(() => {
    if (show) {
      sketchInstance?.noLoop()
      p5Ref.current = new p5((s) => {
        s.setup = () => setup(s, canvasRef.current)
        s.draw = () => draw(s),
        s.mousePressed = () => mouseDragged(s)
      })
    } else {
      sketchInstance?.loop()
      p5Ref.current?.remove()
    }
    return () => {
      p5Ref.current?.remove()
    }
  }, [show])

  const handleSubmit = async () => {
    try {
      if (!name) {
        alert('Required pattern name')
        return
      }
      await api.createAppearance({
        name,
        pattern: PATTERN.value
      })
      setShow(false)
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <>
      <Button onClick={() => setShow(true)}>Create pattern</Button>
      {show && (
        <Modal handleClose={() => setShow(false)}>
          <BorderContainer className="w-[800px] h-[500px] p-4 bg-green-200 flex flex-col">
            <h1 className="text-center">Create Pattern</h1>
            <div className="flex flex-1 gap-2">
              <div className="">
                <canvas ref={canvasRef}></canvas>
              </div>
              <div className="flex flex-col">
                <input
                  type="color"
                  id="color-picker"
                  onChange={(event) => {
                    SELECTED_COLOR.value = event.target.value
                  }}
                  value={SELECTED_COLOR.value}
                />

                <label className="mt-4">
                  <span className="font-bold">Pattern name: </span>
                  <input value={name} onChange={(event) => setName(event.target.value)} />
                </label>
                <div className="flex items-center gap-4 mt-auto">
                  <Button onClick={handleSubmit}>Create Pattern</Button>
                  <p className="text-md">It cost $200</p>
                </div>
              </div>
            </div>
          </BorderContainer>
        </Modal>
      )}
    </>
  )
}