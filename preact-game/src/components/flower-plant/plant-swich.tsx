import clsx from 'clsx'
import './switch.css'
import { GAME_STATE } from '@/core/gameState'
import Tooltip from '../common/toolip'

export default function PlantSwitch({ className }: {className?: string}) {
  const handleChange = (event) => {
    const { checked } = event.target
    GAME_STATE.farm.value.mode = checked ? 'Plant' : 'Play' 
  }
  return (
    <Tooltip message='In plant mode, right click to plant a flower (cost $7)' dir='top'>
      <label className={clsx("switch", className)}>
        <input type="checkbox" onChange={handleChange} />
        <span className="slider"></span>
      </label>
    </Tooltip>
  )
}
