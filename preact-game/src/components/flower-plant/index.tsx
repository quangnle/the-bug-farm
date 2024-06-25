import { signal } from "@preact/signals"
import PlantSwitch from "./plant-swich"
import "./style.css"
import Button from "../common/button"
import { GAME_STATE } from "@/core/gameState"
import Flower from "@/core/entity/flower"
import { useEffect, useState } from "react"
import Route from "@/core/entity/route"

export const plantFlower = signal({
  petalNumber: 5,
  pistilColor: '#ff0000',
  pistilSize: 5,
  petalColor: '#ffffff',
  petalSize: 5,
})

export default function FlowerPlant() {
  const [flower, setFlower] = useState({
    petalNumber: 5,
    pistilColor: '#ff0000',
    pistilSize: 5,
    petalColor: '#ffffff',
    petalSize: 5,
  })
  const [marchingShow, setMarchingShow] = useState(false)

  const handleChangeInput = (event) => {
    const { name} = event.target
    let { value } = event.target
    if (name === 'petalNumber' || name === 'pistilSize' || name === 'petalSize') {
      value = Math.min(10, Math.max(3, parseInt(value)))
    }
    setFlower(prev => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    plantFlower.value = flower
  }, [flower])


  const toggleShow = () => {
    const flowers = GAME_STATE.farm.value.objects.filter(
      (obj) => obj instanceof Flower
    )
    if (flowers.length > 1) {
      if (marchingShow) { // stop the show
        setMarchingShow(false)
        GAME_STATE.farm.value.mode = "play";
        GAME_STATE.farm.value.route?.stop();
        GAME_STATE.farm.value.route = null;
      } else { // start the show
        setMarchingShow(true)
        GAME_STATE.farm.value.mode = "show";
        GAME_STATE.farm.value.route = new Route(GAME_STATE.farm.value.colony, flowers);
        GAME_STATE.farm.value.route?.start();
      }
    }
  }

  return (
    <div className="flex flex-col h-full">
      <h1 className="header">Flower Seed</h1>
      <ul className="plant-control">
        <li>
          <span>Number of petals</span>
          <input
            type="number"
            name="petalNumber"
            value={flower.petalNumber}
            onChange={handleChangeInput}
            id="petal-number"
            min="3"
            max="10"
          />
        </li>
        <li>
          <span>Pistil Color</span>
          <input
            type="color"
            name="pistilColor"
            value={flower.pistilColor}
            onChange={handleChangeInput}
            id="pistil-color"
          />
        </li>
        <li>
          <span>Size</span>
          <input
            type="number"
            name="pistilSize"
            value={flower.pistilSize}
            onChange={handleChangeInput}
            id="pistil-size"
            min="3"
            max="10"
          />
        </li>
        <li>
          <span>Petal Color</span>
          <input
            type="color"
            name="petalColor"
            value={flower.petalColor}
            onChange={handleChangeInput}
            id="petal-color"
          />
        </li>
        <li>
          <span>Size</span>
          <input
            type="number"
            name="petalSize"
            value={flower.petalSize}
            onChange={handleChangeInput}
            id="petal-size"
            min="3"
            max="10"
          />
        </li>
      </ul>
      <div className="flex flex-col justify-end mt-auto">
        <div className="flex items-center mt-4 justify-end gap-4">
          <p className="text-sm">Switch mode</p>
          <PlantSwitch className="ml-auto" />
        </div>
        <Button className="mt-2" onClick={toggleShow}>
          {marchingShow ? "Stop the Show!!!" : "Start The Marching Show!!!"}
        </Button>
      </div>
    </div>
  )
}
