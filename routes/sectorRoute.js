const express = require('express');
const { sectorsPostController , sectorsGetController} = require('../controllers/sectorsController');


const router = express.Router();
router.post('/sectors', sectorsPostController)
router.get('/sectors', sectorsGetController)

module.exports = router