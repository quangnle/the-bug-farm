import { GAME_STATE } from "@/core/gameState";
import { useState } from "react";
import Modal from "../common/modal";
import CreatePattern from "../create-pattern";
import IconButtons from "../icon-buttons";
import SelectTank from "../select-tank";
import "./style.css";
import SettingModal from "../setting-modal";

export default function Menu() {
  const [show, setShow] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [showSelectTank, setShowSelectTank] = useState(false);

  const handleSelectTank = (x: ITank) => {
    GAME_STATE.tank.value = x;
    setShowSelectTank(false);
    localStorage.setItem("lastTank", x._id);
  };

  const handleLogout = () => {
    GAME_STATE.user.value = null;
    GAME_STATE.tank.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("lastTank");
  };

  return (
    <>
      <IconButtons icon="menu" className="group" onClick={() => setShow(true)}>
        <img
          src="/assets/menu.png"
          className="-mt-2 w-10 group-hover:w-12 duration-200"
        />
      </IconButtons>
      {showSetting && (
        <SettingModal handleClose={() => setShowSetting(false)} />
      )}
      {show && (
        <Modal
          handleClose={() => setShow(false)}
          className="absolute -top-48 2xl:top-0 p-0"
        >
          <div className="menu-holder scale-75 2xl:scale-100">
            <div className="menu-bush" />
            <button
              onClick={() => {
                setShow(false);
                setShowSelectTank(true);
              }}
            >
              Switch Tank
            </button>
            <CreatePattern closeMenu={() => setShow(false)} />

            <button onClick={() => setShowSetting(true)}>Settings</button>

            <button onClick={handleLogout}>Logout</button>
          </div>
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
  );
}
