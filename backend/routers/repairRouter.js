
const express = require('express');
const router = express.Router();
const repairController = require('../controllers/repairController');

router.post('/repairs', repairController.createRepair);
router.get('/repairs', repairController.getAllRepairs);
router.get('/repairs/:id', repairController.getRepairById);
router.put('/repairs/:id', repairController.updateRepair);
router.delete('/repairs/:id', repairController.deleteRepair);

module.exports = router;
