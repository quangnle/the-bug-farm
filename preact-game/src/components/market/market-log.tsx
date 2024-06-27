import api from "@/core/axios";
import { GAME_STATE } from "@/core/gameState";
import useList from "@/hooks/useList";
import { MouseEvent, useMemo } from "react";
import Chevron from "../common/chevron";
import clsx from "clsx";
import BugPattern from "../bug-pattern";
import { getSaleGenesInfo } from "@/core/utils";
import Button from "../common/button";

export default function MarketLog({
  onClickCancel = () => {},
}: {
  onClickCancel?: (
    event: MouseEvent<HTMLButtonElement, MouseEvent>,
    x: ISale
  ) => void;
}) {
  const params = useMemo(
    () => ({
      page: 1,
    }),
    []
  );
  const { data: list, pagination } = useList(api.getSalesHistory, {
    lock: !GAME_STATE.user.value?._id,
    params,
  });

  const handleChangePage = (value: number) => {
    if (!pagination?.total) return;
    const nextPage = (pagination?.page || 1) + value;
    console.log(
      nextPage,
      Math.round(pagination?.total / (pagination?.perPage || 10))
    );

    if (
      nextPage <= 0 ||
      nextPage > Math.ceil(pagination?.total / (pagination?.perPage || 10))
    ) {
      return;
    }

    pagination?.onChange && pagination?.onChange(nextPage);
  };

  return (
    <>
      <table className="table-auto text-white border-collapse border w-full">
        <thead>
          <tr>
            <th className="p-2">Pattern</th>
            <th className="p-2">#ID</th>
            <th className="p-2 text-center">Price</th>
            <th className="p-2 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {list.map((x: ISale) => (
            <tr className="border">
              <td className="p-2">
                <div className="bg-[red] w-16">
                  <BugPattern app={x.bug.appearance} />
                </div>
              </td>
              <td className="p-2">
                <p className="text-xl">
                  Genes: {getSaleGenesInfo(x.bug.genes)}
                </p>
              </td>
              <td className="p-2 text-center">${x.price}</td>
              <td className="p-2 text-center">{x.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-5">
        <Chevron
          className={clsx(pagination?.page === 1 && "invisible")}
          direction="left"
          onClick={() => handleChangePage(-1)}
        />
        <span className="text-white">{pagination?.page || 1}</span>
        <Chevron
          className={clsx(
            pagination?.page ===
              Math.round(pagination?.total! / (pagination?.perPage || 10)) &&
              "invisible"
          )}
          direction="right"
          onClick={() => handleChangePage(+1)}
        />
      </div>
    </>
  )
}
