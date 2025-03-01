import { cartItemsVar, CartItem } from '../apollo-client';
import { Product } from '@demo/types';

export const addToCart = (product: Product) => {
  const currentCart = cartItemsVar();

  const newItem: CartItem = {
    sku: product.sku,
    name: product.name,
    price: product.price,
    quantity: 1,
  };
  cartItemsVar([...currentCart, newItem]);
};

export const removeFromCart = (sku: string) => {
  const currentCart = cartItemsVar();
  const updatedCart = currentCart.filter((item) => item.sku !== sku);
  cartItemsVar(updatedCart);
};
