import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${process.cwd()}/uploads/avatars`);
    },

    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowed = [
            'image/jpeg',
            'image/png',
            'image/jpg',
            'image/webp'
        ];

        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        }

        else {
            cb(new Error('Only image files are allowed (jpeg, png, jpg, webp)'));
        }
    }
})

export default upload;