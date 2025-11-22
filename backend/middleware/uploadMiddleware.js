    const multer = require('multer');
    const path = require('path');
    
    // Configure multer for temporary file storage
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Make sure this 'uploads' directory exists
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
    });
    
    // Initialize upload middleware
    const upload = multer({ 
        storage: storage,
        limits: { fileSize: 100 * 1024 * 1024 } // 100 MB file size limit
    });
    
    module.exports = upload;
    

