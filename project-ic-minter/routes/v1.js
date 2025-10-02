const express = require('express');
const validate = require('../middlewares/validate');
const validation = require('../validation');
const controller = require('../controller');

const router = express.Router();
router
    .route('/mintRequest')
    .post(validate(validation.requestMinting), controller.requestMinting);

router
    .route('/mintStatus')
    .get(validate(validation.fetchMintStatus), controller.fetchMintStatus);

module.exports = router;