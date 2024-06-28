import BugList from "../bug-list";
import Market from "../market";
import { CANVAS_SIZE, CANVAS_WIDTH } from "../create-pattern/useCreatePattern";
import Menu from "../menu";
import IconButtons from "../icon-buttons";
import { BGM_ENABLE, sketchInstance } from "@/core/gameState";
import Genes from "../genes";

export default function GameBody({ loading }: { loading: boolean }) {
  const handleSaveGif = () => {
    sketchInstance.saveGif("myGif", 2, {});
  };

  return (
    <div className="game-body relative">
      <div className="flex gap-4">
        <div className="flex flex-col justify-between">
          {!loading && (
            <div className="flex flex-col gap-4 py-4">
              <BugList />
              <Market />
              <Menu />
              <Genes />
            </div>
          )}
          <div className="flex flex-col gap-4 py-4 relative z-10">
            <IconButtons icon="save-gif" onClick={handleSaveGif} />
            <IconButtons
              onClick={() => {
                BGM_ENABLE.value = !BGM_ENABLE.value
              }}
            >
              <img className="w-10 hover:w-12" src={`/assets/${BGM_ENABLE.value ? 'bgm-mute.png': 'bgm.png'}`} />
            </IconButtons>
          </div>
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
  )
}
