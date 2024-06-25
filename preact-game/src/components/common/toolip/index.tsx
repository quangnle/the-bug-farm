import clsx from "clsx";
import { ReactNode } from "react";

export default function Tooltip({
  message,
  dir = 'bottom',
  children,
}: {
  message: string
  dir?: 'top' | 'bottom'
  children: ReactNode | ReactNode[]
}) {
  return (
    <div className="group relative flex items-center justify-center">
      {children}
      <span className={
        clsx("absolute scale-0 transition-all w-max rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100",
          dir === 'top' && 'bottom-10',
          dir === 'bottom' && 'top-10'
        )
      }>
        {message}
      </span>
    </div>
  )
}
