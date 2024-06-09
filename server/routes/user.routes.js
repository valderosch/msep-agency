const Router = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

const router = new Router();

router.patch('/edit', authMiddleware, userController.editUser);

module.exports = router;
