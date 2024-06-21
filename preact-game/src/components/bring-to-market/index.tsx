import { useEffect, useState } from "react"
import Modal from "../common/modal"
import BorderContainer from "../border-container"
import BugPattern from "../bug-pattern"
import { GAME_STATE, selectedObject, sketchInstance } from "@/core/gameState"
import Bug from "@/core/entity/bug"
import api from "@/core/axios"
import Button from "../common/button"

export default function BringToMarket () {
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({
    price: 0,
    description: ''
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const payload = {
        bugId: (selectedObject.value as Bug)._id,
        ...form
      }
      await api.saleListing(payload)
      GAME_STATE.farm.value.colony.splice(GAME_STATE.farm.value.colony.indexOf(selectedObject.value as Bug), 1)
      selectedObject.value = null
      setShow(false)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if (show) {
      sketchInstance.noLoop()
    } else {
      sketchInstance.loop()
    }
  }, [show])

  return (
    <>
      <Button onClick={() => setShow(true)}>Bring to Market</Button>
      {show && (
        <Modal handleClose={() => setShow(false)}>
          <BorderContainer className="bg-white bg-black/60 p-8">
            <h1 className="text-center uppercase">Bring it to Market</h1>
            <div>
              <BorderContainer className="border-2 mb-4">
                <BugPattern
                  appc={(selectedObject.value as Bug).appearance._id}
                />
              </BorderContainer>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <span className="text-xl font-bold text-[orange]">$</span>
                  <input
                    placeholder="Price"
                    type="number"
                    step={1}
                    value={form.price}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        price: parseInt(event.target.value),
                      }))
                    }
                  />
                </label>

                <label className="flex items-center gap-2">
                  <span className="text-xl font-bold text-[orange]">D</span>
                  <input
                    placeholder="Description"
                    type="text"
                    value={form.description}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        description: event.target.value,
                      }))
                    }
                  />
                </label>

                <Button type="submit" className="text-[orange]">Submit</Button>
              </form>
            </div>
          </BorderContainer>
        </Modal>
      )}
    </>
  )
}