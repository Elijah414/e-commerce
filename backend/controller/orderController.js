const { Order, OrderItem, Product, User, Driver, Packer } = require('../models');

// ===================== ADMIN =====================
exports.getAllOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const where = status ? { status } : {};

    const orders = await Order.findAll({
      where,
      include: [
        {
          model: OrderItem,
          as: 'OrderItems',
          include: [{ model: Product, as: 'Product', attributes: ['id', 'name', 'price', 'image'] }],
        },
        { model: User, as: 'user', attributes: ['id', 'name', 'email', 'phone'] },
        { model: Driver, as: 'driver', attributes: ['id', 'name', 'email'] },
        { model: Packer, as: 'packer', attributes: ['id', 'name', 'email'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// ===================== DRIVER =====================
exports.getDriverOrders = async (req, res) => {
  try {
    const driverId = req.driver.id;

    const orders = await Order.findAll({
      where: { driverId },
      include: [
        {
          model: OrderItem,
          as: 'OrderItems',
          include: [{ model: Product, as: 'Product', attributes: ['id', 'name', 'price', 'image'] }],
        },
        { model: User, as: 'user', attributes: ['id', 'name', 'email', 'phone', 'address'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching driver orders:', error);
    res.status(500).json({ error: 'Failed to fetch driver orders' });
  }
};

// ===================== PACKER =====================
exports.getPackerOrders = async (req, res) => {
  try {
    const packerId = req.packer.id;

    const orders = await Order.findAll({
      where: { packerId },
      include: [
        {
          model: OrderItem,
          as: 'OrderItems',
          include: [{ model: Product, as: 'Product', attributes: ['id', 'name', 'price', 'image'] }],
        },
        { model: User, as: 'user', attributes: ['id', 'name', 'email', 'phone', 'address'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching packer orders:', error);
    res.status(500).json({ error: 'Failed to fetch packer orders' });
  }
};

// ===================== CREATE ORDER =====================
exports.createOrder = async (req, res) => {
  const { customer_name, address, items, payment_method, UserId } = req.body;

  try {
    const order = await Order.create({
      customer_name,
      address,
      status: 'Pending',
      payment_method: payment_method || 'Cash on Delivery',
      UserId: UserId || null,
    });

    const orderItems = items.map((item) => ({
      OrderId: order.id, 
      ProductId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    await OrderItem.bulkCreate(orderItems);

    res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
};

// ===================== UPDATE ORDER STATUS =====================
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    order.status = status;
    if (status === 'Delivered') order.deliveredAt = new Date();

    await order.save();
    res.json({ message: `Order status updated to ${status}` });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
};
