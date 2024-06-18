import { motion } from "framer-motion"
import { ReactNode } from "react"
import Backdrop from "./backdrop";
import { createPortal } from "react-dom";

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
  

const Modal = ({ children, handleClose = () => {} }: { children?: ReactNode | ReactNode[], handleClose?: () => void }) => {
  return createPortal(
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </Backdrop>,
     document.getElementById("modal-root") as HTMLElement
  )
}

  
  export default Modal;