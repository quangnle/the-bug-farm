import { motion } from "framer-motion";
import { HTMLAttributes, FC } from "react";
import Backdrop from "./backdrop";
import { createPortal } from "react-dom";
import "./style.css";
import clsx from "clsx";

interface IProp extends HTMLAttributes<HTMLDivElement> {
  handleClose?: () => void;
}

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal: FC<IProp> = ({ children, className, handleClose }) => {
  return createPortal(
    <Backdrop onClick={() => handleClose && handleClose()}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={clsx("modal", className)}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </Backdrop>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
