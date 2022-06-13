const model = require('../model');
var createError = require('http-errors')
const { compareSync } = require("bcryptjs");
const {
    giveToken, hashData
} = require("../helpers/helpers");

const findByEmail = async (email) => {
    const exists = await model.User.findOne({ email });
    return exists;
}

const registerUser = async (data) => {
    try {
        let {
            email, password, firstName, lastName, contactNumber
        } = data;

        const exists = await findByEmail(email);
        if (exists) {
            throw createError(400, "Email already exists");
        }

        password = hashData(password);
        const user = await model.User.create({
            email, password, firstName, lastName, contactNumber
        })

        const token = giveToken({
            userId: user._id
        });

        return {
            jwt: token,
        };

    } catch (err) {
        return Promise.reject(err);
    }
}

const loginUser = async (email, password) => {
    try {
        const user = await model.User.findOne({ email });
        if (!user) {
            return createError(500, "User does not exist");
        }
        if (!compareSync(password, user.password)) {
            throw createError(401, "Wrong Password")
        }

        const token = giveToken({
            userId: user._id
        });

        return {
            jwt: token
        };
    } catch (err) {
        Promise.reject(err);
    }
}


module.exports = {
    registerUser,
    loginUser,
    findByEmail,
}