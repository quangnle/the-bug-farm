import { useEffect, useRef, useState } from "react"
import Button from "../common/button"
import Modal from "../common/modal"
import BorderContainer from "../border-container"
import p5 from "p5"
import {
  PATTERN,
  SELECTED_COLOR,
  SIZE,
  draw,
  handleLoadDraft,
  mousePressed,
  mouseReleased,
  setup,
} from "./useCreatePattern"
import { sketchInstance } from "@/core/gameState"
import api from "@/core/axios"
import { handleError } from "@/utils/helpers"
import BugPatternWithoutApp from "../bug-pattern/bug-pattern-without-app"

export default function CreatePattern() {
  const [show, setShow] = useState(false)
  const canvasRef = useRef(null)
  const p5Ref = useRef<p5 | null>(null)

  const [drafts, setDrafts] = useState([])

  const [name, setName] = useState("")

  useEffect(() => {
    if (show) {
      sketchInstance?.noLoop()
      p5Ref.current = new p5((s) => {
        s.setup = () => setup(s, canvasRef.current)
        s.draw = () => draw(s)
        s.mousePressed = () => mousePressed(s)
        s.mouseReleased = () => mouseReleased()
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
        alert("Required pattern name")
        return
      }
      await api.createAppearance({
        name,
        pattern: PATTERN.value,
      })
      setShow(false)
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    try {
      const _drafts = JSON.parse(localStorage.getItem("drafts") || "[]")
      setDrafts(_drafts)
    } catch (error) {
      handleError(error)
    }
  }, [])

  const handleSaveDraft = () => {
    if (!name) {
      alert("Required pattern name")
      return
    }
    const newDrafts = [
      ...drafts,
      {
        name,
        pattern: PATTERN.value,
      },
    ]
    localStorage.setItem(
      "drafts",
      JSON.stringify([
        ...drafts,
        {
          name,
          pattern: PATTERN.value,
        },
      ])
    )
    setDrafts(newDrafts)
  }

  const handleDeleteDraft = (draft) => {
    const newDrafts = drafts.filter((d) => d !== draft)
    localStorage.setItem("drafts", JSON.stringify(newDrafts))
    setDrafts(newDrafts)
  }

  return (
    <>
      <Button onClick={() => setShow(true)}>Create pattern</Button>
      {show && (
        <Modal
          handleClose={() => setShow(false)}
          className="flex gap-2 flex-row"
        >
          <BorderContainer className="p-4 bg-green-200 flex flex-col">
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
                <Button className="mt-4" onClick={handleSaveDraft}>
                  Save draft
                </Button>

                <label className="mt-4">
                  <span>Size: </span>
                  <select
                    onChange={(event) => {
                      SIZE.value = parseInt(event.target.value)
                    }}
                  >
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                  </select>
                </label>
                <label className="mt-4">
                  <span className="font-bold">Pattern name: </span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </label>
                <div className="flex items-center gap-4 mt-auto">
                  <Button onClick={handleSubmit}>Create Pattern</Button>
                  <p className="text-md">It cost $200</p>
                </div>
              </div>
            </div>
          </BorderContainer>
          <BorderContainer className="bg-green-200 flex items-center justify-center p-4">
            {drafts.length === 0 ? (
              <p className="text-xl">No draft</p>
            ) : (
              <div className="flex flex-col gap-2 w-full">
                {drafts.map((draft, index) => (
                  <div className="flex gap-2">
                    <div className="w-32 h-32 aspect-square">
                      <BugPatternWithoutApp pattern={draft.pattern} />
                    </div>
                    <div>
                      <div className="">Name: {draft.name}</div>
                      <div className="flex flex-col gap-2">
                        <Button onClick={() => handleLoadDraft(draft)}>
                          Load
                        </Button>
                        <Button className="danger" onClick={() => handleDeleteDraft(draft)}>
                          Delete
                        </Button>
                      </div>
                    </div>
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
