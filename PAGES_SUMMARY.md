# ChainVerify - All Pages Summary

## Home Page
- **File:** `src/index.html`
- **URL:** `http://localhost:3000/`
- **Purpose:** Landing page with overview of all three panels
- **Links to:** Manufacturer, Seller, Consumer panels

---

## MANUFACTURER PANEL 🏭
**Main Page:** `src/manufacturer.html`

### Sub-Pages:

| Page | File | Purpose | API Endpoint |
|------|------|---------|--------------|
| **Add Product** | `addProduct.html` | Register new product on blockchain | `POST /api/product/add` |
| **Add Seller** | `addSeller.html` | Register trusted seller | `POST /api/seller/add` |
| **Sell to Seller** | `sellProductManufacturer.html` | Transfer product to seller | `POST /api/manufacturer/sell` |
| **Query Products** | `queryProducts.html` | View all registered products | N/A (Frontend only) |
| **Query Sellers** | `querySeller.html` | View all registered sellers | N/A (Frontend only) |

### Navigation Flow:
```
manufacturer.html
├── addProduct.html (📦 Add Product)
├── addSeller.html (🤝 Add Seller)
├── sellProductManufacturer.html (🔄 Sell to Seller)
├── queryProducts.html (📊 Query Products)
└── querySeller.html (🔍 Query Sellers)
```

---

## SELLER PANEL 🛒
**Main Page:** `src/seller.html`

### Sub-Pages:

| Page | File | Purpose | API Endpoint |
|------|------|---------|--------------|
| **Sell to Consumer** | `sellProductSeller.html` | Transfer product to consumer | `POST /api/seller/sell` |
| **Products For Sale** | `queryProducts.html` | View inventory | N/A (Frontend only) |

### Navigation Flow:
```
seller.html
├── sellProductSeller.html (🔄 Sell to Consumer)
└── queryProducts.html (📦 Products For Sale)
```

---

## CONSUMER PANEL 👤
**Main Page:** `src/consumer.html`

### Sub-Pages:

| Page | File | Purpose | API Endpoint |
|------|------|---------|--------------|
| **Verify Product** | `verifyProducts.html` | Check product authenticity | `GET /api/product/verify` |
| **Purchase History** | `consumerPurchaseHistory.html` | View all purchases | `GET /api/product/history` |

### Navigation Flow:
```
consumer.html
├── verifyProducts.html (🔍 Verify Product)
└── consumerPurchaseHistory.html (📋 Purchase History)
```

---

## Complete Page List

### HTML Files (13 total)

1. **index.html** - Home/Landing page
2. **manufacturer.html** - Manufacturer main panel
3. **addProduct.html** - Add product form
4. **addSeller.html** - Add seller form
5. **sellProductManufacturer.html** - Manufacturer sell to seller
6. **queryProducts.html** - Query/view products
7. **querySeller.html** - Query/view sellers
8. **seller.html** - Seller main panel
9. **sellProductSeller.html** - Seller sell to consumer
10. **consumer.html** - Consumer main panel
11. **verifyProducts.html** - Verify product authenticity
12. **consumerPurchaseHistory.html** - View purchase history
13. **bs-config.json** - BrowserSync config (not HTML)

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    BLOCKCHAIN (Ganache)                     │
│              Contract: 0xAf2C6787b57AEb733864...            │
└─────────────────────────────────────────────────────────────┘
                              ↑
                              │
                    ┌─────────┴─────────┐
                    │                   │
            ┌───────▼────────┐  ┌──────▼────────┐
            │  BACKEND API   │  │   Web3.js     │
            │  (Port 5000)   │  │  (MetaMask)   │
            └───────▲────────┘  └──────▲────────┘
                    │                   │
        ┌───────────┼───────────────────┼───────────┐
        │           │                   │           │
    ┌───▼──┐   ┌───▼──┐           ┌────▼──┐   ┌───▼──┐
    │ MFG  │   │ SEL  │           │ CON   │   │ QR   │
    │Panel │   │Panel │           │Panel  │   │Code  │
    └──────┘   └──────┘           └───────┘   └──────┘
```

---

## API Endpoints Used

### Product APIs
- `POST /api/product/add` - Add new product
- `GET /api/product/verify` - Verify product
- `GET /api/product/history` - Get purchase history

### Manufacturer APIs
- `POST /api/manufacturer/sell` - Transfer to seller

### Seller APIs
- `POST /api/seller/add` - Add seller
- `POST /api/seller/sell` - Sell to consumer
- `GET /api/seller/products/:sellerId` - Get seller products

---

## Key Files Structure

```
src/
├── index.html                          (Home)
├── manufacturer.html                   (MFG Panel)
├── addProduct.html                     (MFG: Add Product)
├── addSeller.html                      (MFG: Add Seller)
├── sellProductManufacturer.html        (MFG: Sell to Seller)
├── queryProducts.html                  (MFG/SEL: Query Products)
├── querySeller.html                    (MFG: Query Sellers)
├── seller.html                         (SEL Panel)
├── sellProductSeller.html              (SEL: Sell to Consumer)
├── consumer.html                       (CON Panel)
├── verifyProducts.html                 (CON: Verify Product)
├── consumerPurchaseHistory.html        (CON: Purchase History)
├── product.json                        (Contract ABI - COPIED)
├── css/
│   └── shared.css                      (Shared styles)
└── js/
    ├── productApp.js                   (Old - not used)
    ├── sellerApp.js                    (Old - not used)
    ├── sellProductManufacturer.js      (Old - not used)
    ├── sellProductSeller.js            (Old - not used)
    ├── web3.min.js                     (Web3 library)
    ├── truffle-contract.js             (Truffle contract wrapper)
    └── jsQR.js                         (QR code scanner)
```

---

## Testing Checklist

- [ ] **Add Product** - Manufacturer adds product with SN-100
- [ ] **Add Seller** - Manufacturer adds seller with code SEL-001
- [ ] **Transfer to Seller** - Manufacturer transfers SN-100 to SEL-001
- [ ] **Sell to Consumer** - Seller sells SN-100 to CON-99
- [ ] **Verify Product** - Consumer verifies SN-100 with CON-99 → Shows GENUINE ✅
- [ ] **Purchase History** - Consumer views history → Shows SN-100
- [ ] **Query Products** - Manufacturer views all products
- [ ] **Query Sellers** - Manufacturer views all sellers

---

## Important Notes

✅ All pages use backend API (not direct contract calls)
✅ All pages include proper error handling
✅ All pages have responsive design
✅ All pages use consistent styling from shared.css
✅ QR code generation works on addProduct.html
✅ product.json is now in src/ folder for contract loading
