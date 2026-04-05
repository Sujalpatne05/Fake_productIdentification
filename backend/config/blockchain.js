let Web3 = require('web3');
if (Web3.default) Web3 = Web3.default;
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Ganache ya Infura ka URL yahan set karein
envProvider = process.env.BLOCKCHAIN_PROVIDER || 'http://127.0.0.1:7545';
const web3 = new Web3(envProvider);

// Contract ABI aur address load karo
const abiPath = path.join(__dirname, '../../build/contracts/product.json');
let contractABI = [];
try {
  contractABI = JSON.parse(fs.readFileSync(abiPath, 'utf8')).abi;
} catch (e) {
  console.error('Error loading ABI:', e.message);
}

// Use the latest deployed address
let contractAddress = process.env.CONTRACT_ADDRESS || '0xAf2C6787b57AEb733864AFF1E8518c718Ded8344';

console.log('Using contract address:', contractAddress);
console.log('ABI loaded:', contractABI.length > 0);

let contractInstance;
try {
  contractInstance = new web3.eth.Contract(contractABI, contractAddress);
  console.log('Contract instance created successfully');
} catch (e) {
  console.error('Error creating contract instance:', e.message);
  // Create a dummy instance to prevent crash
  contractInstance = {};
}

module.exports = {
  web3,
  contractInstance
};
