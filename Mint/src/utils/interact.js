import { ref, reactive, toRefs } from 'vue'
import { pinImage } from './pinata.js'
import { Network, Alchemy } from "alchemy-sdk"
import contractABI from '../ABI.json'
import { ethers } from 'ethers'

const alchemyKey = import.meta.env.VITE_ALCHEMY_API
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE";

const settings = {
  apiKey: alchemyKey, // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with your network.
};

const alchemy = new Alchemy(settings)
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

export const mintNFT = async (url, name, description) => {
  if (url.trim() == "" || (name.trim() == "" || description.trim() == "")) {
    return {
     success: false,
     status: "Please make sure all fields are completed before minting.",
    }
   }

   const _metadata = new Object
   _metadata.url = url
   _metadata.name = name
   _metadata.description = description

   const metadata = JSON.stringify(_metadata)

   console.log('Metadata', metadata)

   const response = await pinImage(metadata)

   if (!response.success) {
    return {
        success: false,
        status: "Something went wrong while uploading your tokenURI.",
      }
    }
    const tokenURI = response.pinataUrl
    window.contract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log('METHODS', window.contract)

    const func = window.contract.mintNFT(window.ethereum.selectedAddress, tokenURI)
    let iface = new ethers.utils.Interface(contractABI);

    const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      'data': window.contract.mintNFT(window.ethereum.selectedAddress, tokenURI).encodeABI() //make call to NFT smart contract 
  };
  console.log('TXPARAMS', transactionParameters)
  try {
      const txHash = await window.ethereum
          .request({
              method: 'eth_sendTransaction',
              params: [transactionParameters],
          });
      return {
          success: true,
          status: "Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash
      }
  } catch (error) {
      return {
          success: false,
          status: "Something went wrong: " + error.message
      }
  }
}

export function useConnectWallet() {

  const addressArray = ref(null)
  const state = reactive({
    address: '',
    status: ''
  })
  const connected = ref(false)

  const startConnection = async () => {
    if (window.ethereum) {
      try {
        addressArray.value = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
          state.address = addressArray.value[0],
          state.status = 'Connected to Diamond Minting'
      } catch (e) {
        return {
          error: e.message
        }
      } finally {
        if (addressArray.value) {
        connected.value = true
        }
      }
    }
  }
  const getCurrentWallet = async () => {
    if (window.ethereum) {
      try {
        addressArray.value = await window.ethereum.request({
          method: 'eth_accounts',
        });
        if (addressArray.value.length > 0) {
            state.address = addressArray.value[0]
            state.status = 'Wallet changed successfully'
            connected.value = true
        } else {
            state.address = ''
            state.status = 'Unable to connect to wallet'
            connected.value = false
        }
      } catch (e) {
        console.log('Error', e)
      }
    }
  }

  const disconnect = () => {
    connected.value = false
    state.address = ''
    state.status = 'Disconnected'
    addressArray.value = null
  }

  return {
    addressArray,
    ...toRefs(state),
    startConnection, 
    getCurrentWallet, 
    disconnect, 
    connected 
  }
}