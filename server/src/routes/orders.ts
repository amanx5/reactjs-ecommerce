import express from 'express';

const router = express.Router();

// GET all orders
router.get('/', (req, res) => {
  res.json({ 
    message: 'Get all orders',
    orders: []
  });
});

// GET order by ID
router.get('/:id', (req, res) => {
  res.json({ 
    message: `Get order ${req.params.id}`,
    order: null
  });
});

// POST create order
router.post('/', (req, res) => {
  res.json({ 
    message: 'Order created',
    orderId: null
  });
});

export default router;
