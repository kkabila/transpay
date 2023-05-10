const userModel = require("../model/userModel");

const checkEmail = async (req, res, next) => {
    const userEmail = req.body.email;
    const user = await userModel.findOne({ email: userEmail });
    if (user == null) {
        next();
    }
    else {
        res.status(400).json({ message: "email already exists" })
    }
}

const checkPhoneNumber = async (req, res, next) => {
    const phone = req.body.phoneNumber;
    const user = await userModel.findOne({ phoneNumber: phone });
    if (user == null) {
        next();
    }
    else {
        res.status(400).json({ message: "phone number exists" })
    }
}

module.exports = { checkEmail, checkPhoneNumber };