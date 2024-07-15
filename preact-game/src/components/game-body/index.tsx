import { GAME_STATE } from "@/core/gameState";
import BugList from "../bug-list";
import { CANVAS_SIZE, CANVAS_WIDTH } from "../create-pattern/useCreatePattern";
import Genes from "../genes";
import Inventory from "../inventory";
import Market from "../market";
import Menu from "../menu";
import UserModal from "../user-modal";

export default function GameBody() {
  return (
    <div className="game-body relative">
      <div className="flex gap-4">
        <div className="flex flex-col justify-between">
          {GAME_STATE.user.value && (
            <div className="flex flex-col gap-4 py-4">
              {GAME_STATE.farm.value && <BugList />}
              <Inventory />
              <Market />
              <Genes />
              <UserModal />
              <Menu />
            </div>
          )}
        </div>
        <div>
          <canvas
            id="main-canvas"
            style={{
              width: CANVAS_WIDTH,
              height: CANVAS_SIZE,
            }}
          />
          <p className="text-center text-lg">
            Pretty Bugs v1.0 - Powered by the skyglab.tech Jul 2024.
          </p>
        </div>
      </div>
    </div>
  );
}
