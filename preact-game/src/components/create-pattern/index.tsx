import api from "@/core/axios";
import { GAME_STATE, sketchInstance } from "@/core/gameState";
import { handleError } from "@/utils/helpers";
import p5 from "p5";
import { useEffect, useRef, useState } from "react";
import BorderContainer from "../border-container";
import BugPatternWithoutApp from "../bug-pattern/bug-pattern-without-app";
import Button from "../common/button";
import Modal from "../common/modal";
import {
  PATTERN,
  SELECTED_COLOR,
  draw,
  handleLoadDraft,
  keyPressed,
  mousePressed,
  mouseReleased,
  setup,
} from "./useCreatePattern";

export default function CreatePattern({
  closeMenu,
}: {
  closeMenu: () => void;
}) {
  const [show, setShow] = useState(false);
  const canvasRef = useRef(null);
  const p5Ref = useRef<p5 | null>(null);
  const [currentEditPattern, setCurrentEditPattern] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [userPatterns, setUserPatterns] = useState<IAppearance[]>([]);
  const [name, setName] = useState("");

  const handleClose = () => {
    setShow(false);
    closeMenu();
  };

  useEffect(() => {
    if (show) {
      sketchInstance?.noLoop();
      p5Ref.current = new p5((s) => {
        s.setup = () => setup(s, canvasRef.current);
        s.draw = () => draw(s);
        s.mousePressed = () => mousePressed(s);
        s.mouseReleased = () => mouseReleased();
        s.keyPressed = () => keyPressed(s);
      });
    } else {
      sketchInstance?.loop();
      p5Ref.current?.remove();
    }
    return () => {
      sketchInstance?.loop();
      p5Ref.current?.remove();
    };
  }, [show]);

  const handleSubmit = async () => {
    try {
      if (!name) {
        alert("Required pattern name");
        return;
      }
      await api.createAppearance({
        name,
        pattern: PATTERN.value,
      });
      handleClose();
    } catch (error) {
      handleError(error);
    }
  };

  const handleUpdatePattern = async () => {
    try {
      await api.updateAppearance(currentEditPattern, {
        pattern: PATTERN.value,
      });
      fetchAllAppearances();
      setCurrentEditPattern("");
      handleClose();
    } catch (error) {
      handleError(error);
    }
  };

  const fetchAppearancesOfUser = async () => {
    try {
      const { data } = await api.getUserAppearances();
      setUserPatterns(data);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    if (GAME_STATE.user.value) fetchAppearancesOfUser();
  }, [GAME_STATE.user.value]);

  useEffect(() => {
    try {
      const _drafts = JSON.parse(localStorage.getItem("drafts") || "[]");
      setDrafts(_drafts);
    } catch (error) {
      handleError(error);
    }
  }, []);

  const handleSaveDraft = () => {
    if (!name) {
      alert("Required pattern name");
      return;
    }
    const newDrafts = [
      ...drafts,
      {
        name,
        pattern: PATTERN.value,
      },
    ];
    localStorage.setItem(
      "drafts",
      JSON.stringify([
        ...drafts,
        {
          name,
          pattern: PATTERN.value,
        },
      ])
    );
    setDrafts(newDrafts);
  };

  const fetchAllAppearances = async () => {
    const { data } = await api.getAllAppearances();
    GAME_STATE.appearance.value = data;
  };

  const handleDeleteDraft = (draft) => {
    const newDrafts = drafts.filter((d) => d !== draft);
    localStorage.setItem("drafts", JSON.stringify(newDrafts));
    setDrafts(newDrafts);
  };

  useEffect(() => {
    if (currentEditPattern) {
      const findPattern = GAME_STATE.appearance.value.find(
        (appearance) => appearance._id === currentEditPattern
      );
      handleLoadDraft({
        name: findPattern ? findPattern?.name : "",
        pattern: findPattern ? findPattern?.pattern : [],
      });
    }
  }, [currentEditPattern, GAME_STATE, show]);

  return (
    <>
      <button onClick={() => setShow(true)}>Design your pattern</button>
      {show && (
        <Modal handleClose={() => {}} className="flex gap-2 flex-row">
          <BorderContainer className="relative p-4 bg-green-200 flex flex-col">
            <div
              className="absolute top-1 right-2 cursor-pointer"
              onClick={handleClose}
            >
              <img
                src="/assets/closex.svg"
                alt="close"
                width={32}
                height={32}
              />
            </div>
            <h1 className="text-center">Design your pattern</h1>
            <div className="flex flex-1 gap-2">
              <div className="">
                <canvas ref={canvasRef}></canvas>
              </div>
              <div className="flex flex-col">
                <input
                  type="color"
                  id="color-picker"
                  onChange={(event) => {
                    SELECTED_COLOR.value = event.target.value;
                  }}
                  value={SELECTED_COLOR.value}
                />
                <Button className="mt-4" onClick={handleSaveDraft}>
                  Save draft
                </Button>

                {/* <label className="mt-4">
                  <span>Size: </span>
                  <select
                    onChange={(event) => {
                      SIZE.value = parseInt(event.target.value);
                    }}
                  >
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                  </select>
                </label> */}
                <label className="mt-4">
                  <span className="font-bold">Pattern name: </span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </label>
                {/* {(GAME_STATE.user.value?._id === "6672c34d6823ebd43c8ea8a9" ||
                  GAME_STATE.user.value?._id ===
                    "66540a69de9028f574c478fb") && ( */}
                <label className="mt-4">
                  <span className="font-bold">Pattern name: </span>
                  <select
                    onChange={(e) => setCurrentEditPattern(e.target.value)}
                    value={currentEditPattern}
                  >
                    <option value="">---</option>
                    {GAME_STATE.user.value?._id ===
                      "6672c34d6823ebd43c8ea8a9" ||
                    GAME_STATE.user.value?._id === "66540a69de9028f574c478fb"
                      ? GAME_STATE.appearance.value.map((appearance) => (
                          <option value={appearance._id}>
                            {appearance.name}
                          </option>
                        ))
                      : userPatterns.map((appearance) => (
                          <option value={appearance._id}>
                            {appearance.name}
                          </option>
                        ))}
                  </select>
                </label>
                {/* )} */}
                <div className="flex flex-col gap-4 mt-auto">
                  <div className="flex items-center gap-4">
                    <Button onClick={handleSubmit}>Create Pattern</Button>
                    <p className="text-md">It cost $200</p>
                  </div>
                  {currentEditPattern && (
                    <Button onClick={() => handleUpdatePattern()}>
                      Update Pattern
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </BorderContainer>
          <BorderContainer className="bg-green-200 flex items-center justify-center p-4">
            {drafts.length === 0 ? (
              <p className="text-xl">No draft</p>
            ) : (
              <div className="flex flex-col gap-2 w-full">
                {drafts.map((draft, index) => (
                  <div className="flex gap-2">
                    <div className="w-32 h-32 aspect-square">
                      <BugPatternWithoutApp pattern={draft.pattern} />
                    </div>
                    <div>
                      <div className="">Name: {draft.name}</div>
                      <div className="flex flex-col gap-2">
                        <Button onClick={() => handleLoadDraft(draft)}>
                          Load
                        </Button>
                        <Button
                          className="danger"
                          onClick={() => handleDeleteDraft(draft)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </BorderContainer>
        </Modal>
      )}
    </>
  );
}
