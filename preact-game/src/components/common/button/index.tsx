import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
import './style.css'
import Loading from "../loading";

type buttonProps = {
  loading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ loading = false, ...props }: buttonProps) {
  return (
    <button {...props} className={clsx("btn", props.className)}>
      {loading ? (
        <span className="btn--top h-[58px]">
          <Loading className="scale-50 -mt-2" />
        </span>
      ) : (
        <span className="btn--top">{props.children}</span>
      )}
    </button>
  )
}