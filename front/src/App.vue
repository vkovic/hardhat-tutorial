<template>

  <h1>BALANCE {{ balance }}</h1>

  <button @click="connectWallet">TEST</button>

</template>

<script>

// We'll use ethers to interact with the Ethereum network and our contract
import { ethers } from 'ethers';

// We import the contract's artifacts and address here, as we are going to be
// using them with ethers
import TokenArtifact from './contracts/Token.json';
import contractAddress from './contracts/contract-address.json';


export default {
  name: 'App',
  data() {
    return {
      provider: undefined,
      tokenContract: undefined,
      //
      tokenData: undefined,
      // The user's address and balance
      selectedAddress: undefined,
      balance: 0,
      // The ID about transactions being sent, and any possible error with them
      txBeingSent: undefined,
      transactionError: undefined,
      networkError: undefined
    };
  },
  created() {
    // `this` points to the vm instance
    // console.log('count is: ' + this.count); // => "count is: 1"

  },
  methods: {
    async connectWallet() {
      // This method is run when the user clicks the Connect. It connects the
      // dapp to the user's wallet, and initializes it.

      // To connect to the user's wallet, we have to run this method.
      // It returns a promise that will resolve to the user's address.
      const [selectedAddress] = await window.ethereum.enable();

      console.log('selected address', selectedAddress);

      // Once we have the address, we can initialize the application.

      // First we check the network
      if (window.ethereum.networkVersion !== '31337') {
        console.log('Net err');
        return;
      }

      this.initialize(selectedAddress);

      // TODO
      // We reinitialize it whenever the user changes their account.
      // window.ethereum.on('accountsChanged', ([newAddress]) => {
      //   this._stopPollingData();
      //   // `accountsChanged` event can be triggered with an undefined newAddress.
      //   // This happens when the user removes the Dapp from the "Connected
      //   // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
      //   // To avoid errors, we reset the dapp state
      //   if (newAddress === undefined) {
      //     return this._resetState();
      //   }
      //
      //   this.initialize(newAddress);
      // });

      // TODO
      // We reset the dapp state if the network is changed
      // window.ethereum.on("networkChanged", ([networkId]) => {
      //   this._stopPollingData();
      //   this._resetState();
      // });
    },

    initialize(userAddress) {
      // This method initializes the dapp

      // We first store the user's address in the component's state
      this.selectedAddress = userAddress;

      // Then, we initialize ethers, fetch the token's data, and start polling
      // for the user's balance.

      // Fetching the token data and the user's balance are specific to this
      // sample project, but you can reuse the same initialization pattern.
      this.intializeEthers();
      this.fetchTokenData();
      this.startPollingData();
    },

    async intializeEthers() {
      // We first initialize ethers by creating a provider using window.ethereum
      this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');

      // When, we initialize the contract using that provider and the token's
      // artifact. You can do this same thing with your contracts.
      this.tokenContract = new ethers.Contract(
          contractAddress.Token,
          TokenArtifact.abi,
          this.provider.getSigner(0)
      );
    },

    async fetchTokenData() {
      const name = await this.tokenContract.name();
      const symbol = await this.tokenContract.symbol();

      this.tokenContractData = {name, symbol};

      console.log(this.tokenContractData);
    },

    // The next two methods are needed to start and stop polling data. While
    // the data being polled here is specific to this example, you can use this
    // pattern to read any data from your contracts.
    //
    // Note that if you don't need it to update in near real time, you probably
    // don't need to poll it. If that's the case, you can just fetch it when you
    // initialize the app, as we do with the token data.
    startPollingData() {
      this.pollDataInterval = setInterval(() => this.updateBalance(), 1000);

      // We run it once immediately so we don't have to wait for it
      this._updateBalance();
    },

    async updateBalance() {
      this.balance = await this.tokenContract.balanceOf(this.selectedAddress);
    }
  }
};

</script>
