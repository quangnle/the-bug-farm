import api from "@/core/axios";
import { sellBugEffect } from "@/core/effect";
import Bug from "@/core/entity/bug";
import { GAME_STATE, sketchInstance } from "@/core/gameState";
import clsx from "clsx";
import { useEffect, useState } from "react";
import BorderContainer from "../border-container";
import BugPattern from "../bug-pattern";
import Button from "../common/button";
import Modal from "../common/modal";
import FilterGeneModal from "../filter-gene-modal";
import SelectTank from "../select-tank";
import IconButtons from "../icon-buttons";
import BugVault from "./bug-vault";

export default function BugList() {
  const [show, setShow] = useState(false);
  const [tab, setTab] = useState<"bugs" | "bug-vault">("bugs")
  const [loading, setLoading] = useState(false);
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

  const handleSelectByGenes = (genes: IAppearance[]) => {
    setSelectedBugs([]);
    bugs.map((bug) => {
      let matchedGenes = 0;
      genes.map((gene) => {
        if (bug.genes.find((_gene) => _gene.name === gene.name)) {
          matchedGenes++;
        }
      });
      if (matchedGenes === genes.length && bug.genes.length === matchedGenes)
        setSelectedBugs((prev) => [...prev, bug]);
    });
    setShowFilter(false);
  };

  const handleSellAll = async () => {
    try {
      setLoading(true);
      if (selectedBugs.length === 0) {
        alert("No bug selected");
      }
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
    } finally {
      setLoading(false);
    }
  };

  const handleSellAllDefault = async () => {
    try {
      setLoading(true);
      const _selectedBugs = bugs
        .filter(
          (bug) => bug.appearance.name === "default" && bug.genes.length === 1
        )
        .map((bug) => bug._id);
      console.log(_selectedBugs);
      if (_selectedBugs.length === 0) {
        alert("No bug selected");
      }
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
    } finally {
      setLoading(false);
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
      <IconButtons onClick={() => setShow(true)} icon="inventory" />
      <FilterGeneModal
        showFilter={showFilter}
        handleSelectByGenes={handleSelectByGenes}
        handleClose={() => setShowFilter(false)}
        bugs={bugs}
      />
      {show && (
        <Modal handleClose={() => setShow(false)}>
          <BorderContainer className="bg-black/60 w-[80vw]">
            {tab === 'bugs' && <div className="h-[70vh] overflow-y-auto overflow-x-hidden p-4">
              <h1 className="font-bold text-center mb-6">My Bug</h1>
              <div className="flex justify-between">
                <Button onClick={() => setTab('bug-vault')}>Bug vault</Button>
              </div>
              <div className="h-20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* <Button
                    className="w-[200px]"
                    onClick={() => {
                      setFilter((prev) => ({
                        ...prev,
                        type: prev.type === "rarity" ? "createdAt" : "rarity",
                      }));
                    }}
                  >
                    Sort by: {filter.type}
                  </Button> */}
                  <Button
                    onClick={() => {
                      setFilter((prev) => ({
                        ...prev,
                        order: prev.order * -1,
                      }));
                    }}
                  >
                    {filter.order === 1
                      ? "Ascending rarity"
                      : "Descending rarit"}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setShowFilter(true)}>Filter</Button>
                  {selectedBugs.length > 0 && (
                    <>
                      <SelectTank
                        show={showSelectTank}
                        onSelectTank={handleSelectTank}
                        onClose={() => setShowSelectTank(false)}
                      />
                      <Button onClick={() => setShowSelectTank(true)}>
                        Switch Tank
                      </Button>
                      <Button onClick={() => !loading && handleSellAll()}>
                        Sell all selected
                      </Button>
                      <Button onClick={() => setSelectedBugs([])}>
                        Unselect
                      </Button>
                      {/* <Button onClick={() => !loading && handleSellAll()}>
                        Sell
                      </Button> */}
                    </>
                  )}
                  {/* <Button onClick={handleSellAllDefault}>
                    Sell all Default
                  </Button> */}
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
                          <BugPattern app={bug.appearance} />
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
                      {/* <p className="text-right">
                        Hatch:{" "}
                        {moment((bug as unknown as IBug).createdAt).fromNow()}
                      </p> */}
                    </BorderContainer>
                  );
                })}
              </div>
            </div>}
            {tab === "bug-vault" && <BugVault changeTab={() => setTab('bugs')} />}
          </BorderContainer>
        </Modal>
      )}
    </>
  );
}
