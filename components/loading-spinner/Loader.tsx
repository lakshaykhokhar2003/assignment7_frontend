"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

const Loader: React.FC = () => {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        const interval = setInterval(() => {
            setPercentage((prev) => (prev < 100 ? prev + 1 : 100));
        }, 30);

        return () => {
            clearInterval(interval);
            document.body.style.overflow = "auto";
        };
    }, []);

    const loadingRoot = document.getElementById("loading-root");

    if (!loadingRoot) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-white">
            <motion.div
                className="text-9xl font-bold text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {percentage}%
            </motion.div>
        </div>,
        loadingRoot
    );
};

export default Loader;