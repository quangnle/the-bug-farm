import api from "@/core/axios"
import { GAME_STATE } from "@/core/gameState"
import useList from "@/hooks/useList"
import { useMemo, MouseEvent } from "react"
import BugPattern from "../bug-pattern"
import { getSaleGenesInfo } from "@/core/utils"
import Button from "../common/button"

export default function MarketLog({
  onClickCancel = () => {},
}: {
  onClickCancel?: (
    event: MouseEvent<HTMLButtonElement, MouseEvent>,
    x: ISale
  ) => void
}) {
  const fetchParams = useMemo(
    () => ({
      sellerId: GAME_STATE.user.value?._id,
    }),
    [GAME_STATE.user.value]
  )
  const { data: list } = useList(api.getSales, {
    params: fetchParams,
    lock: !GAME_STATE.user.value?._id,
  })
  return (
    <table className="table-auto text-white border-collapse border w-full">
      <thead>
        <th className="p-2">Pattern</th>
        <th className="p-2">#ID</th>
        <th className="p-2 text-center">Price</th>
        <th className="p-2 text-center">Status</th>
      </thead>
      <tbody>
        {list.map((x: ISale) => (
          <tr className="border">
            <td className="p-2">
              <div className="bg-[red] w-16">
                <BugPattern appc={x.appearance} />
              </div>
            </td>
            <td className="p-2">
              <p>{x._id}</p>
              <p className="text-xl">Genes: {getSaleGenesInfo(x.bug.genes)}</p>
            </td>
            <td className="p-2 text-center">${x.price}</td>
            <td className="p-2 text-center">{x.status}</td>
            <td className="p-2 text-center">
              {x.status === "Pending" && (
                <Button onClick={(event) => onClickCancel(event, x)}>
                  Cancel
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}