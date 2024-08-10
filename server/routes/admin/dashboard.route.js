const express = require('express');
const { authenticateToken, isAdmin } = require('../../utils/isAuth');
const dashboardController = require('../../controllers/dashboard.controller');

const router = express.Router();

// api/dashboard/

router.get('/overview', authenticateToken, isAdmin, dashboardController.getOverview);
router.get('/barchart', authenticateToken, isAdmin, dashboardController.getBarChartData);

module.exports = router;