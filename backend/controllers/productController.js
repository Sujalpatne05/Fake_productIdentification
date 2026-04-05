const toBytes32 = (str) => {
  const Web3 = require('web3').Web3;
  const web3 = new Web3();
  const hexWithout0x = web3.utils.utf8ToHex(str).slice(2);
  return '0x' + hexWithout0x.padEnd(64, '0');
};

// Validation schema for addProduct
const addProductSchema = require('joi').object({
  _manufacturerID: require('joi').string().required(),
  _productName: require('joi').string().required(),
  _productSN: require('joi').string().required(),
  _productBrand: require('joi').string().required(),
  _productPrice: require('joi').number().required()
});

// Product Controller

exports.addProduct = async (req, res) => {
  try {
    const { error } = addProductSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { _manufacturerID, _productName, _productSN, _productBrand, _productPrice } = req.body;
    
    // Get web3 and contract from request
    const web3 = req.web3;
    const contract = req.contract;
    
    if (!web3 || !contract) {
      return res.status(500).json({ error: 'Web3 or contract not initialized' });
    }

    const accounts = await web3.eth.getAccounts();
    if (!accounts || accounts.length === 0) {
      return res.status(500).json({ error: 'No accounts available' });
    }

    console.log('Adding product with account:', accounts[0]);
    
    const tx = await contract.methods.addProduct(
      toBytes32(_manufacturerID),
      toBytes32(_productName),
      toBytes32(_productSN),
      toBytes32(_productBrand),
      _productPrice
    ).send({ from: accounts[0], gas: 3000000, gasPrice: '2000000000' });
    
    console.log('Product added successfully, tx:', tx.transactionHash);
    res.json({ success: true, message: 'Product added successfully', txHash: tx.transactionHash });
  } catch (err) {
    console.error('Add Product Error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.verifyProduct = async (req, res) => {
  try {
    const { serial } = req.params;
    const { consumerCode } = req.query;

    if (!serial || !consumerCode) {
      return res.status(400).json({ 
        error: 'Serial number and consumer code required',
        received: { serial, consumerCode }
      });
    }

    const web3 = req.web3;
    const contract = req.contract;
    
    if (!web3 || !contract) {
      return res.status(500).json({ error: 'Web3 or contract not initialized' });
    }

    const serialBytes32 = toBytes32(serial);
    const consumerCodeBytes32 = toBytes32(consumerCode);
    
    const result = await contract.methods
      .verifyProduct(serialBytes32, consumerCodeBytes32)
      .call();
      
    res.json({ verified: result });
  } catch (err) {
    console.error('Verify Product Error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getPurchaseHistory = async (req, res) => {
  try {
    const { consumerId } = req.params;
    
    const web3 = req.web3;
    const contract = req.contract;
    
    if (!web3 || !contract) {
      return res.status(500).json({ error: 'Web3 or contract not initialized' });
    }

    const history = await contract.methods.getPurchaseHistory(toBytes32(consumerId)).call();
    res.json(history);
  } catch (err) {
    console.error('Get Purchase History Error:', err.message);
    res.status(500).json({ error: err.message });
  }
};