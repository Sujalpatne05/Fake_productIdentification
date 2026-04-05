const toBytes32 = (str) => {
  const Web3 = require('web3').Web3;
  const web3 = new Web3();
  const hexWithout0x = web3.utils.utf8ToHex(str).slice(2);
  return '0x' + hexWithout0x.padEnd(64, '0');
};

// Manufacturer Controller

exports.registerManufacturer = async (req, res) => {
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
    res.json({ success: true, message: 'Seller registered successfully' });
  } catch (err) {
    console.error('Register Manufacturer Error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.transferToSeller = async (req, res) => {
  try {
    const { _productSN, _sellerCode } = req.body;
    
    const web3 = req.web3;
    const contract = req.contract;
    
    if (!web3 || !contract) {
      return res.status(500).json({ error: 'Web3 or contract not initialized' });
    }

    const accounts = await web3.eth.getAccounts();
    if (!accounts || accounts.length === 0) {
      return res.status(500).json({ error: 'No accounts available' });
    }

    const tx = await contract.methods.manufacturerSellProduct(
      toBytes32(_productSN),
      toBytes32(_sellerCode)
    ).send({ from: accounts[0], gas: 3000000, gasPrice: '2000000000' });

    res.json({ success: true, message: 'Product transferred to seller', txHash: tx.transactionHash });
  } catch (err) {
    console.error('Transfer To Seller Error:', err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.getSellers = async (req, res) => {
  try {
    const { manufacturerId } = req.params;
    
    const web3 = req.web3;
    const contract = req.contract;
    
    if (!web3 || !contract) {
      return res.status(500).json({ error: 'Web3 or contract not initialized' });
    }

    const sellers = await contract.methods.querySellersList(toBytes32(manufacturerId)).call();
    
    // Convert to array of objects for easier frontend handling
    const sellerArray = [];
    if (sellers && sellers[0]) {
      for (let i = 0; i < sellers[0].length; i++) {
        sellerArray.push({
          sellerId: String(sellers[0][i]),
          sellerName: sellers[1][i],
          sellerBrand: sellers[2][i],
          sellerCode: sellers[3][i],
          sellerNum: String(sellers[4][i]), // Convert BigInt to string
          sellerManager: sellers[5][i],
          sellerAddress: sellers[6][i]
        });
      }
    }
    
    res.json(sellerArray);
  } catch (err) {
    console.error('Get Sellers Error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
