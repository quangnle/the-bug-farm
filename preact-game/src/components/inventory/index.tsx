import api from "@/core/axios";
import { sketchInstance } from "@/core/gameState";
import { handleError } from "@/utils/helpers";
import clsx from "clsx";
import { useEffect, useState } from "react";
import BorderContainer from "../border-container";
import Modal from "../common/modal";
import IconButtons from "../icon-buttons";
import Button from "../common/button";
import CraftGem from "./craft";

export default function Inventory() {
  const [show, setShow] = useState(false);
  const [inventory, setInventory] = useState<IInventory>();
  const [isCrafting, setIsCrafting] = useState(false);
  const fetchInventory = async () => {
    try {
      const { data } = await api.getInventory();
      setInventory(data);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    setIsCrafting(false);
    if (show) {
      sketchInstance.noLoop();
      fetchInventory();
    } else {
      sketchInstance.loop();
    }
  }, [show]);

  return (
    <>
      <IconButtons icon="inventory" onClick={() => setShow(true)} />
      {show && (
        <Modal handleClose={() => setShow(false)}>
          <BorderContainer className="px-5 bg-black/60 w-[60vw] text-white py-5">
            {isCrafting ? (
              <>
                <h1 className="text-center font-bold mb-8">Craft Gem</h1>{" "}
                <div className="flex justify-end mb-4">
                  <Button onClick={() => setIsCrafting((prev) => !prev)}>
                    Inventory
                  </Button>
                </div>
                <CraftGem
                  fetchInventory={fetchInventory}
                  inventory={inventory}
                />
              </>
            ) : (
              <>
                <h1 className="text-center font-bold mb-8">Inventory</h1>
                <div className="flex justify-end mb-4">
                  <Button onClick={() => setIsCrafting((prev) => !prev)}>
                    Craft Gem
                  </Button>
                </div>
                <div className="flex flex-wrap justify-center text-2xl items-center gap-5">
                  <BorderContainer
                    className={clsx(
                      "w-[300px] flex justify-center border-2 p-3 hover:bg-green-600 gap-4 text-white cursor-pointer"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16">
                        <img
                          src="/assets/dewdrop.png"
                          alt="dewdrop"
                          className="w-full h-full object-fit"
                        />
                      </div>
                      <div className="py-2">
                        <p className="line-clamp-1">Dew drop</p>
                        <p className="mt-2">x{inventory?.dewdrop}</p>
                      </div>
                    </div>
                  </BorderContainer>
                  <BorderContainer
                    className={clsx(
                      "w-[300px] flex justify-center border-2 p-3 hover:bg-green-600 gap-4 text-white cursor-pointer"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16">
                        <img
                          src="/assets/oil.png"
                          alt="dewdrop"
                          className="w-full h-full object-fit"
                        />
                      </div>
                      <div className="py-2">
                        <p className="line-clamp-1">firefly oil essence</p>
                        <p className="mt-2">x{inventory?.oil}</p>
                      </div>
                    </div>
                  </BorderContainer>
                  <BorderContainer
                    className={clsx(
                      "w-[300px] flex justify-center border-2 p-3 hover:bg-green-600 gap-4 text-white cursor-pointer"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16">
                        <img
                          src="/assets/gem.png"
                          alt="dewdrop"
                          className="w-full h-full object-fit"
                        />
                      </div>
                      <div className="py-2">
                        <p className="line-clamp-1">Gem</p>
                        <p className="mt-2">x{inventory?.gem}</p>
                      </div>
                    </div>
                  </BorderContainer>
                </div>
              </>
            )}
          </BorderContainer>
        </Modal>
      )}
    </>
  );
}
