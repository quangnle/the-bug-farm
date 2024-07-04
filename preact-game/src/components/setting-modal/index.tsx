import { FC } from "react";
import Modal from "../common/modal";
import BorderContainer from "../border-container";
import { BGM_ENABLE } from "@/core/gameState";

interface IProp {
  handleClose?: () => void;
}

const SettingModal: FC<IProp> = ({ handleClose }) => {
  return (
    <Modal handleClose={handleClose}>
      <BorderContainer className="bg-[#ffd3a4] py-5 px-10 w-full md:w-[500px]">
        <div className="flex items-center justify-between">
          <p className="text-[2rem]">Sound</p>
          <button
            onClick={() => {
              BGM_ENABLE.value = !BGM_ENABLE.value;
            }}
          >
            <img
              className="w-10 hover:w-11"
              src={`/assets/${BGM_ENABLE.value ? "bgm-mute.png" : "bgm.png"}`}
            />
          </button>
        </div>
      </BorderContainer>
    </Modal>
  );
};

export default SettingModal;
