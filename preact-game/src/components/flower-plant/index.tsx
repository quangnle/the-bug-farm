export default function FlowerPlant() {
  return (
    <>
      <h1 className="header">Flower Seed</h1>
      <ul>
        <li>
          Number of petals:{" "}
          <input type="number" id="petal-number" value="5" min="5" max="8" />
        </li>
        <li>
          Pistil Color: <input type="color" id="pistil-color" value="#ff0000" />
        </li>
        <li>
          Size:{" "}
          <input type="number" id="pistil-size" value="5" min="3" max="7" />
        </li>
        <li>
          Petal Color: <input type="color" id="petal-color" value="#ffffff" />
        </li>
        <li>
          Size:{" "}
          <input type="number" id="petal-size" value="5" min="3" max="7" />
        </li>
      </ul>
    </>
  )
}
