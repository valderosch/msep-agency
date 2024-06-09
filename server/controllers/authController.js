const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

class AuthController {
    async registerNewAccount(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Bad request.", errors
                });
            }

            const { email, password } = req.body;
            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(400).json({
                    message: `User with email (${email}) already has an account`
                });
            }
            const hashedPassword = await bcrypt.hash(password, 5);
            const user = new User({ email, password: hashedPassword });
            await user.save();
            return res.json({
                message: "New user was created!"
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: "Error while [register] account"
            });
        }
    }

    async loginToAccount(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    message: "User with this email not found"
                });
            }
            const isValidPassword = bcrypt.compareSync(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({
                    message: "Incorrect password"
                });
            }
            const token = jwt.sign({ id: user.id }, config.get("secretKey"), { expiresIn: "1h" });
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: "Error while [login] account"
            });
        }
    }

    async authoriseAccount(req, res) {
        try {
            const user = await User.findById(req.user.id);
            const token = jwt.sign({ id: user.id }, config.get("secretKey"), { expiresIn: "1h" });
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: "Error while [authorize] account"
            });
        }
    }
}

module.exports = new AuthController();
