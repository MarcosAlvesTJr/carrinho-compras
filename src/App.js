import React from 'react';
import ShoppingCart from './components/ShoppingCart'
import { ProductsProvider } from './hooks/products';


function App() {

  return (
    <ProductsProvider>
      <ShoppingCart />
    </ProductsProvider>
  );
}

export default App;
