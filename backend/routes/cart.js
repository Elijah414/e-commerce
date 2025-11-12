
const express = require('express');
const router = express.Router();
const { Cart, CartItem, Product } = require('../models');
const { authenticateToken } = require('../middleware/authMiddleware');


router.get('/cart', authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { UserId: req.user.id },
      include: {
        model: CartItem,
        include: Product,
      },
    });

    if (!cart) return res.json([]);

    res.json(cart.CartItems);
  } catch (err) {
    console.error('Cart fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

module.exports = router;
