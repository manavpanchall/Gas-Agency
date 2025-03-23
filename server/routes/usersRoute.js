const express = require("express")
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;

    if (password !== confirmpassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    const newUser = new User({ name, email, password });

    try {
        const user = await newUser.save();
        res.send("User Registered Successfully");
    } catch (error) {
        return res.status(400).json({ error });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email and password
        const user = await User.findOne({ email: email, password: password });

        if (user) {
            const temp = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin, // Ensure this field is returned
                _id: user._id,
            };

            res.send(temp); // Send user data to the frontend
        } else {
            return res.status(400).json({ message: 'Login Failed' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});


router.get("/getallusers", async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)

    } catch (error) {
        return res.status(400).json({ error });

    }
});




router.get('/api/users/getuser/:userid', async (req, res) => {
    try {
        const user = await User.findById(req.params.userid, 'name email');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Failed to fetch user', error: error.message });
    }
});

module.exports = router;