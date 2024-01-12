/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the AWS API page');
});

module.exports = router;
