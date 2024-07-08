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

interface IProp {
  selectedUser: string;
  handleClose?: () => void;
}

const selectedObject = signal<Bug | null>(null);
const MARKET_SIZE = 400;
const marketFarm: Signal<Farm> = signal(
  new Farm(0, 0, MARKET_SIZE, MARKET_SIZE, "#77dd22", selectedObject)
);

const VisitTankModal: FC<IProp> = ({ selectedUser, handleClose }) => {
  const canvasRef = useRef();
  const p5Ref = useRef<p5 | null>();
  const [farm, setFarm] = useState(null);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [selected, setSelected] = useState<Bug | null>(null);

  const getBugList = async () => {
    try {
      const { data: tankData } = await api.getAllTanks({
        userId: selectedUser,
      });
      const { data: bugData } = await api.getAllBugs({
        tankId: tankData.data[0]._id,
      });
      marketFarm.value.colony = [];
      if (p5Ref.current) {
        bugData.forEach((x: Bug) => {
          const _bug = new Bug({
            ...x,
            size: 20,
            x: Math.random() * MARKET_SIZE,
            y: Math.random() * MARKET_SIZE,
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
    getBugList();
  }, [selectedUser]);

  // useEffect(() => {
  //       marketFarm.value.colony = [];
  //       if (p5Ref.current) {
  //         const _market: ISale[] = [];
  //         list.forEach((x: ISale) => {
  //           const _bug = new Bug({
  //             ...x.bug,
  //             size: 20,
  //             x: Math.random() * MARKET_SIZE,
  //             y: Math.random() * MARKET_SIZE,
  //             color: "#f00",
  //             p5: p5Ref.current as p5,
  //           });

  //           marketFarm.value.colony.push(_bug);
  //           _market.push({
  //             ...x,
  //             bug: _bug,
  //           });
  //         });
  //         setFarm(_market);
  //       }
  //   }, [list]);

  useEffect(() => {
    if (selectedUser !== "") {
      sketchInstance.noLoop();

      p5Ref.current = new p5((s) => {
        console.log("init p5");
        s.setup = () => {
          canvasRef.current &&
            s.createCanvas(MARKET_SIZE, MARKET_SIZE, canvasRef.current);
        };
        s.draw = () => {
          s.clear();
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
      <BorderContainer>
        <canvas ref={canvasRef} className="aspect-square" />
      </BorderContainer>
    </Modal>
  );
};

export default VisitTankModal;
