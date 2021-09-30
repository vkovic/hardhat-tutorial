const {expect} = require('chai');

describe('Token contract', function () {
    it('Deployment should assign the total supply of tokens to the owner', async function () {
        const [owner] = await ethers.getSigners();

        const Token = await ethers.getContractFactory('Token');
        const hardhatToken = await Token.deploy();
        const ownerBalance = await hardhatToken.balanceOf(owner.address);

        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
});

describe('Token transfer', function () {
    it('Transfer is possible from owner to another address', async function () {
        const [owner, addr1, addr2] = await ethers.getSigners();

        const Token = await ethers.getContractFactory('Token');
        const hardhatToken = await Token.deploy();
        const ownerBalance = await hardhatToken.balanceOf(owner.address);

        hardhatToken.transfer(addr1.address, 50);
        hardhatToken.transfer(addr2.address, 100);

        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);
        expect(await hardhatToken.balanceOf(addr2.address)).to.equal(100);
        expect(await hardhatToken.balanceOf(owner.address)).to.equal(1000 - 50 -100);
    });
});
