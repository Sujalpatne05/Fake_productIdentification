# ChainVerify - Fixes Applied

## Summary of Changes

All frontend files have been updated to use the backend API instead of direct smart contract calls. This ensures consistent data flow and proper bytes32 conversion.

### 1. Fixed CONTRACT_ADDRESS in `.env`
- **File**: `backend/.env`
- **Change**: Updated CONTRACT_ADDRESS from `0xAfC6787b57AEb733864AFF1E8518c718Ded8344` to `0xAf2C6787b57AEb733864AFF1E8518c718Ded8344`
- **Reason**: Matches the newly deployed contract address

### 2. Updated `src/js/sellProductManufacturer.js`
- **Change**: Replaced direct smart contract calls with backend API call to `/api/manufacturer/sell`
- **Headers**: Added `x-user-role: manufacturer` for authentication
- **Payload**: Sends `_productSN` and `_sellerCode`
- **Benefit**: Uses backend's correct bytes32 conversion (`web3.utils.utf8ToHex()`)

### 3. Updated `src/js/sellProductSeller.js`
- **Change**: Replaced direct smart contract calls with backend API call to `/api/seller/sell`
- **Headers**: Added `x-user-role: seller` for authentication
- **Payload**: Sends `_productSN` and `_consumerCode`
- **Benefit**: Uses backend's correct bytes32 conversion

### 4. Updated `src/js/sellerApp.js`
- **Change**: Replaced direct smart contract calls with backend API call to `/api/seller/add`
- **Headers**: Added `x-user-role: manufacturer` for authentication
- **Payload**: Sends all seller details with correct field names
- **Benefit**: Uses backend's correct bytes32 conversion

### 5. Updated `src/addSeller.html`
- **Change**: Replaced localStorage-based seller storage with backend API call to `/api/seller/add`
- **Headers**: Added `x-user-role: manufacturer` for authentication
- **Payload**: Sends all seller details with correct field names
- **Benefit**: Data is now stored on blockchain via backend, not just in browser localStorage

## Testing Instructions

### Prerequisites
1. Ganache running on `http://127.0.0.1:7545` (Chain ID: 1337)
2. Backend running on `http://localhost:5000`
3. Frontend running on `http://localhost:3000`
4. MetaMask connected to Ganache network

### Complete Flow Test

**Step 1: Add Product (Manufacturer)**
1. Go to `http://localhost:3000/addProduct.html`
2. Fill in:
   - Manufacturer ID: `MFG-001`
   - Product Name: `iPhone 15`
   - Product SN: `SN-12345`
   - Product Brand: `Apple`
   - Product Price: `80000`
3. Click "Register Product"
4. Verify success message

**Step 2: Add Seller (Manufacturer)**
1. Go to `http://localhost:3000/addSeller.html`
2. Fill in:
   - Seller Name: `TechMart`
   - Brand: `TechMart`
   - Seller Code: `SEL-001`
   - Phone Number: `9876543210`
   - Manager Name: `Rajesh`
   - Manufacturer ID: `MFG-001`
   - Address: `Shop 12, Mumbai`
3. Click "Register Seller"
4. Verify success message and seller code displayed

**Step 3: Transfer Product to Seller (Manufacturer)**
1. Go to `http://localhost:3000/sellProductManufacturer.html`
2. Fill in:
   - Product SN: `SN-12345`
   - Seller Code: `SEL-001`
3. Click "Sell to Seller"
4. Verify success message

**Step 4: Sell Product to Consumer (Seller)**
1. Go to `http://localhost:3000/sellProductSeller.html`
2. Fill in:
   - Product SN: `SN-12345`
   - Consumer Code: `CON-99`
3. Click "Sell to Consumer"
4. Verify success message

**Step 5: Verify Product (Consumer)**
1. Go to `http://localhost:3000/consumer.html`
2. Enter Consumer Code: `CON-99`
3. Enter Product SN: `SN-12345`
4. Click "Verify Product"
5. **Expected Result**: Product should show as "GENUINE" ✅

## API Endpoints Used

### Manufacturer Endpoints
- `POST /api/manufacturer/sell` - Transfer product to seller
  - Headers: `x-user-role: manufacturer`
  - Body: `{ _productSN, _sellerCode }`

### Seller Endpoints
- `POST /api/seller/add` - Add new seller
  - Headers: `x-user-role: manufacturer`
  - Body: `{ _manufacturerId, _sellerName, _sellerBrand, _sellerCode, _sellerNum, _sellerManager, _sellerAddress }`
- `POST /api/seller/sell` - Sell product to consumer
  - Headers: `x-user-role: seller`
  - Body: `{ _productSN, _consumerCode }`

### Product Endpoints
- `POST /api/product/add` - Add new product
  - Headers: `x-user-role: manufacturer`
  - Body: `{ _manufacturerID, _productName, _productSN, _productBrand, _productPrice }`

## Verification Logic

The smart contract now verifies the complete chain of custody:
1. ✅ Product exists (registered by manufacturer)
2. ✅ Product transferred to seller (manufacturerSellProduct called)
3. ✅ Product sold to consumer (sellerSellProduct called)

If all three conditions are met, the product is marked as GENUINE.

## Notes

- All bytes32 conversions are now handled by the backend using `web3.utils.utf8ToHex()`
- Frontend no longer uses deprecated `web3.fromAscii()` method
- All API calls include proper authentication headers
- Gas limits are set to 3000000 gas with 2000000000 gasPrice
