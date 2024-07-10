import BugList from "../bug-list";
import { CANVAS_SIZE, CANVAS_WIDTH } from "../create-pattern/useCreatePattern";
import Genes from "../genes";
import Inventory from "../inventory";
import Market from "../market";
import Menu from "../menu";
import UserModal from "../user-modal";

export default function GameBody({ loading }: { loading: boolean }) {
  return (
    <div className="game-body relative">
      <div className="flex gap-4">
        <div className="flex flex-col justify-between">
          {!loading && (
            <div className="flex flex-col gap-4 py-4">
              <BugList />
              <Inventory />
              <Market />
              <Genes />
              <UserModal />
              <Menu />
            </div>
          )}
        </div>
        <canvas
          id="main-canvas"
          style={{
            width: CANVAS_WIDTH,
            height: CANVAS_SIZE,
          }}
        />
      </div>
    </div>
  );
}
