const toBytes32 = (str) => {
  const Web3 = require('web3').Web3;
  const web3 = new Web3();
  const hexWithout0x = web3.utils.utf8ToHex(str).slice(2);
  return '0x' + hexWithout0x.padEnd(64, '0');
};

// Add Seller
exports.addSeller = async (req, res) => {
  try {
    const { _manufacturerId, _sellerName, _sellerBrand, _sellerCode, _sellerNum, _sellerManager, _sellerAddress } = req.body;
    
    const web3 = req.web3;
    const contract = req.contract;
    
    if (!web3 || !contract) {
      return res.status(500).json({ error: 'Web3 or contract not initialized' });
    }

    const accounts = await web3.eth.getAccounts();
    if (!accounts || accounts.length === 0) {
      return res.status(500).json({ error: 'No accounts available' });
    }

    await contract.methods.addSeller(
      toBytes32(_manufacturerId),
      toBytes32(_sellerName),
      toBytes32(_sellerBrand),
      toBytes32(_sellerCode),
      _sellerNum,
      toBytes32(_sellerManager),
      toBytes32(_sellerAddress)
    ).send({ from: accounts[0], gas: 3000000, gasPrice: '2000000000' });
    res.json({ success: true, message: 'Seller added successfully' });
  } catch (err) {
    console.error('Add Seller Error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ FIXED - bytes32 conversion add kiya
exports.sellProduct = async (req, res) => {
  try {
    const { _productSN, _consumerCode } = req.body;
    
    const web3 = req.web3;
    const contract = req.contract;
    
    if (!web3 || !contract) {
      return res.status(500).json({ error: 'Web3 or contract not initialized' });
    }

    const accounts = await web3.eth.getAccounts();
    if (!accounts || accounts.length === 0) {
      return res.status(500).json({ error: 'No accounts available' });
    }

    const tx = await contract.methods.sellerSellProduct(
      toBytes32(_productSN),
      toBytes32(_consumerCode)
    ).send({ from: accounts[0], gas: 3000000, gasPrice: '2000000000' });

    res.json({ success: true, message: 'Product sold by seller', txHash: tx.transactionHash });
  } catch (err) {
    console.error('Sell Product Error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.querySellerProducts = async (req, res) => {
  try {
    const { sellerId } = req.params;
    
    const web3 = req.web3;
    const contract = req.contract;
    
    if (!web3 || !contract) {
      return res.status(500).json({ error: 'Web3 or contract not initialized' });
    }

    const products = await contract.methods
      .queryProductsList(toBytes32(sellerId)).call();
    res.json(products);
  } catch (err) {
    console.error('Query Seller Products Error:', err.message);
    res.status(500).json({ error: err.message });
  }
};