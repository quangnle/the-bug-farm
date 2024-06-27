import { useState } from "react";
import Modal from "../common/modal";
import IconButtons from "../icon-buttons";
import Button from "../common/button";
import { GAME_STATE, sketchInstance } from "@/core/gameState";
import SelectTank from "../select-tank";
import BorderContainer from "../border-container";
import CreatePattern from "../create-pattern";

export default function Menu () {
  const [show, setShow] = useState(false)


  const [showSelectTank, setShowSelectTank] = useState(false)
  const handleSaveGif = () => {
    sketchInstance.saveGif("myGif", 6, {})
  }

  const handleSelectTank = (x: ITank) => {
    GAME_STATE.tank.value = x
    setShowSelectTank(false)
    localStorage.setItem("lastTank", x._id)
  }

  const handleLogout = () => {
    GAME_STATE.user.value = null
    GAME_STATE.tank.value = null
    localStorage.removeItem("token")
    localStorage.removeItem("lastTank")
  }

  return (
    <>
      <IconButtons icon="menu" className="group" onClick={() => setShow(true)}>
        <img
          src="/assets/menu.png"
          className="w-8 group-hover:w-10 duration-200"
        />
      </IconButtons>
      {show && (
        <Modal handleClose={() => setShow(false)}>
          <BorderContainer className="flex flex-col gap-4 p-4 bg-white">
            <Button onClick={() => setShowSelectTank(true)}>Switch Tank</Button>
            <Button onClick={handleSaveGif}>Save Gif</Button>
            <CreatePattern />
            <Button onClick={handleLogout}>Logout</Button>
          </BorderContainer>
        </Modal>
      )}

      <SelectTank
        show={
          !!(GAME_STATE.user.value?._id && !GAME_STATE.tank.value?._id) ||
          showSelectTank
        }
        onSelectTank={handleSelectTank}
        onClose={() => setShowSelectTank(false)}
      />
    </>
  )
}