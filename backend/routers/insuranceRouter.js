
const express = require('express');
const router = express.Router();
const insuranceController = require('../controllers/insuranceController');

router.post('/insurances', insuranceController.createInsurance);
router.get('/insurances', insuranceController.getAllInsurances);
router.get('/insurances/:id', insuranceController.getInsuranceById);
router.put('/insurances/:id', insuranceController.updateInsurance);
router.delete('/insurances/:id', insuranceController.deleteInsurance);

module.exports = router;
