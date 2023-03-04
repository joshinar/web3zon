import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
const Product = ({ product, web3zon, provider }) => {
  const [hasBought, setHasBought] = useState(false);
  const [order, setOrder] = useState(null);
  const buyItem = async () => {
    const signer = await provider.getSigner();
    const transaction = await web3zon
      .connect(signer)
      .buy(product.id, { value: product.cost });
    await transaction.wait();
    setHasBought(true);
  };

  const fetchDetails = async () => {
    const signer = await provider.getSigner();
    const events = await web3zon.queryFilter('Buy');
    const account = await signer.getAddress();
    const orders = events.filter(
      (event) =>
        event.args.buyer === account &&
        event.args.itemId.toString() === product.id.toString()
    );
    
    if (orders.length === 0) return;
    const order = await web3zon.orders(account, orders[0].args.orderId);
    console.log(order);
    setOrder(order);
  };

  useEffect(() => {
    if (hasBought) {
      fetchDetails();
    }
  }, [hasBought]);
  return (
    <div style={{ margin: '5px auto 10px auto', textAlign: 'center' }}>
      <img src={product.image} style={{ maxWidth: 200 }} />
      <p style={{ fontSize: '1.2rem', fontWeight: '400' }}>{product.name}</p>
      <p>
        Price: <strong>{ethers.utils.formatUnits(product.cost)} ETH</strong>
      </p>
      {order ? (
        'Item Already bought'
      ) : (
        <button
          style={{
            border: 'none',
            padding: '10px',
            margin: '5px',
            minWidth: '10%',
            borderRadius: '10px',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            cursor: 'pointer',
            background: '#f3ca18',
          }}
          onClick={() => buyItem()}
        >
          Buy Now
        </button>
      )}
    </div>
  );
};

export default Product;
