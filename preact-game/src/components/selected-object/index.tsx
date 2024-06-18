import Bug from "@/core/entity/bug"
import { selectedObject } from "@/core/gameState"
import { drawSvg } from "@/core/utils"
import { useEffect, useRef, useState } from "react"
import BorderContainer from "../border-container"
import Flower from "@/core/entity/flower"
import { MAX_POLLENS, SPAWN_DURATION } from "@/core/constants"
import BugPattern from "../bug-pattern"
import BringToMarket from "../bring-to-market"

export default function SelectedObject () {
  
  const canvasRef = useRef(null)
  const ref = useRef(null)

  const [staticData, setStaticData] = useState({
    spawningTime: 0,
    numOfPollens: 0,
  })

  const updateSelectedObject = () => {
    if (canvasRef.current && selectedObject.value) {
      const ctx = (canvasRef.current as HTMLCanvasElement).getContext('2d')
      if (!ctx) return
      ctx.fillStyle = "#77dd22"
      ctx.strokeStyle = "#000"
      ctx.rect(0, 0, 64, 64)
      ctx.fill()
      ctx.stroke()
      selectedObject.value?.drawIcon(ctx, 32, 32)

      if (selectedObject.value instanceof Flower) {
        setStaticData({
          spawningTime: (selectedObject.value as Flower).spawningTime,
          numOfPollens: (selectedObject.value as Flower).numberOfPollens
        })
      }
    }
  }

  useEffect(() => {
    updateSelectedObject()
  }, [selectedObject.value])

  useEffect(() => {
    const interval = setInterval(() => {
      updateSelectedObject()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-4">
        <BorderContainer className="border-2 w-24 h-24">
          <canvas
            ref={canvasRef}
            className="object-render-canvas w-full"
            width={64}
            height={64}
          />
        </BorderContainer>

        {selectedObject.value instanceof Bug && <BorderContainer className="border-2 w-24 h-24 bg-[red]">
          <BugPattern appc={selectedObject.value.appearance._id} />
        </BorderContainer>}
      </div>
      <div className="">
        {selectedObject.value instanceof Bug && (
          <>
          <div className="flex">
            <BringToMarket />
          </div>
          </>
        )}
        {selectedObject.value instanceof Flower && (
          <>
            <p>Time to spawn: {Math.min(0, Math.round(staticData.spawningTime / 1000))} / {SPAWN_DURATION / 1000}s</p>
            <p>Num of Pollens left: {staticData.numOfPollens} / {MAX_POLLENS}</p>
          </>
        )}
      </div>
    </div>
  )
}