import multer from 'multer';
import path from 'path';

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const photoTypes = /jpeg|jpg|png/;
        const videoTypes = /mp4|mov|avi|mkv/;
        
        // Choose the destination folder based on the file type
        if (photoTypes.test(file.mimetype)) {
            cb(null, 'uploads/photos'); // Store photos in /uploads/photos
        } else if (videoTypes.test(file.mimetype)) {
            cb(null, 'uploads/videos'); // Store videos in /uploads/videos
        } else {
            cb(new Error('Invalid file type'), false); // Invalid file type
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to ensure only images and videos are uploaded
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|mp4|mov|avi|mkv/; // Added video file types
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only images and videos are allowed'));
    }
};

// Initialize multer with the storage configuration and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 50 } // Limit file size to 50MB for videos
});

export default upload;
