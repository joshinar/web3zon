const hre = require('hardhat');
const { items } = require('../src/items.json');
const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
};
async function main() {
  const [deployer] = await ethers.getSigners();
  const Contract = await hre.ethers.getContractFactory('Web3Zon');
  const web3zon = await Contract.deploy();
  await web3zon.deployed();
  console.log(`Deployed Dappazon Contract at: ${web3zon.address}\n`);
  for (let i = 0; i < items.length; i++) {
    const item = await web3zon.list(
      items[i].id,
      items[i].name,
      items[i].category,
      items[i].image,
      tokens(items[i].price),
      items[i].rating,
      items[i].stock
    );
    await item.wait();
    console.log('Listed Item:', items[i].name);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
