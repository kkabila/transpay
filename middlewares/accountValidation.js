const accountModel = require("../model/accountModel");
const userModel = require("../model/userModel");

const validateTopup = async (req, res, next) => {
    const amount = req.body.amount;
    const phone = req.user;
    const accountuser = await userModel.findOne({ phoneNumber: phone });
    const account = await accountModel.findOne({ user: accountuser._id });
    const newAmount = account.balance + amount;
    if (amount < 0) {
        res.status(200).json({ "message": "amount can not be negative" });
    }
    else if (newAmount >= 5000000) {
        res.status(200).json({ "message": "balance can not exceed 5 millions" });
    }
    else {
        req.amount = newAmount;
        next();
    }
}

const validateWithdrawal = async (req, res, next) => {
    const amount = req.body.amount;
    const phone = req.user;
    const accountuser = await userModel.findOne({ phoneNumber: phone });
    const account = await accountModel.findOne({ user: accountuser._id });
    const newAmount = account.balance - amount;
    if (amount < 0) {
        res.status(200).json({ "message": "amount can not be negative" });
    }
    else if (amount > account.balance) {
        res.status(200).json({ "message": "not enough funds" });
    }
    else if (amount == account.balance) {
        res.status(200).json({ "message": "you can not leave balance to 0" })
    }
    else {
        req.amount = newAmount;
        next();
    }
}

const validateSendMoney = async (req, res, next) => {
    const amount = req.body.amount;
    const phone = req.user;
    const accountuser = await userModel.findOne({ phoneNumber: phone });
    const account = await accountModel.findOne({ user: accountuser._id });
    const newAmount = account.balance - amount;
    if (amount < 0) {
        res.status(200).json({ "message": "amount to send can not be negative" });
    }
    else if (amount > account.balance) {
        res.status(200).json({ "message": "not enough funds" });
    }
    else if (amount == account.balance) {
        res.status(200).json({ "message": "you can not leave your balance to 0" })
    }
    else if (phone == req.body.phone) {
        res.status(200).json({ "message": "you cant send yourself money" })
    }

    else {
        req.amount = newAmount;
        next();
    }
}

const validateUserExistance = async (req, res, next) => {
    const phone = req.body.phone;
    const accountuser = await userModel.findOne({ phoneNumber: phone });
    if (accountuser == null) {
        res.status(200).json({ "message": "receiver Phone Number doesnt exist" });
    }
    else {
        next();
    }
}


module.exports = { validateTopup, validateWithdrawal, validateSendMoney, validateUserExistance };