import { useState } from 'react';
import { motion } from 'framer-motion';
import { MarketplaceSelect } from './marketplace-select';
import { useCreateProductMutation } from './operations.generated';
import { ProductFieldsFragmentDoc } from './fragments.generated';

interface ProductFormProps {
  onClose: () => void;
}

export function ProductForm({ onClose }: ProductFormProps) {
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    price: '',
    description: '',
    marketplaceId: '',
    hasWarranty: false,
    tags: '',
  });

  const [createProduct, { loading }] = useCreateProductMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const input = {
      ...formData,
      price: parseFloat(formData.price),
      tags: formData.tags.split(',').map((tag) => tag.trim()),
    };

    try {
      createProduct({
        variables: input,
        optimisticResponse: {
          createProduct: {
            __typename: 'Product',
            sku: input.sku,
            name: input.name,
            price: input.price,
            description: input.description,
            marketplace: {
              __typename: 'Marketplace',
              _id: input.marketplaceId,
              name: 'APAC',
            },
            metadata: {
              __typename: 'ProductMetadata',
              hasWarranty: input.hasWarranty,
              tags: input.tags,
            },
          },
        },
        update: (cache, { data }) => {
          if (!data) return;

          const newProduct = cache.writeFragment({
            id: cache.identify(data.createProduct),
            fragment: ProductFieldsFragmentDoc,
            data: data.createProduct,
          });

          cache.modify({
            fields: {
              products: (existingProducts) => [...existingProducts, newProduct],
            },
          });
        },
      });
      onClose();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-950 rounded-xl w-full max-w-2xl border border-white/10"
      >
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              Add New Product
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
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
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  SKU
                </label>
                <input
                  type="text"
                  required
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Marketplace
              </label>
              <MarketplaceSelect
                value={formData.marketplaceId}
                onChange={(value) =>
                  setFormData({ ...formData, marketplaceId: value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Price
              </label>
              <input
                type="number"
                required
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., electronics, new, featured"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.hasWarranty}
                onChange={(e) =>
                  setFormData({ ...formData, hasWarranty: e.target.checked })
                }
                className="w-4 h-4 bg-white/5 border-white/10 rounded text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-950"
              />
              <label className="ml-2 text-sm text-gray-400">Has Warranty</label>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Creating...
                  </>
                ) : (
                  'Create Product'
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
