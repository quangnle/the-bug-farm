import { useState } from "react";
import Modal from "../common/modal";
import IconButtons from "../icon-buttons";
import { GAME_STATE, sketchInstance } from "@/core/gameState";
import SelectTank from "../select-tank";
import "./style.css"
import CreatePattern from "../create-pattern";

export default function Menu() {
  const [show, setShow] = useState(false);

  const [showSelectTank, setShowSelectTank] = useState(false);
  const handleSaveGif = () => {
    sketchInstance.saveGif("myGif", 6, {});
  };

  const handleSelectTank = (x: ITank) => {
    GAME_STATE.tank.value = x;
    setShowSelectTank(false);
    localStorage.setItem("lastTank", x._id);
  };

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
          className="-mt-2 w-10 group-hover:w-12 duration-200"
        />
      </IconButtons>
      {show && (
        <Modal
          handleClose={() => setShow(false)}
          className="absolute top-0 p-0"
        >
          <div className="menu-holder">
            <div className="menu-bush" />
            <button
              onClick={() => {
                setShow(false)
                setShowSelectTank(true)
              }}
            >
              Switch Tank
            </button>
            <CreatePattern closeMenu={() => setShow(false)} />

            <button
              onClick={() => {
                setShow(false);
                handleSaveGif();
              }}
            >
              Save Gif
            </button>

            <button onClick={handleLogout}>Logout</button>
          </div>
          {/* <BorderContainer className="flex flex-col gap-5 p-4 bg-white">
            <Button
              onClick={() => {
                setShow(false);
                setShowSelectTank(true);
              }}
            >
              Switch Tank
            </Button>
            <Button
              onClick={() => {
                setShow(false);
                handleSaveGif();
              }}
            >
              Save Gif
            </Button>
            <CreatePattern closeMenu={() => setShow(false)} />

            <Button onClick={handleLogout}>Logout</Button>
          </BorderContainer> */}
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
