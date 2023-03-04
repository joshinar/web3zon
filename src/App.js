import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import config from './config.json';
import abi from './abis/web3zon.json';
import './App.css';
import Products from './components/Products';

const App = () => {
  const [account, setAccount] = useState(null);
  const [products, setProducts] = useState(null);
  const [web3zon, setWeb3zon] = useState(null);
  const [provider, setProvider] = useState(null);
  window.ethereum.on('accountsChanged', (accounts) => setAccount(accounts[0]));

  const loadBlockChainData = async () => {
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    // provider.detectNetwork().then((x) => console.log(x));
    setProvider(provider);
    const network = await provider.getNetwork();

    const web3zon = await new ethers.Contract(
      config[network.chainId].address,
      abi,
      provider
    );
    setWeb3zon(web3zon);
    let products = [];
    for (let i = 1; i <= 9; i++) {
      products.push(await web3zon.items(i));
    }
    setProducts(products);
  };

  useEffect(() => {
    loadBlockChainData();
  }, []);
  return (
    <div>
      <Navbar account={account} setAccount={setAccount} />
      <Products products={products} web3zon={web3zon} provider={provider} />
    </div>
  );
};

export default App;
