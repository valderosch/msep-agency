const Router = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const adsController = require('../controllers/adsController');

const router = new Router();

router.post('/subscribe/new', authMiddleware,  adsController.makeNewSubscription);
router.delete('/subscribe/delete', authMiddleware, adsController.deleteSubscription);
router.post('/calculate', authMiddleware,);

module.exports = router;