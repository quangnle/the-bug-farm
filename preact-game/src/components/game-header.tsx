import { GAME_STATE } from "@/core/gameState"
import Market from "./market"
import { useEffect, useState } from "react"
import BugList from "./bug-list"
import Button from "./common/button"
import Flower from "@/core/entity/flower"
import Route from "@/core/entity/route"

export default function GameHeader () {
  const [staticData, setStaticData] = useState({
    population: 0,
    money: 0,
    flowers: 0
  })
  const [marchingShow, setMarchingShow] = useState(false)
  useEffect(() => {
    const fetchStaticData = () => {
      setStaticData({
        population: GAME_STATE.farm.value?.colony.length,
        money: GAME_STATE.user.value?.money as number,
        flowers: GAME_STATE.farm.value?.objects.length
      })
    }

    const interval = setInterval(fetchStaticData, 500)

    return () => { clearInterval(interval) }
  }, [])

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

  return <div className="flex items-center justify-between bg-green-200 gap-8 p-6 px-8">
    <div className="flex items-center gap-8">
      <h1 className="h1">{GAME_STATE.user.value?.username}</h1>
      <div className="font-bold">Money: ${staticData.money}</div>
      <div className="font-bold">Population: {staticData.population} / {GAME_STATE.tank.value?.size}</div>
      <div className="font-bold">Flowers: {staticData.flowers}</div>
    </div>
    <div className="flex gap-4">
      <Button onClick={toggleShow}>{marchingShow ? 'Stop the Show!!!' : 'Start The Marching Show!!!'}</Button>
      <BugList />
      <Market />
    </div>
  </div>
}