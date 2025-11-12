const jwt = require('jsonwebtoken');

//  General Auth (for customers)
exports.authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains user.id, email, etc.
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

//  Admin Auth
exports.verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Admin token missing' });

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_SECRET);
    req.admin = decoded; // contains admin.id or email
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired admin token' });
  }
};

//  Driver Auth
exports.verifyDriverToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Driver token missing' });

  try {
    const decoded = jwt.verify(token, process.env.DRIVER_SECRET);
    req.driver = decoded; // contains driver.id, email, role
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired driver token' });
  }
};

//  Packer Auth
exports.verifyPackerToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Packer token missing' });

  try {
    const decoded = jwt.verify(token, process.env.PACKER_SECRET);
    req.packer = decoded; // contains packer.id, email, role
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired packer token' });
  }
};
