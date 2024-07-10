import api from "@/core/axios";
import { sketchInstance } from "@/core/gameState";
import { handleError } from "@/utils/helpers";
import { useEffect, useState } from "react";
import BorderContainer from "../border-container";
import Modal from "../common/modal";
import IconButtons from "../icon-buttons";

export default function Inventory() {
  const [show, setShow] = useState(false);
  const [inventory, setInventory] = useState<IInventory>();
  const fetchInventory = async () => {
    try {
      const { data } = await api.getInventory();
      setInventory(data);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    if (show) {
      sketchInstance.noLoop();
      fetchInventory();
    } else {
      sketchInstance.loop();
    }
  }, [show]);

  return (
    <>
      <IconButtons onClick={() => setShow(true)}>Inventory</IconButtons>
      {show && (
        <Modal handleClose={() => setShow(false)}>
          <BorderContainer className="bg-black/60 w-[80vw] text-white py-5">
            <h1 className="text-center font-bold mb-8">Inventory</h1>
            <div className="flex flex-col text-2xl items-center gap-5">
              <p>Dew drop: {inventory?.dewdrop}</p>
              <p>firefly oil essence: {inventory?.oil}</p>
              <p>Gem: {inventory?.gem}</p>
            </div>
          </BorderContainer>
        </Modal>
      )}
    </>
  );
}
