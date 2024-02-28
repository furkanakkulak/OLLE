const express = require('express');
const router = express.Router();
const { getSystemInfo } = require('../controllers/systemInfoController');

router.post('/', getSystemInfo);

module.exports = router;
