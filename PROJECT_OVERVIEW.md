# Fake Product Identification Using Blockchain

## Project Name
**Fake Product Identification** (ChainVerify)

## Tech Stack

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling
- **JavaScript (Vanilla)** - Interactivity
- **Web3.js** - Blockchain interaction
- **QRCode.js** - QR code generation
- **jsQR** - QR code scanning

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **Web3.js** - Blockchain interaction
- **Joi** - Data validation
- **CORS** - Cross-origin requests
- **Morgan** - HTTP logging

### Smart Contract
- **Solidity 0.8.12** - Smart contract language
- **Truffle** - Development framework
- **Ganache** - Local blockchain

### Blockchain
- **Ethereum** - Blockchain network
- **Sepolia Testnet** - For testing
- **Mainnet** - For production

---

## Project Structure

```
fake-product-identification-using-blockchain/
├── src/                          # Frontend files
│   ├── index.html               # Home page
│   ├── addProduct.html          # Add product page
│   ├── verifyProducts.html      # Verify product page
│   ├── manufacturer.html        # Manufacturer panel
│   ├── consumer.html            # Consumer panel
│   ├── js/                      # JavaScript files
│   └── css/                     # Stylesheets
├── backend/                      # Backend API
│   ├── index.js                 # Express server
│   ├── config/                  # Configuration
│   ├── controllers/             # API logic
│   ├── routes/                  # API routes
│   └── middleware/              # Middleware
├── contracts/                    # Smart contracts
│   └── product.sol              # Main contract
├── migrations/                   # Truffle migrations
├── build/                        # Compiled contracts
├── truffle-config.js            # Truffle configuration
└── package.json                 # Dependencies
```

---

## Key Features

✅ **Product Registration** - Manufacturers register products on blockchain
✅ **QR Code Generation** - Automatic QR code for each product
✅ **Product Transfer** - Transfer products from manufacturer to seller
✅ **Product Selling** - Sellers sell products to consumers
✅ **Product Verification** - Consumers verify product authenticity
✅ **QR Scanning** - Scan QR codes to verify products
✅ **QR Upload** - Upload QR images for verification
✅ **Purchase History** - Track product journey
✅ **Recent Products** - View recently added products (persistent)
✅ **MetaMask Integration** - Connect wallet for transactions

---

## How It Works

### 1. Product Registration (Manufacturer)
- Manufacturer adds product details
- Smart contract registers product on blockchain
- QR code generated with product SN
- Product stored in localStorage (recent products)

### 2. Product Transfer (Manufacturer → Seller)
- Manufacturer transfers product to seller
- Smart contract updates product status
- Product marked as "For Sale"

### 3. Product Selling (Seller → Consumer)
- Seller sells product to consumer
- Consumer code recorded on blockchain
- Product marked as "Sold"

### 4. Product Verification (Consumer)
- Consumer enters their consumer code
- Scans QR code to get product SN
- Backend verifies with smart contract
- Shows GENUINE or FAKE result

---

## Smart Contract Functions

```solidity
// Add product
addProduct(manufacturerID, productName, productSN, productBrand, productPrice)

// Transfer to seller
manufacturerSellProduct(productSN, sellerCode)

// Sell to consumer
sellerSellProduct(productSN, consumerCode)

// Verify product
verifyProduct(productSN, consumerCode) → bool

// Query products
queryProductsList(sellerCode)
querySellersList(manufacturerCode)

// Get purchase history
getPurchaseHistory(consumerCode)
```

---

## API Endpoints

### Product APIs
- `POST /api/product/add` - Add product
- `GET /api/product/verify/:serial?consumerCode=code` - Verify product
- `GET /api/product/history/:consumerId` - Get purchase history

### Seller APIs
- `POST /api/seller/add` - Add seller
- `POST /api/seller/sell` - Sell product to consumer
- `GET /api/seller/query/:sellerCode` - Query seller products

### Manufacturer APIs
- `POST /api/manufacturer/sell` - Transfer product to seller
- `GET /api/manufacturer/sellers/:manufacturerId` - Get sellers

---

## Running the Project

### Prerequisites
- Node.js v14+
- Ganache (local blockchain)
- MetaMask browser extension

### Steps

1. **Start Ganache**
   ```bash
   ganache-cli --deterministic --host 0.0.0.0 --port 7545
   ```

2. **Deploy Smart Contract**
   ```bash
   truffle migrate
   ```

3. **Start Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```

4. **Start Frontend**
   ```bash
   npm install
   npm run dev
   ```

5. **Open Browser**
   - Go to http://localhost:3000

---

## Testing Flow

1. **Add Product** (MFG-001)
   - Go to Add Product page
   - Fill details and submit
   - QR code generated

2. **Add Seller** (SEL-001)
   - Go to Add Seller page
   - Fill seller details

3. **Transfer to Seller**
   - Go to Sell to Seller page
   - Enter product SN and seller code

4. **Sell to Consumer** (CON-99)
   - Go to Sell Product page
   - Enter product SN and consumer code

5. **Verify Product**
   - Go to Verify Product page
   - Enter consumer code
   - Scan QR code
   - See result: GENUINE ✅

---

## Deployment

See `DEPLOYMENT_GUIDE.md` for complete deployment instructions.

### Quick Deploy
- **Smart Contract**: Truffle to Sepolia testnet
- **Backend**: Heroku or AWS EC2
- **Frontend**: Vercel or Netlify

---

## Security Features

✅ Input validation (Joi)
✅ CORS protection
✅ Rate limiting
✅ Environment variables for secrets
✅ Blockchain immutability
✅ MetaMask wallet security

---

## Future Enhancements

- [ ] Database for off-chain data
- [ ] User authentication
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Mobile app
- [ ] Multi-chain support
- [ ] Advanced QR features
- [ ] Batch operations

---

## Team

- **Shoheb Khan** - Smart Contract & Architecture
- **Sujal Patne** - Frontend & Backend
- **Dhepe** - Testing & Documentation
- **Pawan** - Deployment & DevOps

---

## License

MIT License - See LICENSE file

---

## Support

For issues and questions:
- GitHub: https://github.com/Sujalpatne05/Fake_productIdentification
- Email: support@chainverify.com

---

**Last Updated**: April 2026
**Version**: 1.0.0
**Status**: Production Ready ✅
