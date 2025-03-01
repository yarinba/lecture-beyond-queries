import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  ProductsDocument,
  useProductsQuery,
  useDeleteProductMutation,
  useUpdateProductNameMutation,
} from './operations.generated';
import { addToCart, removeFromCart } from './cart-utils';

export function ProductList() {
  const { loading, error, data } = useProductsQuery();
  const [deleteProduct] = useDeleteProductMutation({
    refetchQueries: [{ query: ProductsDocument }],
  });
  const [updateProductName] = useUpdateProductNameMutation();

  const [editingProduct, setEditingProduct] = useState<{
    sku: string;
    name: string;
  } | null>(null);
  const [newName, setNewName] = useState('');

  const handleEditClick = (sku: string, name: string) => {
    setEditingProduct({ sku, name });
    setNewName(name);
  };

  const handleSave = async () => {
    if (editingProduct && newName.trim() !== '') {
      try {
        await updateProductName({
          variables: {
            sku: editingProduct.sku,
            name: newName.trim(),
          },
        });
        setEditingProduct(null);
      } catch (error) {
        console.error('Error updating product name:', error);
      }
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  if (loading) {
    return (
      <div className="text-gray-400 text-center py-12">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center py-12">
        Error: {error.message}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.products.map((product, index) => {
          return (
            <motion.div
              key={product.sku}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-xl bg-gradient-to-b from-white/[0.07] to-transparent p-px h-full"
            >
              <div className="rounded-xl bg-gray-950 p-6 h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      <span className="font-bold">Description:</span>{' '}
                      {product.description}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditClick(product.sku, product.name)}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                      aria-label="Edit product"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        deleteProduct({
                          variables: { sku: product.sku },
                          update: (cache) => {
                            cache.evict({ id: cache.identify(product) });
                          },
                        })
                      }
                      className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                      aria-label="Delete product"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">SKU</span>
                    <span className="text-white font-mono">{product.sku}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Price</span>
                    <span className="text-white">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Marketplace</span>
                    <span className="text-white">
                      {product.marketplace.name}
                    </span>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        product.metadata.hasWarranty
                          ? 'bg-green-500'
                          : 'bg-gray-500'
                      }`}
                    />
                    <span className="text-sm text-gray-400">
                      {product.metadata.hasWarranty
                        ? 'Warranty Available'
                        : 'No Warranty'}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.metadata.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Add to Cart Button */}
                  {product.isInCart ? (
                    <button
                      onClick={() => removeFromCart(product.sku)}
                      className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 flex items-center justify-center"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Remove from Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 flex items-center justify-center"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
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
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              Edit Product Name
            </h2>
            <div className="mb-4">
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
