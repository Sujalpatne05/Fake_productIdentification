# ChainVerify - Complete Flow Guide

## System Overview

ChainVerify is a blockchain-based product authentication system with three main stakeholders:

```
Manufacturer → Seller → Consumer
    ↓           ↓          ↓
  Add Product  Receive   Verify
  Add Seller   Product   Product
  Transfer     Sell to
  to Seller    Consumer
```

---

## 1. MANUFACTURER PANEL 🏭

**URL:** `http://localhost:3000/manufacturer.html`

### Available Actions:

#### 1.1 Add Product
- **File:** `src/addProduct.html`
- **Purpose:** Register a new product on the blockchain
- **Flow:**
  1. Enter Manufacturer ID (e.g., `MFG-001`)
  2. Enter Product Name (e.g., `iPhone 15`)
  3. Enter Product Serial Number (e.g., `SN-100`)
  4. Enter Brand (e.g., `Apple`)
  5. Enter Price (e.g., `9999`)
  6. Click "Add to Blockchain"
  7. QR code is generated automatically
- **Backend API:** `POST /api/product/add`
- **Result:** Product registered on blockchain with unique QR code

#### 1.2 Add Seller
- **File:** `src/addSeller.html`
- **Purpose:** Register a trusted seller to your distribution network
- **Flow:**
  1. Enter Seller Name (e.g., `TechMart`)
  2. Enter Brand (e.g., `TechMart`)
  3. Enter Seller Code (e.g., `SEL-001`)
  4. Enter Phone Number (e.g., `9876543210`)
  5. Enter Manager Name (e.g., `Rajesh`)
  6. Enter Manufacturer ID (e.g., `MFG-001`)
  7. Enter Address (e.g., `Shop 12, Mumbai`)
  8. Click "Register Seller"
- **Backend API:** `POST /api/seller/add`
- **Result:** Seller registered on blockchain with unique seller code

#### 1.3 Sell Product to Seller
- **File:** `src/sellProductManufacturer.html`
- **Purpose:** Transfer product ownership from manufacturer to seller
- **Flow:**
  1. Enter Product Serial Number (e.g., `SN-100`)
  2. Enter Seller Code (e.g., `SEL-001`)
  3. Click "Sell to Seller"
- **Backend API:** `POST /api/manufacturer/sell`
- **Result:** Product transferred to seller on blockchain

#### 1.4 Query Products
- **File:** `src/queryProducts.html`
- **Purpose:** View all registered products
- **Flow:**
  1. Enter Seller Code to filter products
  2. View products in grid or table view
- **Result:** List of all products with their details

#### 1.5 Query Sellers
- **File:** `src/querySeller.html`
- **Purpose:** View all registered sellers
- **Flow:**
  1. View all sellers registered by this manufacturer
- **Result:** List of all sellers with their details

---

## 2. SELLER PANEL 🛒

**URL:** `http://localhost:3000/seller.html`

### Available Actions:

#### 2.1 Sell to Consumer
- **File:** `src/sellProductSeller.html`
- **Purpose:** Transfer product ownership from seller to consumer
- **Flow:**
  1. Enter Product Serial Number (e.g., `SN-100`)
  2. Enter Consumer Code (e.g., `CON-99`)
  3. Click "Sell to Consumer"
- **Backend API:** `POST /api/seller/sell`
- **Result:** Product transferred to consumer on blockchain

#### 2.2 Products For Sale
- **File:** `src/queryProducts.html`
- **Purpose:** View all products in your inventory
- **Flow:**
  1. Enter your Seller Code
  2. Click "Get Products"
  3. View products in grid or table view
- **Result:** List of all products available for sale

---

## 3. CONSUMER PANEL 👤

**URL:** `http://localhost:3000/consumer.html`

### Available Actions:

#### 3.1 Verify Product
- **File:** `src/verifyProducts.html`
- **Purpose:** Verify if a product is genuine or counterfeit
- **Flow:**
  1. Enter Consumer Code (e.g., `CON-99`)
  2. Enter Product Serial Number (e.g., `SN-100`)
  3. Click "Verify Product"
  4. **Result:** 
     - ✅ GENUINE - if product was properly transferred through the supply chain
     - ❌ COUNTERFEIT - if product was not transferred to this consumer
- **Backend API:** `GET /api/product/verify`
- **Verification Logic:**
  - Product exists (registered by manufacturer)
  - Product transferred to seller
  - Product sold to this consumer

