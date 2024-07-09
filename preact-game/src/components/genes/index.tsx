import api from "@/core/axios";
import useList from "@/hooks/useList";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import BorderContainer from "../border-container";
import BugPattern from "../bug-pattern";
import Chevron from "../common/chevron";
import Modal from "../common/modal";
import IconButtons from "../icon-buttons";
import { handleError } from "@/utils/helpers";

export default function Genes() {
  const [show, setShow] = useState(false);
  const [systemGenes, setSystemGenes] = useState<IAppearance[]>();
  const [userGenes, setUserGenes] = useState<IAppearance[]>();
  const params = useMemo(
    () => ({
      perPage: 10,
      otherUser: true,
    }),
    []
  );

  const { data: otherUserAppearances, pagination } = useList(
    api.getAllAppearances,
    {
      params,
    }
  );

  const fetchSystemGenes = async () => {
    try {
      const { data } = await api.getSystemAppearances();
      setSystemGenes(data);
    } catch (err) {
      handleError(err);
    }
  };
  const fetchUserGenes = async () => {
    try {
      const { data } = await api.getUserAppearances();
      setUserGenes(data);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchSystemGenes();
    fetchUserGenes();
  }, []);

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

  const geneCard = (gene: IAppearance) => (
    <BorderContainer
      key={gene._id}
      className={clsx(
        "border-2 p-2 hover:bg-green-600 gap-4 text-white cursor-pointer"
      )}
    >
      <div className="flex items-center gap-4">
        <div className="w-fit bg-red-600">
          <BugPattern app={gene} />
        </div>
        <div className="py-2">
          <p>
            <b>Pattern</b>: {gene.name}
          </p>
          <p>Score: {gene.score}</p>
        </div>
      </div>
    </BorderContainer>
  );

  return (
    <>
      <IconButtons onClick={() => setShow(true)}>
        <img src="/assets/gene.png" className="w-8 hover:w-10 duration-200" />
      </IconButtons>
      {show && (
        <Modal handleClose={() => setShow(false)}>
          <BorderContainer className="h-[80vh] overflow-auto bg-black/60 p-4 flex flex-col gap-6">
            <h1 className="text-center">Genes Collection</h1>

            <div className="">
              <h1 className="text-3xl">System Genes</h1>
              <div>
                <div
                  className="grid gap-4 w-[70vw] max-w-[1000px]"
                  style={{
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(300px, 1fr))",
                  }}
                >
                  {systemGenes?.map((app: IAppearance) => geneCard(app))}
                </div>
              </div>
            </div>

            <div className="">
              <h1 className="text-3xl">Owned Genes</h1>
              <div>
                <div
                  className="grid gap-4 w-[70vw] max-w-[1000px]"
                  style={{
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(300px, 1fr))",
                  }}
                >
                  {userGenes?.map((app: IAppearance) => geneCard(app))}
                </div>
              </div>
            </div>

            <div className="">
              <h1 className="text-3xl">Genes from market</h1>
              <div>
                <div
                  className="grid gap-4 w-[70vw] max-w-[1000px]"
                  style={{
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(300px, 1fr))",
                  }}
                >
                  {otherUserAppearances.map((app: IAppearance) =>
                    geneCard(app)
                  )}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Chevron
                    className={clsx(pagination?.page === 1 && "invisible")}
                    direction="left"
                    onClick={() => handleChangePage(-1)}
                  />
                  <span className="text-white">{pagination?.page || 1}</span>
                  <Chevron
                    className={clsx(
                      pagination?.page &&
                        pagination?.page >
                          Math.round(
                            pagination?.total! / (pagination?.perPage || 10)
                          ) &&
                        "invisible"
                    )}
                    direction="right"
                    onClick={() => handleChangePage(+1)}
                  />
                </div>
              </div>
            </div>
          </BorderContainer>
        </Modal>
      )}
    </>
  );
}
