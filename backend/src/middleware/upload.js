const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const MAX_FILE_SIZE_MB = 20;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; // 20 MB

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// --- Multer disk storage ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'car-' + uniqueSuffix + ext);
  },
});

// --- File type filter ---
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/avif',
  ];
  const allowedExts = /\.(jpeg|jpg|png|webp|avif)$/i;

  const extOk = allowedExts.test(path.extname(file.originalname));
  const mimeOk = allowedMimes.includes(file.mimetype);

  if (extOk && mimeOk) {
    return cb(null, true);
  }

  const err = new Error('Only image files (JPEG, PNG, WEBP, AVIF) are allowed');
  err.code = 'INVALID_FILE_TYPE';
  cb(err);
};

// --- Multer instance: 20 MB per file, up to 15 files ---
const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES,
    files: 15,
  },
  fileFilter,
});

// -------------------------------------------------------------------
// Sharp image optimizer — called after multer saves the file to disk.
// Compresses the image at 85% quality while keeping original dimensions.
// Only replaces the original if the optimized version is smaller.
// Falls back gracefully if Sharp fails (original file is preserved).
// -------------------------------------------------------------------
const optimizeImage = async (filePath) => {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const tempPath = filePath + '.tmp';

    let pipeline = sharp(filePath).rotate(); // auto-orient from EXIF

    if (ext === '.png') {
      pipeline = pipeline.png({ quality: 85, compressionLevel: 8 });
    } else if (ext === '.webp') {
      pipeline = pipeline.webp({ quality: 85 });
    } else if (ext === '.avif') {
      pipeline = pipeline.avif({ quality: 80 });
    } else {
      // JPEG / JPG
      pipeline = pipeline.jpeg({ quality: 85, progressive: true });
    }

    await pipeline.toFile(tempPath);

    const originalSize = fs.statSync(filePath).size;
    const optimizedSize = fs.statSync(tempPath).size;

    if (optimizedSize < originalSize) {
      fs.renameSync(tempPath, filePath);
      console.log(
        `[Upload] Optimized ${path.basename(filePath)}: ` +
        `${(originalSize / 1024 / 1024).toFixed(2)} MB → ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`
      );
    } else {
      fs.unlinkSync(tempPath);
      console.log(`[Upload] Kept original ${path.basename(filePath)} (already optimal)`);
    }
  } catch (err) {
    // Sharp failed — original file is still on disk so upload still works
    console.warn(`[Upload] Sharp optimization skipped for ${filePath}: ${err.message}`);
  }
};

// -------------------------------------------------------------------
// Upload error handler middleware
// Must be placed AFTER upload.array() in the route chain.
// Converts Multer errors into clean JSON responses and cleans up files.
// -------------------------------------------------------------------
const handleUploadError = (err, req, res, next) => {
  if (!err) return next();

  // Clean up any partially-saved files on error
  const filesToClean = [
    ...(req.files || []),
    ...(req.file ? [req.file] : []),
  ];
  filesToClean.forEach((f) => {
    try { fs.unlinkSync(f.path); } catch (_) {}
  });

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      success: false,
      message: `File too large. Maximum allowed size is ${MAX_FILE_SIZE_MB} MB per image.`,
    });
  }
  if (err.code === 'LIMIT_FILE_COUNT') {
    return res.status(400).json({
      success: false,
      message: 'Too many files. Maximum 15 images per upload.',
    });
  }
  if (err.code === 'INVALID_FILE_TYPE') {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      success: false,
      message: 'Unexpected upload field. Expected field name: "images".',
    });
  }

  return res.status(400).json({
    success: false,
    message: err.message || 'File upload error',
  });
};

module.exports = { upload, optimizeImage, handleUploadError, MAX_FILE_SIZE_MB };
