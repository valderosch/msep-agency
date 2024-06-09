const Router = require("express");
const {check} = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

const router = new Router();
router.post('/registration',
    [
        check('email', 'Incorrect email format.').isEmail(),
        check('password', 'Password must have at least 3 characters and shorter than 15').isLength({min: 3, max: 15})
    ], authController.registerNewAccount);
router.post('/login', authController.loginToAccount);
router.get('/auth', authMiddleware, authController.authoriseAccount);

module.exports = router;
