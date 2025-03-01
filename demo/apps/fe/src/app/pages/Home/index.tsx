import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Home() {
  return (
    <div className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Welcome to Inventory OS
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          The modern platform for managing your multi-marketplace inventory with
          ease and precision.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Link to="/products">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="group rounded-xl bg-gradient-to-b from-white/[0.07] to-transparent p-px"
          >
            <div className="rounded-xl bg-gray-950 p-8 h-full">
              <div className="mb-4 rounded-lg bg-blue-500/10 w-12 h-12 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-500 transition-colors">
                Products
              </h3>
              <p className="text-gray-400">
                Manage your product inventory across different marketplaces with
                real-time updates and analytics.
              </p>
            </div>
          </motion.div>
        </Link>

        <Link to="/marketplaces">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="group rounded-xl bg-gradient-to-b from-white/[0.07] to-transparent p-px"
          >
            <div className="rounded-xl bg-gray-950 p-8 h-full">
              <div className="mb-4 rounded-lg bg-purple-500/10 w-12 h-12 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-500 transition-colors">
                Marketplaces
              </h3>
              <p className="text-gray-400">
                Connect and manage multiple marketplaces from a single, unified
                dashboard.
              </p>
            </div>
          </motion.div>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-16 text-center"
      >
        <div className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-gray-400">
            System Status: All systems operational
          </span>
        </div>
      </motion.div>
    </div>
  );
}
