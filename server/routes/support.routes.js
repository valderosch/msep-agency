const Router = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const supportController = require('../controllers/supportController');

const router = new Router();

router.post('/ticket/new', authMiddleware, supportController.openNewTicket);
router.delete('/ticket/delete', authMiddleware, supportController.closeTicket);

module.exports = router;
