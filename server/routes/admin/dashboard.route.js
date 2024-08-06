const express = require('express');
const { authenticateToken, isAdmin } = require('../../utils/isAuth');
const dashboardController = require('../../controllers/dashboard.controller');

const router = express.Router();

// api/dashboard/

router.get('/overview', authenticateToken, isAdmin, dashboardController.getOverview);

module.exports = router;