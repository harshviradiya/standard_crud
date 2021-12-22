const jwt = require('jsonwebtoken')
const multer = require("multer");
const path = require("path");

const jwtVerify = (req, res, next) => {
    //    const token= jwt.sign({ id: user._id },process.env.JWT_SECRET)
    const token = req.header('x-auth-token')
    console.log("aaa", token);
    try {
        if (!token)
            return res.status(401)
                .json({ msg: 'No authentication token, access denied.' })

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        console.log("verified token", verified)
        if (!verified)
            return res.status(401)
                .json({ msg: 'Token verification failed, access denied.' })
        req.user = verified.id
        next()
    } catch (error) {
        res.status(400).json({ msg: "invalid token" });
    }
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext);
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/png"
        ) {
            callback(null, true)
        }
        else {
            console.log("only jpg and png supported");
            callback(null, false)
        }
    }
})
module.exports = { jwtVerify, upload }