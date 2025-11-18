const express = require('express');
const validate = require('../middlewares/validate');
const validation = require('../validation');
const controller = require('../controller');

const router = express.Router();
router
    .route('/mintRequest')
    .post(validate(validation.requestMintingV2), controller.requestMintingV2);

module.exports = router;