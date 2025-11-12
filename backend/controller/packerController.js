const { Order } = require('../models');

exports.getPackerOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { packerId: req.packer.id, status: 'Pending' },
      order: [['createdAt', 'ASC']],
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

exports.markOrderPackaged = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.orderId);

    if (!order || order.packerId !== req.packer.id)
      return res.status(403).json({ error: 'Not authorized' });

    order.status = 'Packaged';
    await order.save();

    res.json({ message: 'Order marked as packaged' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};
