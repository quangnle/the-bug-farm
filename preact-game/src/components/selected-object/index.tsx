import Bug from "@/core/entity/bug";
import { GAME_STATE, selectedObject } from "@/core/gameState";
import { useEffect, useMemo, useRef, useState } from "react";
import BorderContainer from "../border-container";
import Flower from "@/core/entity/flower";
import { MAX_POLLENS, SPAWN_DURATION } from "@/core/constants";
import BugPattern from "../bug-pattern";
import BringToMarket from "../bring-to-market";
import Button from "../common/button";
import { sellBugEffect } from "@/core/effect";
import api from "@/core/axios";
import SelectTank from "../select-tank";
import { handleError } from "@/utils/helpers";

export default function SelectedObject() {
  const canvasRef = useRef(null);

  const [staticData, setStaticData] = useState<{
    genes?: IAppearance[],
    hungerRate?: number;
    spawningTime?: number;
    numberOfPollens?: number;
  }>({
    genes: [],
    hungerRate: 0,
    spawningTime: 0,
    numberOfPollens: 0,
  });

  const updateSelectedObject = () => {
    if (canvasRef.current && selectedObject.value) {
      const ctx = (canvasRef.current as HTMLCanvasElement).getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#77dd22";
      ctx.strokeStyle = "#000";
      ctx.rect(0, 0, 64, 64);
      ctx.fill();
      ctx.stroke();
      selectedObject.value?.drawIcon(ctx, 32, 32);
      if (selectedObject.value instanceof Bug) {
        setStaticData({
          genes: selectedObject.value.genes,
        });
      }
      if (selectedObject.value instanceof Flower) {
        setStaticData({
          spawningTime: (selectedObject.value as Flower).spawningTime,
          numberOfPollens: (selectedObject.value as Flower).numberOfPollens,
        });
      }
    }
  };

  useEffect(() => {
    updateSelectedObject();
  }, [selectedObject.value?._id]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateSelectedObject();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSellBugApi = async (bug: Bug) => {
    try {
      const _find = GAME_STATE.farm.value.colony.findIndex(
        (x) => x._id === bug._id
      );
      if (_find > -1) {
        await api.sellBugs({
          tankId: GAME_STATE.tank.value?._id,
          bugIds: [bug._id],
        });
        GAME_STATE.farm.value.colony.splice(_find, 1);
        sellBugEffect(bug.x, bug.y);
        GAME_STATE.user.value!.money += 1;
        selectedObject.value = null;
      }
    } catch (err: any) {
      alert(err?.response?.data.message);
    }
  };

  const handleSellBug = async () => {
    if (!(GAME_STATE.user.value && GAME_STATE.tank.value)) return;
    if (GAME_STATE.farm.value.colony.length === 1) return;
    if (selectedObject.value instanceof Bug) {
      const _bug = selectedObject.value;
      const defaultGene = _bug?.genes?.find((gene) => gene.name === "default");
      if (defaultGene && Math.round((defaultGene.score / total!) * 100) < 100) {
        const confirmText = confirm("This is not a 100% default bug");
        if (confirmText) {
          handleSellBugApi(_bug);
        }
      } else {
        handleSellBugApi(_bug);
      }
    }
  };

  const handleRemoveFlower = async () => {
    GAME_STATE.farm.value.objects.forEach(async (obj, index) => {
      if (obj === selectedObject.value) {
        const removeFlower = GAME_STATE.farm.value.objects.splice(index, 1);

        await api.removeFlower(removeFlower[0]._id);
        selectedObject.value = null;
      }
    });
  };

  const total = useMemo(() => {
    if (selectedObject.value instanceof Bug) {
      return selectedObject.value.genes.reduce(
        (acc, gene) => acc + gene.score,
        0
      );
    }
  }, [staticData.genes]);

  const [showSelectTank, setShowSelectTank] = useState(false)
  const handleSelectTank = async (tankId: ITank) => {
    await handleChangeTank(selectedObject.value?._id as string, tankId._id)
    setShowSelectTank(false)
  }

  const handleChangeTank = async (bug: string, tankId: string) => {
    try {
      await api.bugChangeTank(bug, {
        tankId
      })
      GAME_STATE.farm.value.colony = GAME_STATE.farm.value.colony.filter(
        (_bug) => _bug._id !== bug
      );
      selectedObject.value = null
    } catch (error) {
      console.error(error);
    }
  }

  const handleEatPill = async () => {
    try {
      if (selectedObject.value instanceof Bug) {
        const { data } = await api.bugEatPill(selectedObject.value._id)
        GAME_STATE.farm.value.colony.forEach((bug) => {
          if (bug._id === data.bug._id && data.isIncrementScore) {
            bug.genes = data.bug.genes
            setStaticData({
              genes: data.bug.genes
            })
          }
        })
      }
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {selectedObject.value ? (
        <>
          <div className="flex justify-center gap-4 mb-4">
            {selectedObject.value && (
              <BorderContainer className="border-2 w-24 h-24">
                <canvas
                  ref={canvasRef}
                  className="object-render-canvas w-full"
                  width={64}
                  height={64}
                />
              </BorderContainer>
            )}

            {selectedObject.value instanceof Bug && (
              <BorderContainer className="border-2 w-24 h-24 bg-[red]">
                <BugPattern app={selectedObject.value.appearance} />
              </BorderContainer>
            )}
          </div>
          <div className="flex flex-col h-full">
            {selectedObject.value instanceof Bug && (
              <>
                {import.meta.env.MODE === "development" && (
                  <p>{selectedObject.value._id}</p>
                )}
                <p className="border-b border-black border-dashed">
                  List of genes:{" "}
                </p>
                {selectedObject.value.genes.map((gene, index) => (
                  <p key={index}>
                    - {gene.name}: {Math.round((gene.score / total!) * 100)}%
                  </p>
                ))}
                <div className="mt-auto flex flex-wrap gap-2 justify-between max-w-[252px]">
                  <BringToMarket />
                  <Button onClick={handleEatPill}>Boost</Button>
                  <Button onClick={() => setShowSelectTank(true)}>
                    Switch tank
                  </Button>
                  <SelectTank
                    show={showSelectTank}
                    onSelectTank={handleSelectTank}
                    onClose={() => setShowSelectTank(false)}
                  />
                  <Button onClick={handleSellBug}>Sell (+$1)</Button>
                </div>
              </>
            )}
            {selectedObject.value instanceof Flower && (
              <>
                <p>
                  Pollen spawn in:{" "}
                  {Math.max(
                    0,
                    Math.round((staticData.spawningTime || 0) / 1000)
                  )}{" "}
                  / {SPAWN_DURATION / 1000}s
                </p>
                <p>
                  Pollens left: {staticData.numberOfPollens} /{" "}
                  {MAX_POLLENS}
                </p>
                <div className="mt-auto flex flex-col gap-2 justify-between">
                  <Button onClick={handleRemoveFlower}>Remove flower</Button>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <p className="text-center">Click a object to see more detail</p>
      )}
    </div>
  )
}
