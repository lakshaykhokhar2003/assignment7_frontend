import React from 'react';
import {ModalProps} from "@/types";
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

const Modal: React.FC<ModalProps> = ({  onClose,children }) => {

    const modalAnimation = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
        exit: { opacity: 0, y: 100, transition: { duration: 0.25 } },
    };

    return createPortal(
        <>
            <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
                <motion.div
                    className="rounded-lg p-6 w-full flex items-center justify-center max-w-md"
                    variants={modalAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </motion.div>
            </div>
        </>,
        document.getElementById('modal-root') as HTMLElement
    );
};

export default Modal;
