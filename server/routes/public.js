const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/public/members
router.get('/members', async (req, res) => {
  try {
    const members = await prisma.memberProfile.findMany({
      orderBy: [
        { club: 'asc' },
        { role: 'asc' }
      ]
    });

    res.json({ members });
  } catch (error) {
    console.error('Members error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

