const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const whitelist = ['image/png', 'image/jpg', 'image/jpeg'];

aws.config.update({
    secretAccessKey: process.env.S3_SECRET,
    accessKeyId: process.env.S3_ACCESS_KEY,
    region: process.env.S3_REGION,
});

const s3 = new aws.S3();

const uploadAws = multer({
    fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
        const error = new Error('File type is not allowed');
        error.statusCode = 400 
        return cb(error);
    }
    cb(null, true);
    },
    storage: multerS3({
    // acl: 'public-read',
    s3,
    bucket: process.env.S3_BUCKET,
    key: function (req, file, cb) {
        cb(null, `backer_logos/${Date.now()}` + file.originalname);
    },
    }),
    limits: { fileSize: 5000000 },
});

const upload = uploadAws.single('backerLogo');

const uploadBackerLogo = (req, res, next) => {
        upload(req, res, function (err) {
        if (err) {
            res.status(400).send({ code: '400', error: err.message });
            return
        }
        return next();
        })
};

module.exports = uploadBackerLogo;