const express = require('express');
const router = express.Router();
const { createCv, getCvs, getCv, updateCv } = require('../controllers/cv');

router.post('/', createCv);
router.get('/', getCvs);
router.get('/:id', getCv);
router.put('/:id', updateCv);

module.exports = router;