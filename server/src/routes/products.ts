import express from 'express';

const router = express.Router();

// GET all products
router.get('/', (req, res) => {
  res.json({ 
    message: 'Get all products',
    products: []
  });
});

// GET product by ID
router.get('/:id', (req, res) => {
  res.json({ 
    message: `Get product ${req.params.id}`,
    product: null
  });
});

// POST create product (admin)
router.post('/', (req, res) => {
  res.json({ message: 'Create product' });
});

export default router;
