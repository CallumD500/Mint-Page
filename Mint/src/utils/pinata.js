import { default as axios } from 'axios';

const key = import.meta.env.VITE_PINATA_API_KEY
const secret = import.meta.env.VITE_PINATA_API_KEY_SECRET
const pinataUrl = import.meta.env.VITE_PINATA_URL

export const pinImage = async (body) => {
  try {
    const result = await axios.post(pinataUrl, body, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      }
    })
    console.log('PinResult', result)
    return {
        success: true,
        pinataUrl: "https://gateway.pinata.cloud/ipfs/" + result.data.IpfsHash
      }
    } catch (err) {
      return { success: false, message: err.message}
    }

}