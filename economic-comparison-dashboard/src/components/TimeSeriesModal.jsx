'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TimeSeriesModal({ show, onClose, selected }) {
  if (!selected) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center backdrop-blur-sm"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-2xl relative">
            <button
              onClick={onClose}
              className="absolute top-2 right-3 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-2">
              📊 {selected.Category} - {selected.Country}
            </h2>
            <p className="text-sm text-gray-700">Chart for {selected.Category} would go here.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
