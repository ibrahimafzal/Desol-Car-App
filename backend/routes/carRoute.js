const express = require('express');
const router = express.Router();
const {
  createCar,
  getCars,
} = require('../controllers/carController');

router.post('/create', createCar);
router.get('/', getCars);

module.exports = router;
