import api from "@/core/axios"
import Bug from "@/core/entity/bug"
import Farm from "@/core/entity/farm"
import { GAME_STATE, selectedObject, sketchInstance } from "@/core/gameState"
import useList from "@/hooks/useList"
import { Signal, signal } from "@preact/signals"
import clsx from "clsx"
import moment from "moment"
import p5 from "p5"
import { MouseEvent, useEffect, useRef, useState } from "react"
import BorderContainer from "../border-container"
import BugPattern from "../bug-pattern"
import Button from "../common/button"
import Chevron from "../common/chevron"
import Loading from "../common/loading"
import Modal from "../common/modal"
import { getSaleGenesInfo } from "@/core/utils"
import { CANVAS_SIZE } from "../create-pattern/useCreatePattern"
import Tooltip from "../common/toolip"

const MARKET_SIZE = 400
const marketFarm: Signal<Farm> = signal(
  new Farm(0, 0, MARKET_SIZE, MARKET_SIZE, "#77dd22")
)

export default function Market() {
  const canvasRef = useRef(null)
  const p5Ref = useRef<p5 | null>(null)
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState<Bug | null>(null)
  const [market, setMarket] = useState<ISale[]>([])
  const [tab, setTab] = useState<"market" | "logs">("market")

  const {
    data: list,
    loading,
    refresh: reloadList,
    pagination,
  } = useList(api.getSales, {
    lock: !GAME_STATE.user.value?._id,
  })

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
            bug: _bug,
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
          if (
            s.mouseY > marketFarm.value?.x &&
            s.mouseY < marketFarm.value?.y + marketFarm.value?.height
          ) {
            marketFarm.value?.mousePressed(
              s.mouseButton,
              s.mouseX,
              s.mouseY,
              (bug) => {
                setSelected(bug)
              }
            )
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

  // const selectedSale = useMemo(
  //   () => market.find((x) => x.bug._id === selected?._id),
  //   [market, selected]
  // );

  const handleBuy = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    sale: ISale
  ) => {
    e.stopPropagation()
    try {
      if (!GAME_STATE.tank.value?._id) return
      const { data: _sale } = await api.buyBug(sale._id, {
        tankId: GAME_STATE.tank.value?._id,
      })
      removeSale(_sale)
    } catch (error: any) {
      alert(error?.response?.data?.message)
    }
  }

  const handleUnBuy = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    sale: ISale
  ) => {
    e.stopPropagation()
    try {
      if (!GAME_STATE.tank.value?._id) return
      const { data: _sale } = await api.saleUnListting(sale._id, {
        tankId: GAME_STATE.tank.value?._id,
      })
      removeSale(_sale)
    } catch (error: any) {
      alert(error?.response?.data?.message)
    }
  }

  const removeSale = async (_sale: ISale) => {
    if (_sale) {
      marketFarm.value.colony = marketFarm.value.colony.filter(
        (x) => x._id !== _sale.bug
      )
      setMarket(market.filter((x) => x._id !== _sale._id))
      setSelected(null)

      const { data: bug } = await api.getBug(_sale.bug)
      GAME_STATE.farm.value?.colony.push(
        new Bug({
          ...bug,
          appearance: bug.appearance._id,
          genes: bug.genes.map((x: Bug) => x._id),
          p5: sketchInstance,
          size: 20,
          x: Math.random() * CANVAS_SIZE,
          y: Math.random() * CANVAS_SIZE,
          color: "#f00",
        })
      )
    }
  }

  const handleChangePage = (value: number) => {
    if (!pagination?.total) return
    const nextPage = (pagination?.page || 1) + value
    console.log(
      nextPage,
      Math.round(pagination?.total / (pagination?.perPage || 10))
    )

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
      <Tooltip message="Market">
        <Button onClick={() => setShow(true)}>Market</Button>
      </Tooltip>
      {show && (
        <Modal handleClose={() => setShow(false)}>
          <BorderContainer className="flex flex-col items-center w-[80vw] bg-black/60 p-8 min-h-[1000px]">
            <h1 className="text-center font-bold mb-8">
              Market ${GAME_STATE.user.value?.money}
            </h1>

            <div className="w-full flex justify-between mb-8">
              <Button
                className={clsx(tab === "market" && "invisible")}
                onClick={() => setTab("market")}
              >
                Market
              </Button>
              <Button
                className={clsx(tab === "logs" && "invisible")}
                onClick={() => setTab("logs")}
              >
                Logs
              </Button>
            </div>

            <div
              className={clsx(
                "items-start gap-8 w-full",
                tab === "market" ? "flex" : "hidden"
              )}
            >
              <div className="">
                <div className="border-[burlywood] bg-[lightgreen] rounded-lg border-8 flex items-center justify-center">
                  <canvas ref={canvasRef} className="aspect-square" />
                  {loading && <Loading className="absolute " />}
                </div>
                <div className="flex justify-between items-center">
                  <Chevron
                    className={clsx(pagination?.page === 1 && "invisible")}
                    direction="left"
                    onClick={() => handleChangePage(-1)}
                  />
                  <span className="text-white">{pagination?.page || 1}</span>
                  <Chevron
                    className={clsx(
                      pagination?.page ===
                        Math.round(
                          pagination?.total / (pagination?.perPage || 10)
                        ) && "invisible"
                    )}
                    direction="right"
                    onClick={() => handleChangePage(+1)}
                  />
                </div>
              </div>
              <div className="max-h-[800px] overflow-y-auto text-white grid grid-cols-2 gap-2">
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
                    <div className="flex items gap-4">
                      <div className="w-16 h-16 bg-red-600">
                        <BugPattern app={sale.bug.appearance} />
                      </div>
                      <div className="py-2 flex-1">
                        <p>
                          <b>Gene</b>: {getSaleGenesInfo(sale.bug.genes)}
                        </p>

                        <p className="text-sm">
                          Hatch:{" "}
                          {moment(
                            (sale.bug as unknown as IBug).createdAt
                          ).fromNow()}
                        </p>
                      </div>
                    </div>
                    <p className="pl-2 line-clamp-1">{sale.description}</p>
                    <div className="mt-auto flex justify-between">
                      <p className="text-[orange] text-2xl font-bold mt-auto pl-2">
                        <b>Price:</b> ${sale.price}
                      </p>
                      {GAME_STATE.user.value?._id === sale.seller ? (
                        <Button onClick={(e) => handleUnBuy(e, sale)}>
                          Cancel
                        </Button>
                      ) : (
                        <Button onClick={(e) => handleBuy(e, sale)}>Buy</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={clsx("w-full", tab === "logs" ? "flex" : "hidden")}>
              {/* <MarketLog onClickCancel={handleUnBuy} /> */}
            </div>
          </BorderContainer>
        </Modal>
      )}
    </>
  )
}
