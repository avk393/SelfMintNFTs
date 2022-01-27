require('dotenv').config();
const Web3 = require("web3");
const ManualNftMint = require('../build/contracts/ManualNftMint.json')
//import ManualNftMint from '../build/contracts/ManualNftMint.json'

const ManualNftMintAddress = "0xFc479b5B65A3a88121EEEF2691e7075fC648BBd1"
const recipientAddress = "0x2f4a0bCffDF508053603A07c4D033A9824C72547"
const gheelioAddress = "0x87750dB2A724c6Cfbe07A486ddd0122790bB72a6"
const chURI = "https://gateway.pinata.cloud/ipfs/Qmf91MvotZgb2MeNtQiRgjiDSCZ8hPLbDxxk1WWBfE1jqZ"
const brandinURI = "https://gateway.pinata.cloud/ipfs/QmZVg664NpSAFziRb5Xo4owf5mU4BpRwHwCicsMviQMYxu"

const privateKeys = process.env.PRIVATE_KEYS || ""
const publicKey = process.env.PUBLIC_KEYS

  
module.exports = async function(callback) {
    try {
        // Fetch the deployed token
        const privateKey = privateKeys.split(',')[0]
        const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/c0db89d71d424038bc96c4a04e390e9b'))
        const manualNftMint = await new web3.eth.Contract(ManualNftMint.abi, ManualNftMint.networks[4].address)

        // Mint the NFT

        //the transaction
        // const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
        // const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED"
        // const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

        const nonce = await web3.eth.getTransactionCount(publicKey, "latest") //get latest nonce
    
        //the transaction
        const tx = {
            from: publicKey,
            to: manualNftMint._address,
            nonce: nonce,
            gas: 500000,
            data: manualNftMint.methods.mintNFT(recipientAddress, chURI).encodeABI(),
        }

        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey)
        console.log(signedTx)
        
        await web3.eth.sendSignedTransaction(signedTx.rawTransaction, 
            function (err, hash) {
                if (!err) {
                    console.log("The hash of your transaction is: ", hash)
                } else {
                    console.log("Something went wrong when submitting your transaction:", err)
                }
            }
        )
        .catch((err) => {
            console.log("Promise failed:", err)
        })
    }
    catch(error) {
        console.log(error)
    }


    callback()
}