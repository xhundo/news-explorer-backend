const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator(v) {
                return validator.isEmail(v);
            },
            message: "Must be a valid email",
        },
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
    email,
    password
) {
    return this.findOne({ email })
        .select("+password")
        .then((user) => {
            if (!user) {
                return Promise.reject(new Error("Invalid user credentials"));
            }
            return bcrypt.compare(password, user.password).then((matched) => {
                if (!matched) {
                    return Promise.reject(
                        new Error("User email or password invalid")
                    );
                }
                return user;
            });
        });
};

module.exports = mongoose.model("user", userSchema);
