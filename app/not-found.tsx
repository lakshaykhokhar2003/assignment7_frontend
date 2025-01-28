"use client"

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-white text-gray-800">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-9xl font-bold text-gray-800"
            >
                404
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-4 text-2xl font-medium text-gray-600"
            >
                Oops! Page not found.
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-6"
            >
                <Link
                    href="/"
                    className="rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition-transform hover:scale-105 hover:bg-blue-700"
                >
                    Go Back Home
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;
