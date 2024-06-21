import { GAME_STATE, sketchInstance } from "@/core/gameState";
import BorderContainer from "../border-container";
import Button from "../common/button";
import CreatePattern from "../create-pattern";
import "./style.css";
import BugList from "../bug-list";
import Market from "../market";

export default function GameBody() {
  const handleSaveGif = () => {
    sketchInstance.saveGif("myGif", 6, {});
  };

  return (
    <div className="game-body relative">
      <BorderContainer className="sketch-holder">
        <canvas id="main-canvas" />
      </BorderContainer>
      <div className="absolute w-full -bottom-5 left-0 rounded-lg flex justify-between p-4 bg-green-200">
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
      </div>
    </div>
  );
}
