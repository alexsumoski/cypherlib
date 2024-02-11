import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed h-[100vh] inset-0 bg-black shad bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-black p-6 rounded-lg"
            onClick={(e) => e.stopPropagation()}
            style={{
              margin: "auto",
              maxWidth: "500px",
              width: "90%",
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.7)",
              borderColor: "#555",
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
