import { MAX_FLOWERS } from "@/core/constants";
import { GAME_STATE } from "@/core/gameState";
import { useEffect, useState } from "react";
import "./style.css";

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

  return (
    <div className="flex items-center justify-between gap-4 pl-72 relative">
      <img
        src="/assets/PrettyBugs.png"
        width={240}
        className="absolute -left-10 -top-12"
      />
      <h1 className="h1">{GAME_STATE.user.value?.username}</h1>
      <div className="flex gap-8">
        <div className="holder money-holder">
          <p>{staticData.money}</p>
        </div>

        <div className="holder bug-holder">
          <p>{staticData.population} / {GAME_STATE.tank.value?.size}</p>
        </div>

        <div className="holder flower-holder">
          <p>{staticData.flowers} / {MAX_FLOWERS}</p>
        </div>
      </div>
    </div>
  );
}
