import { signal } from "@preact/signals"
import PlantSwitch from "./plant-swich"
import "./style.css"

export const plantFlower = signal({
  petalNumber: 5,
  pistilColor: '#ff0000',
  pistilSize: 5,
  petalColor: '#ffffff',
  petalSize: 5,
})

export default function FlowerPlant() {

  const handleChangeInput = (event) => {
    const { name} = event.target
    let {value } = event.target
    if (name === 'petalNumber' || name === 'pistilSize' || name === 'petalSize') {
      value = parseInt(value)
    }
    plantFlower.value[name] = value
  }
  return (
    <div className="flex flex-col h-full">
      <h1 className="header">Flower Seed</h1>
      <ul className="plant-control">
        <li>
          <span>Number of petals</span>
          <input type="number" name="petalNumber" value={plantFlower.value.petalNumber} onChange={handleChangeInput} id="petal-number" min="5" max="8" />
        </li>
        <li>
          <span>Pistil Color</span>
          <input type="color" name="pistilColor" value={plantFlower.value.pistilColor} onChange={handleChangeInput} id="pistil-color" />
        </li>
        <li>
          <span>Size</span>
          <input type="number" name="pistilSize" value={plantFlower.value.pistilSize} onChange={handleChangeInput} id="pistil-size" min="3" max="7" />
        </li>
        <li>
          <span>Petal Color</span>
          <input type="color" name="petalColor" value={plantFlower.value.petalColor} onChange={handleChangeInput} id="petal-color" />
        </li>
        <li>
          <span>Size</span>
          <input type="number" name="petalSize" value={plantFlower.value.petalSize} onChange={handleChangeInput} id="petal-size" min="3" max="7" />
        </li>
      </ul>
      <PlantSwitch className="mt-auto" />
    </div>
  )
}
