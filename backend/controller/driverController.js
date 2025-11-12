const { Order, User } = require('../models');

exports.getDriverOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { driverId: req.driver.id },
      include: [
        { model: User, as: 'user', attributes: ['name', 'email', 'phone'] },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

exports.markOrderDelivered = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.orderId);

    if (!order || order.driverId !== req.driver.id)
      return res.status(403).json({ error: 'Not authorized' });

    order.status = 'Delivered';
    order.deliveredAt = new Date();
    await order.save();

    res.json({ message: 'Order marked as delivered' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};
