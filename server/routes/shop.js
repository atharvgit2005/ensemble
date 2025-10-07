const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  const jwt = require('jsonwebtoken');
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// GET /api/shop/products
router.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({ products });
  } catch (error) {
    console.error('Products error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/shop/orders
router.post('/orders', authenticateToken, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items are required' });
    }

    if (!shippingAddress || !shippingAddress.name || !shippingAddress.address) {
      return res.status(400).json({ message: 'Shipping address is required' });
    }

    // Calculate total amount
    let totalAmount = 0;
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId }
      });

      if (!product) {
        return res.status(400).json({ message: `Product ${item.productId} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}` 
        });
      }

      totalAmount += product.price * item.quantity;
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: req.user.userId,
        totalAmount,
        shippingAddress,
        items,
        status: 'PENDING'
      }
    });

    // Update product stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });
    }

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/shop/orders
router.get('/orders', authenticateToken, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ orders });
  } catch (error) {
    console.error('Orders error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

