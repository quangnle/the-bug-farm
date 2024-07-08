import api from "@/core/axios";
import useList from "@/hooks/useList";
import clsx from "clsx";
import { FC, useMemo, useState } from "react";
import BorderContainer from "../border-container";
import Chevron from "../common/chevron";
import Modal from "../common/modal";
import IconButtons from "../icon-buttons";
import { GAME_STATE } from "@/core/gameState";
import moment from "moment";
import Button from "../common/button";

interface IProp {}

const UserModal: FC<IProp> = () => {
  const [show, setShow] = useState(false);
  const params = useMemo(
    () => ({
      perPage: 10,
      sortField: "money",
      sortOrder: "desc",
    }),
    []
  );
  const { data: users, pagination } = useList<IUser, {}>(api.getUsers, {
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
      <IconButtons onClick={() => setShow(true)} icon="leaderboard" />
      {show && (
        <Modal handleClose={() => setShow(false)}>
          <BorderContainer className="bg-black/60 p-5">
            <table className="table-auto text-white border-collapse border w-full">
              <thead>
                <tr className="border">
                  <th className="p-4">Rank</th>
                  <th className="p-4">#ID</th>
                  <th className="p-4 text-center">Money</th>
                  {/* <th className="p-4 text-center">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {users.map((user: IUser, index) => (
                  <tr key={user._id} className="border">
                    <td className="p-4">
                      <p>
                        {(pagination?.page! - 1) * pagination?.perPage! +
                          (index + 1)}
                      </p>
                    </td>
                    <td className="p-4">
                      <p>{user.username}</p>
                    </td>
                    <td className="p-4">
                      <p>{user.money}</p>
                    </td>
                    {/* <td className="p-4">
                      <Button onClick={() => getListTanks(user._id)}>
                        Visit
                      </Button>
                    </td> */}
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
                    Math.round(
                      pagination?.total! / (pagination?.perPage || 10)
                    ) && "invisible"
                )}
                direction="right"
                onClick={() => handleChangePage(+1)}
              />
            </div>
          </BorderContainer>
        </Modal>
      )}
    </>
  );
};

export default UserModal;
