const express = require("express");
const router = express.Router();
const User = require("../../models/user")

router.get("/list", async (req, res) => {
    try {
        const alluser = await User.find({ id: !id })
        return res.status(200).json({ success: true, msg: "Data get done.", data: alluser });
    } catch (error) {
        return res.status(400).json({ success: false, msg: error.message });
    }

});

router.get("/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findById(_id)
        return res.status(200).json({ success: true, msg: "Data get done.", data: user });
    } catch (error) {
        return res.status(400).json({ success: false, msg: error.message });
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true })
        return res.status(200).json({ success: true, msg: "Data update done.", data: user });
    } catch (error) {
        return res.status(400).json({ success: false, msg: error.message });;
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const delete_data = await User.findByIdAndDelete(_id)
        if (!delete_data) {
            return res.status(400).json({ msg: "user not found" });
        }
        return res.status(200).json({ success: true, msg: "Data delete done.", data: delete_data });
    } catch (error) {
        return res.status(400).json({ success: false, msg: error.message });
    }
})


module.exports = router;