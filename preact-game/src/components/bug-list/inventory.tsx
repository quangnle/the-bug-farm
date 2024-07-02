import useList from "@/hooks/useList"
import Button from "../common/button"
import api from "@/core/axios"
import { useMemo } from "react"
import BorderContainer from "../border-container"
import clsx from "clsx"
import BugPattern from "../bug-pattern"

export default function Inventory({
  changeTab = () => {},
}: {
  changeTab?: () => void
}) {
  const fetchBugVault = useMemo(
    () => ({
      perPage: 15,
    }),
    []
  )
  const { data: bugVault, pagination } = useList(api.getBugStorage, {
    params: fetchBugVault,
  })

  console.log({ bugVault, pagination })

  return (
    <div className="p-4">
      <h1 className="text-center">Inventory</h1>
      <div className="flex justify-between">
        <Button onClick={changeTab}>My Bugs</Button>
      </div>

      <div className="mt-8">
        <h1 className="text-3xl mb-4">Bugs</h1>
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
        >
          {bugVault.map((bug) => {
            const total = bug.genes.reduce((acc, gene) => acc + gene.score, 0)

            return (
              <BorderContainer
                key={bug._id}
                className={clsx(
                  "border-2 p-2 hover:bg-green-600 gap-4 text-white cursor-pointer"
                  // selectedBugs.includes(bug) && "bg-green-600"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-red-600">
                    <BugPattern app={bug.appearance} />
                  </div>
                  <div className="py-2">
                    <p>
                      <b>Pattern</b>: {bug.appearance.name}
                    </p>
                    <p>
                      <b>Genes</b>:
                    </p>
                    <ul>
                      {bug.genes.map((gene) => (
                        <li>
                          &middot; {gene.name} -{" "}
                          {Math.round((gene.score / total) * 100)}%
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </BorderContainer>
            )
          })}
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-3xl">Items</h1>
      </div>
    </div>
  )
}
