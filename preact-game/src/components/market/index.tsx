import { useEffect, useMemo, useRef, useState } from "react"
import Modal from "../common/modal"
import BorderContainer from "../border-container"
import api from "@/core/axios"
import p5 from "p5"
import { Signal, signal } from "@preact/signals"
import Farm from "@/core/entity/farm"
import Bug from "@/core/entity/bug"
import { GAME_STATE, sketchInstance } from "@/core/gameState"
import Button from "../common/button"

const MARKET_SIZE = 480
const marketFarm: Signal<Farm> = signal(
  new Farm(0, 0, MARKET_SIZE, MARKET_SIZE, "#77dd22")
)

export default function Market() {
  const canvasRef = useRef(null)
  const p5Ref = useRef<p5 | null>(null)
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState<Bug | null>(null)
  const [market, setMarket] = useState<ISale[]>([])

  const fetchMarket = async () => {
    try {
      const { data } = await api.getSales()
      if (p5Ref.current) {
        const _market: ISale[] = []
        data.data.forEach((x: ISale) => {
          const _bug = new Bug({
            ...x.bug,
            size: 20,
            x: 100,
            y: 100,
            color: "#f00",
            p5: p5Ref.current as p5,
          })

          marketFarm.value.colony.push(_bug)
          _market.push({
            ...x,
            bug: _bug
          })
        })
        setMarket(_market)
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (show) {
      sketchInstance.noLoop()
      fetchMarket()

      p5Ref.current = new p5((s) => {
        console.log("init p5")
        s.setup = () => {
          canvasRef.current &&
            s.createCanvas(MARKET_SIZE, MARKET_SIZE, canvasRef.current)
        }
        s.draw = () => {
          s.clear()
          marketFarm.value?.draw(p5Ref.current as p5)
        }
        s.mousePressed = () => {
          if (s.mouseY > marketFarm.value?.x && s.mouseY < marketFarm.value?.y + marketFarm.value?.height) {
            marketFarm.value?.mousePressed(s.mouseButton, s.mouseX, s.mouseY, (bug) => {
              setSelected(bug)
            });
          }
        }
      })
    } else {
      sketchInstance.loop()
    }

    return () => {
      console.log("destroy p5")
      p5Ref.current?.remove()
    }
  }, [show])

  const selectedSale = useMemo(() => market.find(x => x.bug._id === selected?._id), [market, selected])

  const handleBuy = async () => {
    try {
      if (!selectedSale || !GAME_STATE.tank.value?._id) return
      await api.buyBug(selectedSale?._id, { tankId: GAME_STATE.tank.value?._id})
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  const handleUnBuy = async () => {
    try {
      if (!selectedSale || !GAME_STATE.tank.value?._id) return
      await api.saleUnListting(selectedSale?._id, { tankId: GAME_STATE.tank.value?._id})
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  const total = useMemo(() => {
    return (selectedSale?.bug as Bug)?.genes?.reduce((acc, x) => acc + x.score, 0)
  }, [selectedSale])

  return (
    <>
      <Button onClick={() => setShow(true)}>Market</Button>
      {show && (
        <Modal handleClose={() => setShow(false)}>
          <BorderContainer className="flex flex-col items-center bg-black/60 p-8">
            <h1 className="text-center font-bold mb-4">Market</h1>
            <p className="text-2xl font-bold text-[orange] text-center mb-2">
              Money: ${GAME_STATE.user.value?.money}
            </p>
            <div className="flex gap-8">
              <canvas
                ref={canvasRef}
                className="w-1/2 aspect-square rounded-lg border-8 border-[burlywood] bg-[lightgreen]"
              />
              <div className="w-[300px] text-white flex flex-col">
                {selectedSale && (
                  <>
                    <p>ID: {selectedSale?.bug._id}</p>
                    <p className="text-2xl font-bold text-[orange]">
                      Price: ${selectedSale?.price}
                    </p>
                    <p>Pattern: {selectedSale?.bug.appearance?.name}</p>
                    <p className="border-b border-black border-dashed">
                      List of genes:{" "}
                    </p>
                    {selected?.genes.map((gene, index) => (
                      <p key={index}>
                        - {gene.name}: {Math.round((gene.score / total) * 100)}%
                      </p>
                    ))}
                    <div className="mt-auto">
                      {GAME_STATE.user.value?._id === selectedSale.sellerId ? (
                        <Button onClick={handleBuy}>Buy</Button>
                      ) : (
                        <Button onClick={handleUnBuy}>Cancel</Button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </BorderContainer>
        </Modal>
      )}
    </>
  )
}
