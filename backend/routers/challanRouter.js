const express = require('express');
const router = express.Router();
const challanController = require('../controllers/challanController');

router.post('/add', challanController.createChallan);
router.get('/view', challanController.getAllChallans);
router.get('/view/:id', challanController.getChallanById);
router.put('/:id', challanController.updateChallan);
router.delete('/:id', challanController.deleteChallan);

module.exports = router;
