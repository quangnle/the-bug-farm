import { GAME_STATE } from "@/core/gameState";
import BugList from "../bug-list";
import { CANVAS_SIZE, CANVAS_WIDTH } from "../create-pattern/useCreatePattern";
import Genes from "../genes";
import Market from "../market";
import Menu from "../menu";
import UserModal from "../user-modal";
import IconButtons from "../icon-buttons";
import api from "@/core/axios";

export default function GameBody({ loading }: { loading: boolean }) {
  const handleGoHome = async () => {
    try {
      const { data } = await api.getAllTanks({
        userId: GAME_STATE.user.value?._id,
      });
      GAME_STATE.tank.value = data.data[0];
      GAME_STATE.isVisiting.value = false;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="game-body relative">
      <div className="flex gap-4">
        <div className="flex flex-col justify-between">
          {!loading && (
            <div className="flex flex-col gap-4 py-4">
              {GAME_STATE.isVisiting.value === true && (
                <IconButtons onClick={handleGoHome}>Home</IconButtons>
              )}
              {GAME_STATE.isVisiting.value === false && <BugList />}
              <Market />
              <Genes />
              <UserModal />
              {GAME_STATE.isVisiting.value === false && <Menu />}
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
