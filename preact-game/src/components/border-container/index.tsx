import { ReactNode } from 'react'
import './style.css'
import clsx from 'clsx'

export default function BorderContainer ({ children, className }: {
  children?: ReactNode | ReactNode[],
  className?: string
}) {
  return (
    <div className={clsx("border-container", className)}>
      {children}
      <div className="decor">
      <div className="corner__top-left corner"></div>
      <div className="corner__top-right corner"></div>
      <div className="corner__bottom-left corner"></div>
      <div className="corner__bottom-right corner"></div>

      <div className="line__left line"></div>
      <div className="line__right line"></div>
      <div className="line__top line"></div>
      <div className="line__bottom line"></div>
      </div>
    </div>
  )
}