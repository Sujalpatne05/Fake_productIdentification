# ChainVerify - Step-by-Step Testing Guide

## Prerequisites ✅

Before starting, ensure:
- [ ] Ganache running on `http://127.0.0.1:7545` (Chain ID: 1337)
- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend running on `http://localhost:3000`
- [ ] MetaMask connected to Ganache network
- [ ] First Ganache account imported to MetaMask with ~100 ETH

---

## COMPLETE FLOW TEST

### STEP 1: Add Product (Manufacturer) ✏️

**URL:** `http://localhost:3000/addProduct.html`

**Action:**
1. Click on "Manufacturer Panel" from home
2. Click "Add Product"
3. Fill in the form:
   - **Manufacturer ID:** `MFG-001`
   - **Product Name:** `iPhone 15`
   - **Product Serial Number (SN):** `SN-100`
   - **Brand:** `Apple`
   - **Price (₹):** `9999`
4. Click "⛓️ Add to Blockchain"

**Expected Result:**
- ✅ Toast message: "Product added to blockchain! 🎉"
- ✅ QR code appears below
- ✅ QR code shows "SN: SN-100"
- ✅ Can download or print QR code

**If Error:**
- ❌ "Backend not reachable" → Start backend: `npm start` in `backend/` folder
- ❌ "Cannot read properties" → Ensure `product.json` exists in `src/` folder

---

### STEP 2: Add Seller (Manufacturer) 🤝

**URL:** `http://localhost:3000/addSeller.html`

**Action:**
1. Go back to Manufacturer Panel
2. Click "Add Seller"
3. Fill in the form:
   - **Seller Name:** `TechMart`
   - **Brand:** `TechMart`
   - **Seller Code:** `SEL-001`
   - **Phone Number:** `9876543210`
   - **Manager Name:** `Rajesh Kumar`
   - **Manufacturer ID:** `MFG-001`
   - **Address:** `Shop 12, Gandhi Market, Mumbai`
4. Click "⛓️ Register Seller"

**Expected Result:**
- ✅ Toast message: "Seller added successfully ✅"
- ✅ Success box shows: "Seller Registered Successfully"
- ✅ Seller code displayed: `SEL-001`
- ✅ Can copy seller code

**If Error:**
- ❌ "Please fill all fields" → Ensure all fields are filled
- ❌ "Error: ..." → Check backend logs for details

---

### STEP 3: Transfer Product to Seller (Manufacturer) 🔄

**URL:** `http://localhost:3000/sellProductManufacturer.html`

**Action:**
1. Go back to Manufacturer Panel
2. Click "Sell to Seller"
3. Fill in the form:
   - **Product Serial Number (SN):** `SN-100`
   - **Seller Code:** `SEL-001`
4. Click "⛓️ Sell to Seller"

**Expected Result:**
- ✅ Toast message: "Product transferred to seller successfully!"
- ✅ Form fields cleared
- ✅ Product now belongs to seller on blockchain

**If Error:**
- ❌ "Product SN and Seller Code required!" → Fill both fields
- ❌ "Error: ..." → Check if product and seller exist

---

### STEP 4: Sell Product to Consumer (Seller) 💰

**URL:** `http://localhost:3000/sellProductSeller.html`

**Action:**
1. Go to "Seller Panel" from home
2. Click "Sell to Consumer"
3. Fill in the form:
   - **Product Serial Number (SN):** `SN-100`
   - **Consumer Code:** `CON-99`
4. Click "⛓️ Sell to Consumer"

**Expected Result:**
- ✅ Toast message: "Product sold to consumer successfully!"
- ✅ Form fields cleared
- ✅ Product now belongs to consumer on blockchain

**If Error:**
- ❌ "Product SN and Consumer Code required!" → Fill both fields
- ❌ "Error: ..." → Check if product exists and is available

---

### STEP 5: Verify Product (Consumer) ✅

**URL:** `http://localhost:3000/verifyProducts.html`

**Action:**
1. Go to "Consumer Panel" from home
2. Click "Verify Product"
3. Fill in the form:
   - **Consumer Code:** `CON-99`
   - **Product Serial Number (SN):** `SN-100`
4. Click "🔍 Verify Product"

**Expected Result:**
- ✅ **GENUINE** badge appears (green)
- ✅ Message: "This product is GENUINE ✅"
- ✅ Shows complete chain:
  - Manufacturer: `MFG-001`
  - Seller: `SEL-001`
  - Consumer: `CON-99`

**If Error:**
- ❌ **COUNTERFEIT** badge appears (red) → Check if all steps completed
- ❌ "Product not found" → Verify SN and consumer code are correct

