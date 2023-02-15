const {Router} = require('express');
const router = Router();
const {process,feedback} = require('../controllers/checkoutController');
router.post('/process',process)
router.get('/feedback',feedback)
module.exports = router