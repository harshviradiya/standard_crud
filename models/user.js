const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        require: true,
        minlength: 3,
    },
    lastName: {
        type: String,
        require: true,
        minlength: 3,
    },
    email: {
        type: String,
        require: true,
        unique: [true, "email-id already present"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("your e-mail is invalid");
            }
        },
    },
    password: {
        type: String,
        require: true,
    },
    birth: {
        type: Date,
    },
    image: {
        type: String,
    },

});
module.exports = mongoose.model("user", userSchema);
