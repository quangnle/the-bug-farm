import { motion } from "framer-motion"
import { ReactNode } from "react"

export default function Backdrop ({ children, onClick } : {
  children: ReactNode | ReactNode[],
  onClick: () => void
}) {
 
  return (
    <motion.div
      onClick={onClick}
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};