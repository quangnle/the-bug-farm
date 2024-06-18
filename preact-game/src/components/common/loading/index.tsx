import clsx from 'clsx'
import './style.css'

export default function Loading ({ className }: { className?: string }) {
  return <div className={clsx('loader', className)}></div>
}