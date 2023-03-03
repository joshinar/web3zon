const { expect } = require('chai');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

describe('Web3Zon', async () => {
  async function loadContractFixture() {
    const Contract = await ethers.getContractFactory('Web3Zon');
    const web3zon = await Contract.deploy();
    const [deployer, buyer] = await ethers.getSigners();
    return { web3zon, deployer, buyer };
  }

  it('Sets the owner', async () => {
    const { web3zon, deployer } = await loadFixture(loadContractFixture);
    expect(await web3zon.owner()).to.equal(deployer.address);
  });

  describe('Listings', () => {
    it('Adds an item to items mapping', async () => {
      const { web3zon, deployer, buyer } = await loadFixture(
        loadContractFixture
      );
      await web3zon
        .connect(deployer)
        .list(1, 'Shoes', 'Clothing', 'Image', 100, 4, 50);
      const item = await web3zon.items(1);
      await web3zon.connect(buyer).buy(1, { value: 100 });
      const contractBal = await ethers.provider.getBalance(web3zon.address);
      expect(item.id).to.equal(1);
      expect(contractBal).to.equal(100);
    });
    it('Emits a event', async () => {
      const { web3zon } = await loadFixture(loadContractFixture);
      const transaction = await web3zon.list(
        2,
        'Shoes',
        'Clothing',
        'Image',
        100,
        4,
        50
      );
      await transaction.wait();
      expect(transaction).to.emit(web3zon, 'List');
    });
  });
});
