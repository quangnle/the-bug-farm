import BugList from "../bug-list"
import Market from "../market"
import { CANVAS_SIZE, CANVAS_WIDTH } from "../create-pattern/useCreatePattern"
import Menu from "../menu"

export default function GameBody({ loading }: { loading: boolean }) {
  return (
    <div className="game-body relative">
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 py-4">
          {!loading && (
            <>
              <BugList />
              <Market />
              <Menu />
            </>
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
  )
}
