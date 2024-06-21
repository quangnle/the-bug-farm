import { GAME_STATE, sketchInstance } from "@/core/gameState";
import { useEffect, useState } from "react";

export default function GameHeader() {
  const [staticData, setStaticData] = useState({
    population: 0,
    money: 0,
    flowers: 0,
  });
  useEffect(() => {
    const fetchStaticData = () => {
      setStaticData({
        population: GAME_STATE.farm.value?.colony.length,
        money: GAME_STATE.user.value?.money as number,
        flowers: GAME_STATE.farm.value?.objects.length,
      });
    };

    const interval = setInterval(fetchStaticData, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSaveGif = () => {
    sketchInstance.saveGif("myGif", 6, {});
  };

  return (
    <div className="flex items-center justify-between bg-green-200 gap-8 p-6 px-8">
      {/* <div className="flex justify-between items-center gap-8"> */}
      <h1 className="h1">{GAME_STATE.user.value?.username}</h1>
      <div className="flex gap-8">
        <div className="font-bold">Money: ${staticData.money}</div>
        <div className="font-bold">
          Population: {staticData.population} / {GAME_STATE.tank.value?.size}
        </div>
        <div className="font-bold">Flowers: {staticData.flowers}</div>
      </div>
      {/* </div> */}
      {/* <div className="flex gap-4">
        <Button
          onClick={() => {
            GAME_STATE.tank.value = null;
          }}
        >
          Change Tank
        </Button>
        <Button onClick={handleSaveGif}>Save Gif</Button>
        <CreatePattern />
        <BugList />
        <Market />
      </div> */}
    </div>
  );
}
