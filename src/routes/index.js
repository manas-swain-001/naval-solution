const express = require('express');
const authRoutes = require('./auth.routes');

const router = express.Router();

// Mount authentication routes under /auth
router.use('/auth', authRoutes);

module.exports = router;
