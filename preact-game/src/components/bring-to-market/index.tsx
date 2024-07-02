import { useEffect, useMemo, useState } from "react"
import Modal from "../common/modal"
import BorderContainer from "../border-container"
import BugPattern from "../bug-pattern"
import { GAME_STATE, selectedObject, sketchInstance } from "@/core/gameState"
import Bug from "@/core/entity/bug"
import api from "@/core/axios"
import Button from "../common/button"
import { handleError } from "@/utils/helpers"
import Tooltip from "../common/toolip"
import clsx from "clsx"

export const MARKET_CONFIG = {
  priceWillGetFeePercentage: 50,
  percentageFeeInSale: 1,
  minimumFeeInSale: 5,
  maxDaysSent: 7,
  minDaysSent: 1,
}

export default function BringToMarket () {
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({
    price: 1,
    description: '',
    numberOfDaysSent: 1,
  })

  const feeInStore = useMemo(
    () =>
      Math.round(
        form.price * (MARKET_CONFIG.percentageFeeInSale / 100) <=
          MARKET_CONFIG.minimumFeeInSale
          ? MARKET_CONFIG.minimumFeeInSale * form.numberOfDaysSent
          : form.price *
              (MARKET_CONFIG.percentageFeeInSale / 100) *
              form.numberOfDaysSent
      ),
    [form.price, form.numberOfDaysSent]
  )

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const payload = {
        bugId: (selectedObject.value as Bug)._id,
        ...form
      }
      await api.saleListing(payload)
      GAME_STATE.farm.value.colony.splice(GAME_STATE.farm.value.colony.indexOf(selectedObject.value as Bug), 1)
      selectedObject.value = null
      setShow(false)
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    if (show) {
      sketchInstance.noLoop()
    } else {
      sketchInstance.loop()
    }
    return () => {
      sketchInstance.loop()
    }
  }, [show])

  return (
    <>
      <Button onClick={() => setShow(true)}>Bring to Market</Button>
      {show && (
        <Modal handleClose={() => setShow(false)}>
          <BorderContainer className="bg-white bg-black/60 p-8">
            <h1 className="text-center uppercase mb-8">Bring it to Market</h1>

            <div className="flex flex-col gap-4 items-start">
              <form className="flex gap-4" onSubmit={handleSubmit}>
                <div className="">
                  <BorderContainer className="w-[160px] h-[160px] aspect-square border-2 mb-4 bg-[red]">
                    <BugPattern
                      app={(selectedObject.value as Bug).appearance}
                    />
                  </BorderContainer>
                  <p className="text-[orange] font-bold max-w-[160px]">
                    Name:{" "}
                    <span className="capitalize">
                      {(selectedObject.value as Bug)?.appearance.name}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <Tooltip message="Price">
                        <span className="flex items-center justify-center w-10 h-10">
                          <img
                            src="/assets/icons/money-bag.svg"
                            width={40}
                            height={40}
                          />
                        </span>
                      </Tooltip>

                      <input
                        className="bg-slate-50 p-2 w-full"
                        placeholder="Price"
                        type="number"
                        min={1}
                        step={1}
                        value={form.price}
                        onChange={(event) =>
                          setForm((prev) => ({
                            ...prev,
                            price: parseInt(event.target.value),
                          }))
                        }
                      />
                    </label>

                    <label className="flex items-center gap-2">
                      <Tooltip message="Days Sent">
                        <span className="flex items-center justify-center w-10 h-10">
                          <img
                            src="/assets/icons/hourglass.svg"
                            width={32}
                            height={32}
                          />
                        </span>
                      </Tooltip>
                      <input
                        className="bg-slate-50 p-2 w-full"
                        placeholder="Price"
                        type="number"
                        min={1}
                        max={MARKET_CONFIG.maxDaysSent}
                        step={1}
                        value={form.numberOfDaysSent}
                        onChange={(event) =>
                          setForm((prev) => ({
                            ...prev,
                            numberOfDaysSent: parseInt(event.target.value),
                          }))
                        }
                      />
                    </label>
                  </div>
                  <textarea
                    className="w-full resize-none bg-slate-50 p-2 outline-0 flex-1"
                    placeholder="Description"
                    value={form.description}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        description: event.target.value,
                      }))
                    }
                  ></textarea>

                  <div className="mt-2 flex gap-2 items-center justify-end">
                    <span>
                      Fee:{" "}
                      <span
                        className={clsx(
                          feeInStore > (GAME_STATE.user.value?.money || 0) &&
                            "text-[red]"
                        )}
                      >
                        ${feeInStore || "?"}
                      </span>
                    </span>
                    <Button
                      type="submit"
                      className="text-[orange]"
                      disabled={
                        feeInStore > (GAME_STATE.user.value?.money || 0)
                      }
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </BorderContainer>
        </Modal>
      )}
    </>
  )
}