import { useQuery, gql, useMutation } from '@apollo/client';
import { motion } from 'framer-motion';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      sku
      name
      price
      description
      metadata {
        hasWarranty
        tags
      }
      marketplace {
        _id
        name
      }
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($sku: String!) {
    deleteProduct(sku: $sku)
  }
`;

export function ProductList() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.products.map((product: any, index: number) => (
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
                <p className="text-sm text-gray-400">{product.description}</p>
              </div>
              <button
                onClick={() =>
                  deleteProduct({
                    variables: { sku: product.sku },
                  })
                }
                className="text-gray-400 hover:text-red-400 transition-colors duration-200"
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

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">SKU</span>
                <span className="text-white font-mono">{product.sku}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Price</span>
                <span className="text-white">${product.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Marketplace</span>
                <span className="text-white">{product.marketplace.name}</span>
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

              <div className="flex flex-wrap gap-2">
                {product.metadata.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
