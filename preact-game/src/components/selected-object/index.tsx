import Bug from "@/core/entity/bug"
import { GAME_STATE, selectedObject } from "@/core/gameState"
import { useEffect, useMemo, useRef, useState } from "react"
import BorderContainer from "../border-container"
import Flower from "@/core/entity/flower"
import { MAX_POLLENS, SPAWN_DURATION } from "@/core/constants"
import BugPattern from "../bug-pattern"
import BringToMarket from "../bring-to-market"
import Button from "../common/button"
import { sellBugEffect } from "@/core/effect"
import api from "@/core/axios"

export default function SelectedObject () {
  const canvasRef = useRef(null)

  const [staticData, setStaticData] = useState<{
    hungerRate?: number
    spawningTime?: number
    numberOfPollens?: number
  
  }>({
    hungerRate: 0,
    spawningTime: 0,
    numberOfPollens: 0,
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
          numberOfPollens: (selectedObject.value as Flower).numberOfPollens
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

  const handleSellBug = async () => {
    if (!(GAME_STATE.user.value && GAME_STATE.tank.value)) return;
    if (GAME_STATE.farm.value.colony.length === 1) return;
    const _find = GAME_STATE.farm.value.colony.findIndex(x => x === selectedObject.value)
    if (_find >= 0) {
      const [_bug] = GAME_STATE.farm.value.colony.splice(_find, 1)
      sellBugEffect(_bug.x, _bug.y)
      GAME_STATE.user.value.money += 1
      await api.sellBugs({
        tankId: GAME_STATE.tank.value?._id,
        bugIds: [_bug._id]
      })
    }
  }

  const handleRemoveFlower = async () => {
    GAME_STATE.farm.value.objects.forEach(async (obj, index) => {
      if (obj === selectedObject.value) {
        const removeFlower = GAME_STATE.farm.value.objects.splice(index, 1)
  
        await api.removeFlower(removeFlower[0]._id)
      }
    })
  }

  const total = useMemo(() => {
    if (selectedObject.value instanceof Bug) {
      return selectedObject.value.genes.reduce((acc, gene) => acc + gene.score, 0)
    }
  }, [selectedObject.value])

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between mb-4">
        {selectedObject.value && <BorderContainer className="border-2 w-24 h-24">
          <canvas
            ref={canvasRef}
            className="object-render-canvas w-full"
            width={64}
            height={64}
          />
        </BorderContainer>}

        {selectedObject.value instanceof Bug && (
          <BorderContainer className="border-2 w-24 h-24 bg-[red]">
            <BugPattern appc={selectedObject.value.appearance._id} />
          </BorderContainer>
        )}
      </div>
      <div className="flex flex-col h-full">
        {selectedObject.value instanceof Bug && (
          <>
            <p>Hunger rate: {staticData.hungerRate}</p>
            <p className="mb-4">
              Appearance: {selectedObject.value.appearance?.name}
            </p>
            <p className="border-b border-black border-dashed">
              List of genes:{" "}
            </p>
            {selectedObject.value.genes.map((gene, index) => (
              <p key={index}>
                - {gene.name}: {Math.round(gene.score / total * 100)}%
              </p>
            ))}
            <div className="mt-auto flex justify-between">
              <Button onClick={handleSellBug}>Sell</Button>
              <BringToMarket />
            </div>
          </>
        )}
        {selectedObject.value instanceof Flower && (
          <>
            <p>
              Time to spawn:{" "}
              {Math.max(0, Math.round((staticData.spawningTime || 0) / 1000))} /{" "}
              {SPAWN_DURATION / 1000}s
            </p>
            <p>
              Num of Pollens left: {staticData.numberOfPollens} / {MAX_POLLENS}
            </p>
            <div className="mt-auto flex justify-between">
              <Button onClick={handleRemoveFlower}>Remove flower</Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}