const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const { protect } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');

// Public routes
router.get('/', carController.getCars);
router.get('/:id', carController.getCarById);

// Protected Admin routes
// Order: protect → multer → error handler → controller
router.post(
  '/',
  protect,
  upload.array('images', 15),
  handleUploadError,
  carController.createCar
);

router.put(
  '/:id',
  protect,
  upload.array('images', 15),
  handleUploadError,
  carController.updateCar
);

router.delete('/:id', protect, carController.deleteCar);

router.post(
  '/upload-images',
  protect,
  upload.array('images', 15),
  handleUploadError,
  carController.uploadImages
);

module.exports = router;
