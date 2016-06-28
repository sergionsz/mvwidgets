const express = require('express');
const fs = require('fs');
// const JS = require('JSONStream');
const router = express.Router();

/* GET gallery JSON data. */
router.get('/*', (req, res) => {
  const logger = req.app.get('logger');
  const moduleName = req.path.trim('/');
  const dataFile = `./data/${moduleName}-data.json`;
  const dataRS = fs.createReadStream(dataFile);
  res.set('Content-Type', 'application/json');
  // const parser = JS.parse('*');
  dataRS.on('open', () => dataRS.pipe(res));
  dataRS.on('error', err => logger.error(err));
});

module.exports = router;
