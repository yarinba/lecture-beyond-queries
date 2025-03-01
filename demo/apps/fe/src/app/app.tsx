import { ApolloProvider } from '@apollo/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import { client } from './apollo-client';
import { Products } from './pages/products';
import { Marketplaces } from './pages/marketplaces';
import { Home } from './pages/home';
import { ProductSearch } from './pages/product-search';

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative px-4 py-2 text-sm transition-colors duration-200 ${
        isActive ? 'text-white' : 'text-gray-400 hover:text-gray-100'
      }`}
    >
      {children}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-blue-500/0 via-blue-500/70 to-blue-500/0" />
      )}
    </Link>
  );
}

export function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-950 text-white">
          <nav className="border-b border-white/10 backdrop-blur-sm bg-gray-950/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center space-x-8">
                  <Link to="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
                    <span className="text-lg font-semibold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                      Inventory OS
                    </span>
                  </Link>
                  <div className="flex space-x-1">
                    <NavLink to="/products">Products</NavLink>
                    <NavLink to="/marketplaces">Marketplaces</NavLink>
                    <NavLink to="/product-search">Product Search</NavLink>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="px-4 py-1.5 text-sm text-white/80 hover:text-white transition-colors duration-200">
                    Documentation
                  </button>
                  <button className="px-4 py-1.5 text-sm bg-white/5 hover:bg-white/10 transition-colors duration-200 rounded-full">
                    Feedback
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/marketplaces" element={<Marketplaces />} />
              <Route path="/product-search" element={<ProductSearch />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
