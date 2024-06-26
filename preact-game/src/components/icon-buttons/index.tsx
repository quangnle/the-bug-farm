import { ButtonHTMLAttributes } from 'react'
import './style.css'
import clsx from 'clsx'

type buttonProps = {
  icon: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function IconButtons({ icon,...props }: buttonProps) {
  return (
    <button {...props} className={clsx("icon-btn", props.className)}>
      <img src={`/assets/${icon}.png`} />
    </button>
  )
}