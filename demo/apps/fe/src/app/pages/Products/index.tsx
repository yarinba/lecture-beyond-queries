import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProductList } from '../../components/product-list';
import { ProductForm } from '../../components/product-form';

export function Products() {
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Products
          </h1>
          <p className="text-gray-400 mt-2">
            Manage and track your product inventory across all marketplaces
          </p>
        </div>
        <button
          onClick={() => setIsAddingProduct(true)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Product
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <ProductList />
      </motion.div>

      {isAddingProduct && (
        <ProductForm onClose={() => setIsAddingProduct(false)} />
      )}
    </div>
  );
}
