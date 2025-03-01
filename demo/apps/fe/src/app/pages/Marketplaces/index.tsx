import { useState } from 'react';
import { motion } from 'framer-motion';

import {
  MarketplacesPageDocument,
  useCreateMarketplaceMutation,
  useMarketplacesPageQuery,
  useRemoveMarketplaceMutation,
} from './operations.generated';

export function Marketplaces() {
  const [newMarketplaceName, setNewMarketplaceName] = useState('');

  const { loading, error, data } = useMarketplacesPageQuery();

  const [createMarketplace] = useCreateMarketplaceMutation({
    refetchQueries: [{ query: MarketplacesPageDocument }],
  });

  const [removeMarketplace] = useRemoveMarketplaceMutation({
    refetchQueries: [{ query: MarketplacesPageDocument }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMarketplaceName.trim()) return;

    try {
      await createMarketplace({
        variables: { name: newMarketplaceName.trim() },
      });
      setNewMarketplaceName('');
    } catch (error) {
      console.error('Error creating marketplace:', error);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent mb-2">
          Marketplaces
        </h1>
        <p className="text-gray-400">
          Connect and manage your marketplace integrations
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-xl bg-gradient-to-b from-white/[0.07] to-transparent p-px"
      >
        <div className="rounded-xl bg-gray-950 p-6">
          <h2 className="text-lg font-medium text-white mb-4">
            Add New Marketplace
          </h2>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={newMarketplaceName}
              onChange={(e) => setNewMarketplaceName(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter marketplace name"
            />
            <button
              type="submit"
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
              Add
            </button>
          </form>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-xl bg-gradient-to-b from-white/[0.07] to-transparent p-px"
      >
        <div className="rounded-xl bg-gray-950 p-6">
          <h2 className="text-lg font-medium text-white mb-4">
            Connected Marketplaces
          </h2>
          {loading && (
            <div className="text-gray-400 text-center py-8">Loading...</div>
          )}
          {error && (
            <div className="text-red-400 text-center py-8">
              Error: {error.message}
            </div>
          )}
          <div className="space-y-4">
            {data?.marketplaces.map((marketplace: any) => (
              <motion.div
                key={marketplace._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 group hover:bg-white/[0.07] transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-purple-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z"
                      />
                    </svg>
                  </div>
                  <span className="text-white group-hover:text-blue-400 transition-colors duration-200">
                    {marketplace.name}
                  </span>
                </div>
                <button
                  onClick={() =>
                    removeMarketplace({
                      variables: { id: marketplace._id },
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
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
