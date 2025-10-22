require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./authControllers/authRoutes');
const cartRoutes = require('./routes/cart');
const adminRoutes = require('./routes/adminRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));

app.use(express.json());

// Routes
app.use('/products', productRoutes);         
app.use('/orders', orderRoutes);             
app.use('/cart', cartRoutes);              
app.use('/auth', authRoutes);               


app.use('/admin', adminRoutes);
app.use("/categories", require("./routes/categoryRoutes"));
app.use("/products", require("./routes/productRoutes"));



app.get('/', (req, res) => res.send('Backend is working!'));



sequelize.sync({ alter: true })
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Sync error:', err));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
