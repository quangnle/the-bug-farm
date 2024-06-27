import { ButtonHTMLAttributes } from 'react'
import './style.css'
import clsx from 'clsx'

type buttonProps = {
  icon?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function IconButtons({ icon,...props }: buttonProps) {
  return (
    <button {...props} className={clsx("icon-btn", props.className)}>
      {props.children ||
        (icon && (
          <img src={`/assets/${icon}.png`} className="icon-button__img" />
        ))}
    </button>
  )
}