import React from 'react';
import Product from './Product';
const Products = ({ products,web3zon,provider }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', padding:'10px' }}>
      {products &&
        products.length > 0 &&
        products.map((product) => <Product product={product} web3zon={web3zon} provider={provider} />)}
    </div>
  );
};

export default Products;
