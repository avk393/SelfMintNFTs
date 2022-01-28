# SelfMintNFTs

This project helps you mint your own NFTs without paying additional fees on platforms like OpenSea. There are a few basic steps needed to get these scripts ready 
to mint your own NFT. 

1. Have npm and truffle framework installed
2. Configure the truffle-config.js file to include the network you would like to deploy to.
3. Deploy your contracts to your desired network with: truffle migrate [--reset] --network [desired network]
4. Now you will use mint-nft.js to interact with your minting contract now deployed
5. Either find the address of your deployed nft minting contract or replace the 4 in 
   "const manualNftMint = await new web3.eth.Contract(ManualNftMint.abi, ManualNftMint.networks[4].address)" with your desired network ID
6. You will want to create a .env file and add your private key, public key, and API key of whichever web3 API provider you're using. I use Infura, bet 
   there are plenty of other services that work just as well or better. Replace the http address in line 20 with your web3 API provider's address.
7. Create an account on Pinata if you don't already have one and upload NFT along with your metadata file. Here is an example of a metadata file that
   will link back to your NFT picture in the "image" field. https://gateway.pinata.cloud/ipfs/Qmf91MvotZgb2MeNtQiRgjiDSCZ8hPLbDxxk1WWBfE1jqZ.
8. Now replace the recipientAddress and the URI variable in line 38 with your intended destination address and NFT metadata URL from Pinata.
9. Run "truffle exec scripts/mint-nft.js --network [desired network] and watch your NFT get minted!

For more detailed steps of how to setup a Pinata account, Infura API key, and truffle framework, please reference: https://medium.com/gft-engineering/creating-your-own-nft-from-scratch-and-listing-it-on-opensea-8ac296cf1019. 
