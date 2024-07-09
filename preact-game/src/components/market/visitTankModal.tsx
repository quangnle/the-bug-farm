import { FC, useEffect, useRef, useState } from "react";
import Modal from "../common/modal";
import { signal, Signal } from "@preact/signals";
import Farm from "@/core/entity/farm";
import Bug from "@/core/entity/bug";
import p5 from "p5";
import api from "@/core/axios";
import BorderContainer from "../border-container";
import { handleError } from "@/utils/helpers";
import { sketchInstance } from "@/core/gameState";
import { FARM_BORDER, FARM_HEIGHT, FARM_WIDTH, SCALE } from "@/core/constants";
import SelectedObject from "../selected-object";
import BugPattern from "../bug-pattern";
import { getSaleGenesInfo } from "@/core/utils";
import Flower from "@/core/entity/flower";

interface IProp {
  selectedUser: string;
  handleClose?: () => void;
}

const selectedObject = signal<Bug | null>(null);
const MARKET_SIZE = 400;
const marketFarm: Signal<Farm> = signal(
  new Farm(0, 0, MARKET_SIZE, MARKET_SIZE, "#77dd22", selectedObject, false)
);

const VisitTankModal: FC<IProp> = ({ selectedUser, handleClose }) => {
  const canvasRef = useRef(null);
  const p5Ref = useRef<p5 | null>();
  const [farm, setFarm] = useState(null);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [selected, setSelected] = useState<Bug | null>(null);

  const getTankInfo = async () => {
    try {
      const { data: tankData } = await api.getAllTanks({
        userId: selectedUser,
      });
      const [{ data: bugData }, { data: flowerData }] = [
        await api.getAllBugs({
          tankId: tankData.data[0]._id,
        }),
        await api.getAllFlowers({
          tankId: tankData.data[0]._id,
        }),
      ];
      marketFarm.value.colony = [];
      marketFarm.value.objects = [];
      if (p5Ref.current) {
        flowerData.forEach((flo: Flower) => {
          const flower = new Flower({
            ...flo,
            x: flo.x * SCALE,
            y: flo.y * SCALE,
            p5: p5Ref.current as p5,
          });
          marketFarm.value.objects.push(flower);
        });
        bugData.forEach((x: Bug) => {
          const _bug = new Bug({
            ...x,
            size: 20,
            x: Math.random() * FARM_WIDTH,
            y: Math.random() * FARM_HEIGHT,
            color: "#f00",
            p5: p5Ref.current as p5,
          });

          marketFarm.value.colony.push(_bug);
        });
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getTankInfo();
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser !== "") {
      sketchInstance.noLoop();
      let bg: any;
      let border: any;
      p5Ref.current = new p5((s) => {
        console.log("init p5");
        s.setup = () => {
          bg = s.loadImage("/assets/bg-football.png");
          border = s.loadImage("/assets/holders/game-holder.png");
          canvasRef.current &&
            s.createCanvas(FARM_WIDTH, FARM_HEIGHT, canvasRef.current);
        };
        s.draw = () => {
          s.clear();
          s.image(
            bg,
            FARM_BORDER / 2,
            FARM_BORDER / 2,
            FARM_WIDTH - FARM_BORDER,
            FARM_HEIGHT - FARM_BORDER
          );
          s.background(border);
          marketFarm.value?.draw(p5Ref.current as p5);
        };
        s.mousePressed = () => {
          if (
            s.mouseY > marketFarm.value?.x &&
            s.mouseY < marketFarm.value?.y + marketFarm.value?.height
          ) {
            marketFarm.value?.mousePressed(
              s.mouseButton,
              s.mouseX,
              s.mouseY,
              (bug) => {
                setSelected(bug);
              }
            );
          }
        };
      });
    } else {
      sketchInstance.loop();
    }

    return () => {
      console.log("destroy p5");
      p5Ref.current?.remove();
    };
  }, [selectedUser]);

  return (
    <Modal handleClose={handleClose}>
      <div className="flex gap-4">
        <canvas ref={canvasRef} className="aspect-square" />
        <BorderContainer className="p-4 bg-green-200">
          {selected?.appearance && <BugPattern app={selected?.appearance!} />}
          <div className="mt-4">
            <p className="border-b border-black border-dashed">
              List of genes:{" "}
            </p>
            <div className="flex flex-col gap-2 mt-3">
              {getSaleGenesInfo(selected?.genes || []).map((x) => (
                <p>- {x}</p>
              ))}
            </div>
          </div>
        </BorderContainer>
      </div>
    </Modal>
  );
};

export default VisitTankModal;
