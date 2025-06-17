import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NotFound() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-[80vh] text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-6xl font-bold text-red-600 pixel-font">404</h1>
      <p className="text-xl mt-2 mb-6">Oops! Page not found.</p>
      <Link to="/" className="minecraft-btn bg-green-600 text-white px-4 py-2 rounded">
        🔙 Go Back Home
      </Link>
    </motion.div>
  );
}

export default NotFound;
