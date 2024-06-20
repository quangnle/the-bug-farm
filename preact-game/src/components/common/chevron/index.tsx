import clsx from 'clsx'
import './style.css'
import { ButtonHTMLAttributes } from 'react'

export default function Chevron({ direction = 'left', ...props}: { direction?: 'left' | 'right'} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={clsx('chevron', direction, props.className)}>
    <img src='/assets/icons/chevron-right.svg'/>
  </button>
}