---

### STEP 6: View Purchase History (Consumer) 📋

**URL:** `http://localhost:3000/consumerPurchaseHistory.html`

**Action:**
1. Go to "Consumer Panel" from home
2. Click "Purchase History"
3. Enter:
   - **Consumer Code:** `CON-99`
4. Click "📋 Get History"

**Expected Result:**
- ✅ Shows table with purchased products
- ✅ Displays:
  - Product SN: `SN-100`
  - Product Name: `iPhone 15`
  - Brand: `Apple`
  - Seller: `SEL-001`
  - Manufacturer: `MFG-001`

**If Error:**
- ❌ "No products found" → Verify consumer code is correct
- ❌ Empty table → Check if product was sold to this consumer

---

## ADDITIONAL TESTS

### Test: Query Products (Manufacturer)

**URL:** `http://localhost:3000/queryProducts.html`

**Action:**
1. Go to Manufacturer Panel
2. Click "Query Products"
3. Enter Seller Code: `SEL-001`
4. Click "📦 Get Products"

**Expected Result:**
- ✅ Shows all products registered
- ✅ Displays product details in grid/table view

---

### Test: Query Sellers (Manufacturer)

**URL:** `http://localhost:3000/querySeller.html`

**Action:**
1. Go to Manufacturer Panel
2. Click "Query Sellers"

**Expected Result:**
- ✅ Shows all sellers registered by this manufacturer
- ✅ Displays seller details

---

### Test: Products For Sale (Seller)

**URL:** `http://localhost:3000/queryProducts.html`

**Action:**
1. Go to Seller Panel
2. Click "Products For Sale"
3. Enter Seller Code: `SEL-001`
4. Click "📦 Get Products"

**Expected Result:**
- ✅ Shows all products in seller's inventory
- ✅ Can filter and search products

---

## TROUBLESHOOTING

### Issue: "Cannot read properties of undefined (reading 'addProduct')"
**Solution:**
```bash
# Copy product.json to src folder
Copy-Item -Path "build/contracts/product.json" -Destination "src/product.json" -Force
```

### Issue: "Backend not reachable on 5000"
**Solution:**
```bash
# Start backend
cd backend
npm start
```

### Issue: "Product showing as COUNTERFEIT"
**Solution:**
- Ensure you completed ALL steps in order:
  1. Add Product ✅
  2. Add Seller ✅
  3. Transfer to Seller ✅
  4. Sell to Consumer ✅
  5. Verify with same consumer code ✅

### Issue: "MetaMask not connected"
**Solution:**
1. Open MetaMask
2. Click "Connect" button
3. Select Ganache network
4. Approve connection

### Issue: "No accounts found"
**Solution:**
1. Ensure MetaMask is unlocked
2. Ensure first Ganache account is imported
3. Refresh page and try again

---

## Quick Reference

### Test Data
```
Manufacturer ID:    MFG-001
Product Name:       iPhone 15
Product SN:         SN-100
Brand:              Apple
Price:              9999

Seller Name:        TechMart
Seller Code:        SEL-001
Manager:            Rajesh Kumar
Phone:              9876543210
Address:            Shop 12, Gandhi Market, Mumbai

Consumer Code:      CON-99
```

### URLs
```
Home:               http://localhost:3000/
Manufacturer:       http://localhost:3000/manufacturer.html
Seller:             http://localhost:3000/seller.html
Consumer:           http://localhost:3000/consumer.html
Add Product:        http://localhost:3000/addProduct.html
Add Seller:         http://localhost:3000/addSeller.html
Sell to Seller:     http://localhost:3000/sellProductManufacturer.html
Sell to Consumer:   http://localhost:3000/sellProductSeller.html
Verify Product:     http://localhost:3000/verifyProducts.html
Purchase History:   http://localhost:3000/consumerPurchaseHistory.html
```

### Backend APIs
```
POST /api/product/add
POST /api/manufacturer/sell
POST /api/seller/add
POST /api/seller/sell
GET /api/product/verify
GET /api/product/history
```

---

## Success Criteria ✅

All tests pass when:
- [ ] Product added successfully with QR code
- [ ] Seller registered successfully
- [ ] Product transferred to seller
- [ ] Product sold to consumer
- [ ] Product verifies as GENUINE
- [ ] Purchase history shows product
- [ ] All pages load without errors
- [ ] All API calls return success responses
- [ ] No console errors

---

## Notes

- Each test should be independent
- You can repeat tests with different data
- Consumer code can be any value (e.g., CON-99, CON-100, etc.)
- Seller code must match between transfer and sell steps
- Product SN must match between all steps
