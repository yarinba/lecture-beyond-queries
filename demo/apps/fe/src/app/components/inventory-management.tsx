import { useState } from 'react';
import { ProductList } from './product-list';
import { ProductForm } from './product-form';
import { MarketplaceSelect } from './marketplace-select';

export function InventoryManagement() {
  const [selectedMarketplace, setSelectedMarketplace] = useState<string>('');
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <MarketplaceSelect
          value={selectedMarketplace}
          onChange={setSelectedMarketplace}
        />
        <button
          onClick={() => setIsAddingProduct(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </button>
      </div>

      {isAddingProduct && (
        <ProductForm
          marketplaceId={selectedMarketplace}
          onClose={() => setIsAddingProduct(false)}
        />
      )}

      <ProductList marketplaceId={selectedMarketplace} />
    </div>
  );
}
