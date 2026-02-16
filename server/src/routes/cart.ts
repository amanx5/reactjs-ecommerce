import express from 'express';

const router = express.Router();

// GET cart
router.get('/', (req, res) => {
  res.json({ 
    message: 'Get cart',
    cart: { items: [] }
  });
});

// POST add to cart
router.post('/add', (req, res) => {
  res.json({ message: 'Item added to cart' });
});

// DELETE remove from cart
router.delete('/:itemId', (req, res) => {
  res.json({ message: 'Item removed from cart' });
});

export default router;
