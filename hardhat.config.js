require('@nomiclabs/hardhat-waffle');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: '0.7.3'
};

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "Y5doVx4d1IdAkT-ESSE7oY-RBbRaGYFW";

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const ROPSTEN_PRIVATE_KEY = "361c4299b336d7c5714afae2ed9939d6254090620ca03206148a63ef00a48179";

module.exports = {
    solidity: "0.7.3",
    networks: {
        ropsten: {
            url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
            accounts: [`0x${ROPSTEN_PRIVATE_KEY}`],
        },
    },
};
