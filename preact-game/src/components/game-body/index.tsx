import { GAME_STATE, sketchInstance } from "@/core/gameState";
import BorderContainer from "../border-container";
import Button from "../common/button";
import CreatePattern from "../create-pattern";
import BugList from "../bug-list";
import Market from "../market";
import SelectTank from "../select-tank";
import { useState } from "react";
import { CANVAS_SIZE, CANVAS_WIDTH } from "../create-pattern/useCreatePattern";

export default function GameBody({ loading } : { loading : boolean}) {
  const [showSelectTank, setShowSelectTank] = useState(false);
  const handleSaveGif = () => {
    sketchInstance.saveGif("myGif", 6, {});
  };

  const handleSelectTank = (x: ITank) => {
    GAME_STATE.tank.value = x;
    setShowSelectTank(false)
    localStorage.setItem("lastTank", x._id);
  };

  return (
    <div className="game-body relative">
      <BorderContainer className="">
        <canvas id="main-canvas" style={{
          width: CANVAS_WIDTH,
          height: CANVAS_SIZE,
        }} />
      </BorderContainer>
      <div className="absolute w-full -bottom-5 left-0 rounded-lg flex justify-between p-4 bg-green-200">
        <Button onClick={() => setShowSelectTank(true)}>Change Tank</Button>
        <Button onClick={handleSaveGif}>Save Gif</Button>
        <CreatePattern />
        <BugList />
        <Market />
      </div>

      {!loading && <SelectTank
        show={!!(GAME_STATE.user.value?._id && !GAME_STATE.tank.value?._id) || showSelectTank}
        onSelectTank={handleSelectTank}
        onClose={() => setShowSelectTank(false)}
      />}
    </div>
  )
}
