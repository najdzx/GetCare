const express = require('express');
const router = express.Router();
const symptomChecker = require('../routes/symptomChecker');

router.use('/', symptomChecker);

module.exports = router;
