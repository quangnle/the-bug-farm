import useList from "@/hooks/useList";
import Button from "../common/button";
import api from "@/core/axios";
import { useMemo, useState } from "react";
import BorderContainer from "../border-container";
import clsx from "clsx";
import BugPattern from "../bug-pattern";
import Bug from "@/core/entity/bug";
import SelectTank from "../select-tank";
import { GAME_STATE, GAME_fetchTank } from "@/core/gameState";
import { getSaleGenesInfo } from "@/core/utils";

export default function BugVault({
  changeTab = () => {},
}: {
  changeTab?: () => void;
}) {
  const fetchBugVault = useMemo(
    () => ({
      perPage: 100,
    }),
    []
  );
  const { data: bugVault, refresh } = useList(api.getBugStorage, {
    params: fetchBugVault,
  });

  const [selectedBugs, setSelectedBugs] = useState<Bug[]>([]);
  const [showSelectTank, setShowSelectTank] = useState(false);

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
      if (tankId === GAME_STATE.tank.value?._id) {
        GAME_fetchTank();
      }
      setSelectedBugs([]);
      refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-[70vh] overflow-y-auto overflow-x-hidden p-4">
      <h1 className="text-center">Bug Vault</h1>
      <div className="flex justify-between">
        <Button onClick={changeTab}>My Bugs</Button>
        {selectedBugs.length > 0 && (
          <div className="flex items-center">
            <SelectTank
              show={showSelectTank}
              onSelectTank={handleSelectTank}
              onClose={() => setShowSelectTank(false)}
              needSlot={selectedBugs.length}
            />
            <Button onClick={() => setShowSelectTank(true)}>Switch Tank</Button>
          </div>
        )}
      </div>

      <div className="mt-8">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
        >
          {bugVault.map((bug) => {
            const total = bug.genes.reduce((acc, gene) => acc + gene.score, 0);

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
                      {getSaleGenesInfo(bug.genes || []).map((x) => (
                        <p>- {x}</p>
                      ))}
                    </ul>
                  </div>
                </div>
              </BorderContainer>
            );
          })}
        </div>
      </div>
    </div>
  );
}
