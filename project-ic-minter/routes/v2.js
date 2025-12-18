const express = require('express');
const validate = require('../middlewares/validate');
const uplaodBackerLogo = require('../middlewares/uploadBackerLogo');
const parseJSONFields = require('../middlewares/parseJSONFields');
const validation = require('../validation');
const controller = require('../controller');

const router = express.Router();
router
    .route('/mintRequest')
    .post(uplaodBackerLogo, parseJSONFields, validate(validation.requestMintingV2), controller.requestMintingV2);

module.exports = router;