# ChainVerify - Deployment Guide

Complete guide to deploy ChainVerify (Frontend, Backend, and Smart Contract) to production.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Smart Contract Deployment](#smart-contract-deployment)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Production Checklist](#production-checklist)

---

## Prerequisites

### Required Tools
- Node.js (v14+)
- npm or yarn
- Git
- Truffle CLI: `npm install -g truffle`
- Ganache CLI or Ganache GUI (for local testing)

### Accounts & Services
- GitHub account (for code hosting)
- Ethereum testnet account (Sepolia/Goerli) with test ETH
- Infura account (for Ethereum RPC endpoint)
- Hosting service (Heroku, AWS, DigitalOcean, Vercel, Netlify)

---

## Smart Contract Deployment

### Option 1: Deploy to Ethereum Testnet (Sepolia)

#### Step 1: Setup Infura
1. Go to https://infura.io
2. Create account and get API key
3. Create new project for Ethereum Sepolia

#### Step 2: Setup Environment Variables
Create `.env` file in root directory:
```
INFURA_API_KEY=your_infura_api_key
PRIVATE_KEY=your_wallet_private_key
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
```

#### Step 3: Update truffle-config.js
```javascript
require('dotenv').config();

module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider(
        process.env.PRIVATE_KEY,
        process.env.SEPOLIA_RPC_URL
      ),
      network_id: 11155111,
      gas: 5500000,
      gasPrice: 20000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.8.12"
    }
  }
};
```

#### Step 4: Deploy Contract
```bash
npm install @truffle/hdwallet-provider dotenv
truffle migrate --network sepolia
```

Save the contract address from output.

---

## Backend Deployment

### Option 1: Deploy to Heroku

#### Step 1: Install Heroku CLI
```bash
npm install -g heroku
heroku login
```

#### Step 2: Create Heroku App
```bash
cd backend
heroku create your-app-name
```

#### Step 3: Set Environment Variables
```bash
heroku config:set CONTRACT_ADDRESS=0x...
heroku config:set RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
heroku config:set PORT=5000
```

#### Step 4: Update backend/index.js for Production
```javascript
const PORT = process.env.PORT || 5000;
const RPC_URL = process.env.RPC_URL || 'http://127.0.0.1:7545';
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### Step 5: Create Procfile
Create `backend/Procfile`:
```
web: node index.js
```

#### Step 6: Deploy
```bash
git push heroku main
```

### Option 2: Deploy to AWS EC2

#### Step 1: Launch EC2 Instance
- AMI: Ubuntu 20.04 LTS
- Instance type: t2.micro (free tier)
- Security group: Allow ports 22, 80, 443, 5000

#### Step 2: SSH into Instance
```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

#### Step 3: Install Dependencies
```bash
sudo apt update
sudo apt install nodejs npm git
```

#### Step 4: Clone Repository
```bash
git clone https://github.com/Sujalpatne05/Fake_productIdentification.git
cd Fake_productIdentification/backend
npm install
```

#### Step 5: Create .env File
```bash
nano .env
```
Add:
```
CONTRACT_ADDRESS=0x...
RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
PORT=5000
```

#### Step 6: Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
pm2 start index.js --name "chainverify-backend"
pm2 startup
pm2 save
```

#### Step 7: Setup Nginx Reverse Proxy
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
```

Add:
```nginx
server {
    listen 80 default_server;
    server_name _;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Restart Nginx:
```bash
sudo systemctl restart nginx
```

---

## Frontend Deployment

### Option 1: Deploy to Vercel

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
cd fake-product-identification-using-blockchain
vercel
```

#### Step 3: Update API Endpoint
In `src/js/*.js` files, update:
```javascript
// Change from:
const API_URL = 'http://localhost:5000';

// To:
const API_URL = 'https://your-backend-url.com';
```

### Option 2: Deploy to Netlify

#### Step 1: Build Project
```bash
npm run build
```

#### Step 2: Deploy via Netlify UI
1. Go to https://netlify.com
2. Connect GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `src/`

#### Step 3: Set Environment Variables
In Netlify dashboard:
- Go to Site settings → Build & deploy → Environment
- Add: `REACT_APP_API_URL=https://your-backend-url.com`

### Option 3: Deploy to GitHub Pages

#### Step 1: Update package.json
```json
{
  "homepage": "https://Sujalpatne05.github.io/Fake_productIdentification",
  "scripts": {
    "build": "echo 'Building...'",
    "deploy": "gh-pages -d src"
  }
}
```

#### Step 2: Install gh-pages
```bash
npm install --save-dev gh-pages
```

#### Step 3: Deploy
```bash
npm run deploy
```

### Option 4: Deploy to AWS S3 + CloudFront

#### Step 1: Create S3 Bucket
```bash
aws s3 mb s3://chainverify-frontend
```

#### Step 2: Upload Files
```bash
aws s3 sync src/ s3://chainverify-frontend --delete
```

#### Step 3: Enable Static Website Hosting
- Go to S3 bucket → Properties → Static website hosting
- Enable and set index.html as index document

#### Step 4: Setup CloudFront Distribution
- Create CloudFront distribution pointing to S3 bucket
- Set default root object to index.html

---

## Complete Deployment Checklist

### Pre-Deployment
- [ ] Update all API endpoints to production URLs
- [ ] Remove console.log statements
- [ ] Update MetaMask network to production (Sepolia/Mainnet)
- [ ] Test all features locally
- [ ] Update contract address in `.env`
- [ ] Verify smart contract on Etherscan

### Backend
- [ ] Deploy to Heroku/AWS/DigitalOcean
- [ ] Set all environment variables
- [ ] Enable CORS for frontend domain
- [ ] Setup SSL/HTTPS
- [ ] Configure database backups
- [ ] Setup monitoring and logging

### Frontend
- [ ] Build production bundle
- [ ] Deploy to Vercel/Netlify/GitHub Pages
- [ ] Update API endpoint URLs
- [ ] Test all pages and features
- [ ] Verify QR code generation
- [ ] Test MetaMask connection
- [ ] Check responsive design

### Smart Contract
- [ ] Deploy to testnet first
- [ ] Verify contract on Etherscan
- [ ] Test all functions
- [ ] Document contract address
- [ ] Setup contract monitoring

### Post-Deployment
- [ ] Test complete flow end-to-end
- [ ] Monitor error logs
- [ ] Setup alerts for failures
- [ ] Document deployment details
- [ ] Create backup procedures
- [ ] Setup CI/CD pipeline

---

## Environment Variables Reference

### Backend (.env)
```
PORT=5000
RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
CONTRACT_ADDRESS=0x...
NODE_ENV=production
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.com
REACT_APP_NETWORK_ID=11155111
REACT_APP_NETWORK_NAME=Sepolia
```

---

## Monitoring & Maintenance

### Backend Monitoring
- Setup error tracking (Sentry)
- Monitor API response times
- Track database performance
- Setup uptime monitoring

### Frontend Monitoring
- Setup error tracking
- Monitor page load times
- Track user interactions
- Setup performance monitoring

### Smart Contract Monitoring
- Monitor transaction failures
- Track gas usage
- Monitor contract balance
- Setup event logging

---

## Troubleshooting

### Backend Issues
**Problem**: Backend not connecting to blockchain
- Check RPC URL is correct
- Verify contract address exists
- Check network ID matches

**Problem**: CORS errors
- Add frontend URL to CORS whitelist
- Verify headers are set correctly

### Frontend Issues
**Problem**: MetaMask not connecting
- Check network is added to MetaMask
- Verify contract address is correct
- Check RPC endpoint is accessible

**Problem**: QR codes not scanning
- Verify QR generation library is loaded
- Check camera permissions
- Test with different QR codes

### Smart Contract Issues
**Problem**: Transaction failures
- Check gas limit is sufficient
- Verify account has enough balance
- Check contract state

---

## Security Considerations

1. **Private Keys**: Never commit private keys to GitHub
2. **API Keys**: Use environment variables for all secrets
3. **HTTPS**: Always use HTTPS in production
4. **CORS**: Restrict CORS to specific domains
5. **Rate Limiting**: Implement rate limiting on backend
6. **Input Validation**: Validate all user inputs
7. **Contract Audit**: Get smart contract audited before mainnet

---

## Cost Estimation

### Monthly Costs (Approximate)
- **Heroku**: $7-50/month
- **AWS EC2**: $5-20/month
- **Vercel/Netlify**: Free-$20/month
- **Infura**: Free-$100/month
- **Domain**: $10-15/year
- **SSL Certificate**: Free (Let's Encrypt)

---

## Support & Resources

- Truffle Docs: https://trufflesuite.com/docs/
- Infura Docs: https://docs.infura.io/
- Heroku Docs: https://devcenter.heroku.com/
- AWS Docs: https://docs.aws.amazon.com/
- Ethereum Docs: https://ethereum.org/en/developers/

---

## Next Steps

1. Choose deployment platform
2. Setup accounts and credentials
3. Deploy smart contract to testnet
4. Deploy backend
5. Deploy frontend
6. Test complete flow
7. Monitor and maintain

Good luck with your deployment! 🚀
