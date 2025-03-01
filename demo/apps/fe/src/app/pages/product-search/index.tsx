import { useState } from 'react';
import { motion } from 'framer-motion';
import { useProductBySkuLazyQuery } from './operations.generated';

export function ProductSearch() {
  const [sku, setSku] = useState('');
  const [searchedSku, setSearchedSku] = useState('');

  const [getProduct, { loading, error, data }] = useProductBySkuLazyQuery();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sku.trim()) return;

    setSearchedSku(sku.trim());
    getProduct({
      variables: { sku: sku.trim() },
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent mb-2">
          Product Search
        </h1>
        <p className="text-gray-400">
          Search for a product by its SKU to view detailed information
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gray-900/50 rounded-xl p-6 border border-white/10"
      >
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="flex-grow">
            <label
              htmlFor="sku"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Product SKU
            </label>
            <input
              type="text"
              id="sku"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="Enter product SKU"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={!sku.trim() || loading}
              className={`px-4 py-2 rounded-lg ${
                !sku.trim() || loading
                  ? 'bg-blue-500/50 text-blue-200 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              } transition-colors flex items-center gap-2`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
              Search
            </button>
          </div>
        </form>
      </motion.div>

      {loading && (
        <div className="text-gray-400 text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          Searching for product...
        </div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-red-400"
        >
          <h3 className="text-lg font-medium mb-2">Error</h3>
          <p>{error.message}</p>
        </motion.div>
      )}

      {!loading && !error && searchedSku && !data?.product && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 text-yellow-400"
        >
          <h3 className="text-lg font-medium mb-2">Product Not Found</h3>
          <p>
            No product found with SKU:{' '}
            <span className="font-mono">{searchedSku}</span>
          </p>
        </motion.div>
      )}

      {data?.product && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="group rounded-xl bg-gradient-to-b from-white/[0.07] to-transparent p-px"
        >
          <div className="rounded-xl bg-gray-950 p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {data.product.name}
                </h2>
                <p className="text-gray-400 mt-1">{data.product.description}</p>
              </div>
              <div className="flex items-center justify-center px-4 py-2 bg-blue-500/10 rounded-lg">
                <span className="text-blue-400 font-mono">
                  {data.product.sku}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-900 rounded-lg p-4">
                <h3 className="text-gray-400 text-sm mb-2">Price</h3>
                <p className="text-white text-xl font-semibold">
                  ${data.product.price.toFixed(2)}
                </p>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <h3 className="text-gray-400 text-sm mb-2">Marketplace</h3>
                <p className="text-white text-xl font-semibold">
                  {data.product.marketplace.name}
                </p>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <h3 className="text-gray-400 text-sm mb-2">Warranty</h3>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      data.product.metadata.hasWarranty
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  />
                  <p className="text-white">
                    {data.product.metadata.hasWarranty
                      ? 'Available'
                      : 'Not Available'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
