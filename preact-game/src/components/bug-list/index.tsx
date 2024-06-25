import api from "@/core/axios";
import { sellBugEffect } from "@/core/effect";
import Bug from "@/core/entity/bug";
import { GAME_STATE, sketchInstance } from "@/core/gameState";
import clsx from "clsx";
import moment from "moment";
import { useEffect, useState } from "react";
import BorderContainer from "../border-container";
import BugPattern from "../bug-pattern";
import Button from "../common/button";
import Modal from "../common/modal";
import FilterGeneModal from "../filter-gene-modal";
import SelectTank from "../select-tank";

export default function BugList() {
  const [show, setShow] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [selectedBugs, setSelectedBugs] = useState<Bug[]>([]);
  const [showSelectTank, setShowSelectTank] = useState(false);

  const [filter, setFilter] = useState<{
    type: "none" | "rarity" | "createdAt";
    order: number;
  }>({
    type: "rarity",
    order: 1,
  });

  useEffect(() => {
    if (show) {
      sketchInstance.noLoop();
      setBugs(
        [...GAME_STATE.farm.value.colony].sort((a, b) => {
          if (filter.type === "createdAt") {
            return (
              (new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()) *
              filter.order
            );
          }
          if (filter.type === "rarity") {
            const rarityA = a.genes.reduce(
              (acc, gene) =>
                acc +
                Math.pow(100 - gene.score, 2) +
                Math.pow(90 - a.appearance.score, 3),
              0
            );
            const rarityB = b.genes.reduce(
              (acc, gene) =>
                acc +
                Math.pow(100 - gene.score, 2) +
                Math.pow(90 - b.appearance.score, 3),
              0
            );
            return (rarityA - rarityB) * filter.order;
          }
          return 0;
        })
      );
    } else {
      sketchInstance.loop();
    }
  }, [show, filter]);
  const handleSellAll = async () => {
    try {
      if (selectedBugs.some((bug) => bug.appearance.name !== "default")) {
        if (
          !confirm(
            "You have some special bugs in your sale, are you sure to sell them?"
          )
        ) {
          return;
        }
      }
      await api.sellBugs({
        tankId: GAME_STATE.tank.value?._id,
        bugIds: selectedBugs.map((bug) => bug._id),
      });
      GAME_STATE.farm.value.colony = GAME_STATE.farm.value.colony.filter(
        (bug) => !selectedBugs.includes(bug)
      );
      setSelectedBugs([]);
      setBugs(GAME_STATE.farm.value.colony);
      sellBugEffect(0, 0);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSellAllDefault = async () => {
    try {
      const _selectedBugs = bugs
        .filter(
          (bug) => bug.appearance.name === "default" && bug.genes.length === 1
        )
        .map((bug) => bug._id);
      console.log(_selectedBugs);
      await api.sellBugs({
        tankId: GAME_STATE.tank.value?._id,
        bugIds: _selectedBugs,
      });
      GAME_STATE.farm.value.colony = GAME_STATE.farm.value.colony.filter(
        (bug) => !_selectedBugs.includes(bug._id)
      );
      setBugs(GAME_STATE.farm.value.colony);
      sellBugEffect(0, 0);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectTank = async (tankId: ITank) => {
    await handleChangeTank(
      selectedBugs.map((bug) => bug._id),
      tankId._id
    );
    setShowSelectTank(false);
  };

  const handleChangeTank = async (bugs: string[], tankId: string) => {
    try {
      await Promise.all(
        bugs.map(async (bug) =>
          api.bugChangeTank(bug, {
            tankId,
          })
        )
      );
      GAME_STATE.farm.value.colony = GAME_STATE.farm.value.colony.filter(
        (bug) => !selectedBugs.includes(bug)
      );
      setSelectedBugs([]);
      setBugs(GAME_STATE.farm.value.colony);
      sellBugEffect(0, 0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={() => setShow(true)}>Inventory</Button>
      {showFilter && (
        <FilterGeneModal handleClose={() => setShowFilter(false)} bugs={bugs} />
      )}
      {show && (
        <Modal handleClose={() => setShow(false)}>
          <BorderContainer className="bg-black/60 w-[80vw]">
            <div className="h-[70vh] overflow-y-auto overflow-x-hidden p-4">
              <h1 className="font-bold text-center mb-6">Inventory</h1>
              <div className="h-20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    className="w-[200px]"
                    onClick={() => {
                      setFilter((prev) => ({
                        ...prev,
                        type: prev.type === "rarity" ? "createdAt" : "rarity",
                      }));
                    }}
                  >
                    Filter by: {filter.type}
                  </Button>
                  <Button
                    onClick={() => {
                      setFilter((prev) => ({
                        ...prev,
                        order: prev.order * -1,
                      }));
                    }}
                  >
                    Direction: {filter.order === 1 ? "Asc" : "Desc"}
                  </Button>
                </div>
                <div className="flex gap-2">
                  {selectedBugs.length > 0 && (
                    <>
                      <SelectTank
                        show={showSelectTank}
                        onSelectTank={handleSelectTank}
                        onClose={() => setShowSelectTank(false)}
                      />
                      <Button onClick={() => setShowSelectTank(true)}>
                        Change Tank
                      </Button>
                      <Button onClick={handleSellAll}>Sell</Button>
                    </>
                  )}
                  <Button onClick={() => setShowFilter(true)}>Filter</Button>
                  <Button onClick={handleSellAllDefault}>
                    Sell all Default
                  </Button>
                </div>
              </div>

              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                }}
              >
                {bugs.map((bug) => {
                  const total = bug.genes.reduce(
                    (acc, gene) => acc + gene.score,
                    0
                  );

                  return (
                    <BorderContainer
                      key={bug._id}
                      className={clsx(
                        "border-2 p-2 hover:bg-green-600 gap-4 text-white cursor-pointer",
                        selectedBugs.includes(bug) && "bg-green-600"
                      )}
                      onClick={() => {
                        setSelectedBugs((prev) => {
                          if (prev.includes(bug)) {
                            return prev.filter((b) => b !== bug);
                          } else {
                            return [...prev, bug];
                          }
                        });
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-red-600">
                          <BugPattern appc={bug.appearance._id} />
                        </div>
                        <div className="py-2">
                          <p>
                            <b>Pattern</b>: {bug.appearance.name}
                          </p>
                          <p>
                            <b>Genes</b>:
                          </p>
                          <ul>
                            {bug.genes.map((gene) => (
                              <li>
                                &middot; {gene.name} -{" "}
                                {Math.round((gene.score / total) * 100)}%
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <p className="text-right">
                        Hatch:{" "}
                        {moment((bug as unknown as IBug).createdAt).fromNow()}
                      </p>
                    </BorderContainer>
                  );
                })}
              </div>
            </div>
          </BorderContainer>
        </Modal>
      )}
    </>
  );
}
