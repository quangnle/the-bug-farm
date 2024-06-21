import { ReactNode } from "react";

export default function Tooltip({
  message,
  children,
}: {
  message: string
  children: ReactNode | ReactNode[]
}) {
  return (
    <div className="group relative flex items-center justify-center">
      {children}
      <span className="absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
        {message}
      </span>
    </div>
  )
}
