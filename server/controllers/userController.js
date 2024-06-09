const User = require("../models/user");

class UserController {

    async editUser(req, res) {
        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const { email, password } = req.body;
            if (email) user.email = email;
            if (password) user.password = await bcrypt.hash(password, 5);

            await user.save();
            return res.json(user);
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: "SERVER | Error while [editing] user"
            });
        }
    }
}

module.exports = new UserController();