#### 3.2 Purchase History
- **File:** `src/consumerPurchaseHistory.html`
- **Purpose:** View all products purchased by this consumer
- **Flow:**
  1. Enter Consumer Code (e.g., `CON-99`)
  2. Click "Get History"
  3. View all products purchased
- **Backend API:** `GET /api/product/history`
- **Result:** List of all products purchased with seller and manufacturer info

---

## Complete Testing Flow

### Step 1: Add Product (Manufacturer)
```
URL: http://localhost:3000/addProduct.html
Input:
  - Manufacturer ID: MFG-001
  - Product Name: iPhone 15
  - Product SN: SN-100
  - Brand: Apple
  - Price: 9999
Output: ✅ Product added, QR code generated
```

### Step 2: Add Seller (Manufacturer)
```
URL: http://localhost:3000/addSeller.html
Input:
  - Seller Name: TechMart
  - Brand: TechMart
  - Seller Code: SEL-001
  - Phone: 9876543210
  - Manager: Rajesh
  - Manufacturer ID: MFG-001
  - Address: Shop 12, Mumbai
Output: ✅ Seller registered
```

### Step 3: Transfer to Seller (Manufacturer)
```
URL: http://localhost:3000/sellProductManufacturer.html
Input:
  - Product SN: SN-100
  - Seller Code: SEL-001
Output: ✅ Product transferred to seller
```

### Step 4: Sell to Consumer (Seller)
```
URL: http://localhost:3000/sellProductSeller.html
Input:
  - Product SN: SN-100
  - Consumer Code: CON-99
Output: ✅ Product sold to consumer
```

### Step 5: Verify Product (Consumer)
```
URL: http://localhost:3000/verifyProducts.html
Input:
  - Consumer Code: CON-99
  - Product SN: SN-100
Output: ✅ GENUINE (Product verified through complete supply chain)
```

### Step 6: View Purchase History (Consumer)
```
URL: http://localhost:3000/consumerPurchaseHistory.html
Input:
  - Consumer Code: CON-99
Output: ✅ Shows SN-100 with seller SEL-001 and manufacturer MFG-001
```

---

## API Endpoints Summary

### Product Endpoints
- `POST /api/product/add` - Add new product
- `GET /api/product/verify` - Verify product authenticity
- `GET /api/product/history` - Get consumer purchase history

### Manufacturer Endpoints
- `POST /api/manufacturer/sell` - Transfer product to seller

### Seller Endpoints
- `POST /api/seller/add` - Add new seller
- `POST /api/seller/sell` - Sell product to consumer
- `GET /api/seller/products/:sellerId` - Get seller's products

---

## Key Features

✅ **Immutable Records** - All transactions recorded on blockchain
✅ **QR Code Generation** - Automatic QR code for each product
✅ **Complete Chain Tracking** - Manufacturer → Seller → Consumer
✅ **Verification Logic** - Checks complete supply chain before marking as genuine
✅ **Purchase History** - Consumers can view all their purchases
✅ **Seller Management** - Manufacturers can manage multiple sellers
✅ **Backend API** - All operations go through backend for consistency

---

## Important Notes

1. **Bytes32 Conversion** - All string data is converted to bytes32 using `web3.utils.utf8ToHex()`
2. **Gas Limits** - All transactions use 3000000 gas with 2000000000 gasPrice
3. **Authentication** - All API calls include `x-user-role` header
4. **Contract Address** - `0xAf2C6787b57AEb733864AFF1E8518c718Ded8344`
5. **Ganache Network** - Chain ID 1337, RPC: http://127.0.0.1:7545

---

## Troubleshooting

### Error: "Cannot read properties of undefined"
- **Solution:** Ensure `product.json` exists in `src/` folder
- **Fix:** Copy from `build/contracts/product.json` to `src/product.json`

### Error: "Backend not reachable"
- **Solution:** Ensure backend is running on port 5000
- **Command:** `npm start` in `backend/` folder

### Error: "Product showing as COUNTERFEIT"
- **Solution:** Ensure complete flow: Add → Transfer to Seller → Sell to Consumer
- **Check:** Verify consumer code matches the one used in "Sell to Consumer" step

### QR Code Not Scanning
- **Solution:** Use manual entry tab as fallback
- **Alternative:** Copy product SN and enter manually in verify page
