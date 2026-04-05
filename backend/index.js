const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Load blockchain config
const { web3, contractInstance } = require('./config/blockchain');

console.log('Backend initialized with blockchain config');

// Middleware to inject web3 and contract into req
app.use((req, res, next) => {
  req.web3 = web3;
  req.contract = contractInstance;
  next();
});

const productRoutes = require('./routes/productRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const manufacturerRoutes = require('./routes/manufacturerRoutes');

app.use('/api/product', productRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/manufacturer', manufacturerRoutes);

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fake Product API',
      version: '1.0.0',
      description: 'API documentation for Fake Product Identification using Blockchain',
    },
  },
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/', (req, res) => {
  res.send('Fake Product Backend is running');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
