import { FC } from "preact/compat";
import Modal from "../common/modal";
import { useEffect, useState } from "react";
import Bug from "@/core/entity/bug";

interface IProp {
  bugs: Bug[];
  handleClose?: () => void;
}

const FilterGeneModal: FC<IProp> = ({ handleClose, bugs }) => {
  const [genes, setGenes] = useState<Set<IAppearance> | undefined>();

  useEffect(() => {
    handleFilterGenes(bugs);
  }, [bugs]);

  const handleFilterGenes = (bugs: Bug[]) => {
    let bugGenes = new Set<IAppearance>();
    bugs.map((bug) => bug.genes.map((gene) => bugGenes.add(gene)));
    setGenes(bugGenes);
  };

  const handleRenderGenes = () => {
    if (genes) {
      for (const value of genes) {
        return <p key={value._id}>{value.name}</p>;
      }
    }
  };
  return (
    <Modal handleClose={handleClose}>
      <div className="bg-white">
        {handleRenderGenes() || <p>No bugs found!</p>}
      </div>
    </Modal>
  );
};

export default FilterGeneModal;
