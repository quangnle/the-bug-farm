import clsx from 'clsx'
import './switch.css'
import { GAME_STATE } from '@/core/gameState'

export default function PlantSwitch({ className }: {className?: string}) {
  const handleChange = (event) => {
    const { checked } = event.target
    GAME_STATE.farm.value.mode = checked ? 'plant' : 'play' 
  }
  return (
    <label className={clsx('switch', className)}>
      <input type="checkbox" onChange={handleChange} />
      <span className="slider"></span>
    </label>
  )
}
