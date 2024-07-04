import { useEffect, useState } from "react";
import { GAME_STATE, sketchInstance } from "../../core/gameState";
import api from "../../core/axios";
import Modal from "../common/modal";
import Loading from "../common/loading";
import { handleError } from "@/utils/helpers";
import "./style.css";
import clsx from "clsx";

const MAX_TANK = 5;

export default function SelectTank({
  show,
  needSlot = 0,
  onSelectTank = () => {},
  onClose = () => {},
}: {
  show: boolean;
  needSlot?: number;
  onSelectTank?: (x: ITank) => void;
  onClose?: () => void;
}) {
  const [tanks, setTanks] = useState<ITank[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getListTanks = async () => {
      try {
        setLoading(true);

        const { data } = await api.getAllTanks({
          userId: GAME_STATE.user.value?._id,
        });
        setTanks(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const getListAppearance = async () => {
      const { data } = await api.getUserAppearances();
      GAME_STATE.appearance.value = data;
    };

    GAME_STATE.user.value?._id && show && getListTanks();
    GAME_STATE.user.value?._id && getListAppearance();
  }, [GAME_STATE.user.value, show]);

  const handleNewTank = async () => {
    try {
      let newTank = prompt("Enter tank name", `Tank ${tanks.length + 1}`);
      const { data } = await api.createTank(newTank);
      if (data._id) {
        onSelectTank(data);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      {show && (
        <Modal handleClose={onClose} className="absolute -top-20 2xl:top-40">
          <div className="tank-holder scale-75 2xl:scale-100">
            {loading ? (
              <div className="h-40 flex items-center">
                <Loading className="scale-150" />
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-4 max-w-[700px]">
                {tanks.slice(0, MAX_TANK).map((x) => (
                  <div
                    className={clsx(
                      "flex gap-4 p-4 border-4 border-dashed rounded-xl w-[240px] aspect-[3/2]",
                      needSlot <= x.size - (x.noBug || 0)
                        ? "cursor-pointer hover:border-[orange]/50 hover:bg-[burlywood]/20"
                        : "opacity-30"
                    )}
                    onClick={() => onSelectTank(x)}
                  >
                    <div className="text-xl text-left">
                      <p>
                        <b>Name</b>: {x.name}
                      </p>
                      <p>
                        <b>Capacity</b>: {x.noBug}/{x.size}
                      </p>
                      <p>
                        <b>Flower</b>: {x.noFlower}
                      </p>
                    </div>
                  </div>
                ))}
                {new Array(MAX_TANK - tanks.length).fill(null).map(() => (
                  <div
                    className="flex gap-4 px-4 py-2 items-center justify-center border-4 border-dashed hover:border-[burlywood] rounded-xl cursor-pointer w-[200px] aspect-[3/2]"
                    onClick={handleNewTank}
                  >
                    <span className="font-bold text-[32px] text-[#e5e7eb]">
                      EMPTY
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
