import { Router } from 'express';
const router = Router();
import { Product } from '../'; 

// GET /products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll(); // fetch all products
    res.json(products);
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

 
export default router;
