import React, { createContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Export the context for useModal()
export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => setModalContent(content);
  const closeModal = () => setModalContent(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {/* ✅ Global Animated Modal */}
      <AnimatePresence>
        {modalContent && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal} // click outside closes modal
          >
            <motion.div
              key="modal"
              className="bg-white rounded-2xl shadow-lg relative max-w-full w-auto p-4 md:p-6"
              style={{ width: "auto", maxWidth: "90%", minWidth: "300px" }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
              {modalContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}
