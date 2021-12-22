const express = require("express");
const { User } = require("../../models/index");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { upload } = require("../../middelwares")
const saltRounds = 10;

router.post("/signup", upload.single("image"), async (req, res, next) => {
    var fullUrl = req.protocol + "://" + req.get("host");
    const { firstName, lastName, email, password, conformpassword, birth, image } = req.body;

    try {
        if (!password || !conformpassword || !email || !firstName || !lastName || !birth)
            return res.status(400).json({ msg: "enter all fields value" });

        if (password.length < 5) {
            return res.status(400).json({ msg: "Password is too small, try harder" });
        }
        if (password != conformpassword)
            return res.status(400).json({ msg: "Password don't match" });

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res
                .status(400)
                .json({ msg: "email exists, think of something unique" });

        let image = "";

        if (req.file && req.file.fieldname == "image" && req.file.filename) {
            image = req.file.filename;
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: passwordHash,
            firstName,
            lastName,
            image,
            birth
        });

        const response = await newUser.save();
        const Id = newUser._id
        const user_res = await User.findById({ _id: Id })

        user_res.image = user_res.image && fs.existsSync(`./uploads/${user_res.image}`)
            ? `${fullUrl}/uploads/${user_res.image}`
            : "";

        res.status(200).json({ success: true, msg: "Register Sucessfull ", data: user_res });

    } catch (error) {
        return res.status(400).json({ success: false, msg: error.message });
    }
})

router.get("/login", async (req, res, next) => {
    const { email, password } = req.body
    console.log("reqqqqq", req.body)
    try {
        if (!email || !password)
            return res
                .status(400)
                .json({ msg: "enter all fields value" });

        const user = await User.findOne({ email });
        console.log("---", user);
        if (!user) return res.status(400).json({ msg: "User doesn't exist " });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Invalid Credentials " });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({

            success: true,
            token,
            user: {
                id: user._id,
                email: user.email,
            },
            message: "Login Successfully ",
        });
    } catch (error) {
        return res.status(400).json({ success: false, msg: error.message });
    }
})
module.exports = router;