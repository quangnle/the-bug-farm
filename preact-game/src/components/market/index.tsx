import { useEffect, useMemo, useRef, useState } from "react"
import Modal from "../common/modal"
import BorderContainer from "../border-container"
import api from "@/core/axios"
import p5 from "p5"
import { Signal, signal } from "@preact/signals"
import Farm from "@/core/entity/farm"
import Bug from "@/core/entity/bug"
import { GAME_STATE, selectedObject, sketchInstance } from "@/core/gameState"
import Button from "../common/button"
import useList from "@/hooks/useList"
import clsx from "clsx"
import BugPattern from "../bug-pattern"
import moment from "moment"
import Chevron from "../common/chevron"
import Loading from "../common/loading"

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

  const { data: list, loading, refresh: reloadList, pagination } = useList(api.getSales)

  useEffect(() => {
    if (list && list.length) {
      marketFarm.value.colony = []
      if (p5Ref.current) {
        const _market: ISale[] = []
        list.forEach((x: ISale) => {
          const _bug = new Bug({
            ...x.bug,
            size: 20,
            x: Math.random() * MARKET_SIZE,
            y: Math.random() * MARKET_SIZE,
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
    }
  }, [list])

  useEffect(() => {
    if (show) {
      sketchInstance.noLoop()
      reloadList()

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
      removeBug()
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const handleUnBuy = async () => {
    try {
      if (!selectedSale || !GAME_STATE.tank.value?._id) return
      await api.saleUnListting(selectedSale?._id, { tankId: GAME_STATE.tank.value?._id})
      removeBug()
    } catch (error) {
      alert(error.response.data.message)
    }
  }


  const removeBug = () => {
    if (selected) {
      marketFarm.value.colony = marketFarm.value.colony.filter((x) => x._id !== selected._id)
      setMarket(market.filter((x) => x.bug._id !== selected._id))
      setSelected(null)
    }
  }

  const handleChangePage = (value) => {
    if (!pagination?.total) return
    const nextPage = (pagination?.page || 1) + value
    console.log(nextPage, Math.round(pagination?.total / (pagination?.perPage || 10)))

    if (
      nextPage <= 0 ||
      nextPage > Math.ceil(pagination?.total / (pagination?.perPage || 10))
    ) {
      return
    }

    pagination?.onChange && pagination?.onChange(nextPage)
  }

  return (
    <>
      <Button onClick={() => setShow(true)}>Market</Button>
      {show && (
        <Modal handleClose={() => setShow(false)}>
          <BorderContainer className="flex flex-col items-center bg-black/60 p-8 min-h-[1000px]">
            <h1 className="text-center font-bold mb-4">Market</h1>
            <p className="text-2xl font-bold text-[orange] text-center mb-2">
              Money: ${GAME_STATE.user.value?.money}
            </p>
            <div className="flex items-start gap-8">
              <div className="">
                <div className="border-[burlywood] bg-[lightgreen] rounded-lg border-8 flex items-center justify-center">
                  <canvas ref={canvasRef} className="aspect-square" />
                  {loading && <Loading className="absolute " />}
                </div>
                <div className="flex justify-between items-center">
                  <Chevron
                    direction="left"
                    onClick={() => handleChangePage(-1)}
                  />
                  <span className="text-white">{pagination?.page || 1}</span>
                  <Chevron
                    direction="right"
                    onClick={() => handleChangePage(+1)}
                  />
                </div>
              </div>
              <div className="w-[560px] text-white grid grid-cols-2 gap-2">
                {market.map((sale) => (
                  <div
                    key={sale._id}
                    className={clsx(
                      "border-2 p-2 hover:bg-green-600 gap-4 text-white cursor-pointer flex flex-col",
                      selected?._id === sale.bug._id && "bg-green-600"
                    )}
                    onClick={() => {
                      setSelected(sale.bug)
                      selectedObject.value = sale.bug
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-red-600">
                        <BugPattern appc={sale.bug.appearance._id} />
                      </div>
                      <div className="py-2">
                        <p>
                          <b>Pattern</b>: {sale.bug.appearance.name}
                        </p>

                        <p className="text-sm">
                          Hatch:{" "}
                          {moment(
                            (sale.bug as unknown as IBug).createdAt
                          ).fromNow()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto flex justify-between">
                      <p className="text-[orange] text-2xl font-bold mt-auto pl-2">
                        <b>Price:</b> ${sale.price}
                      </p>
                      {GAME_STATE.user.value?._id === sale.seller ? (
                        <Button onClick={handleUnBuy}>Cancel</Button>
                      ) : (
                        <Button onClick={handleBuy}>Buy</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BorderContainer>
        </Modal>
      )}
    </>
  )
}
