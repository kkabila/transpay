const router = require("express").Router();
const accountModel = require("../../model/accountModel");
const userModel = require("../../model/userModel");
const checkAuth = require("../../middlewares/checkAuthentication");
const checkAccount = require("../../middlewares/accountValidation");
const accountHistoryModel = require("../../model/accountHistory");
const transactionHelper = require("../../Helpers/TransactionHistoryHelper");

router.post("/topup", checkAuth, checkAccount.validateTopup, async (req, res) => {
    try {
        const phone = req.user;
        const accountuser = await userModel.findOne({ phoneNumber: phone });
        const account = await accountModel.findOne({ user: accountuser._id });
        account.balance = req.amount;
        const data = await accountModel.findOneAndUpdate(account._id, account);
        //saving the history after we finish doing our operation
        const historyData = {
            user: accountuser._id,
            operation: "TOP UP",
            operationDoneAt: transactionHelper(),
            amount: req.body.amount
        }
        const history = new accountHistoryModel(historyData);
        const hData = await history.save()
        //finished saving history
        const newAmount = await accountModel.findById(account._id);
        res.status(200).json({ "message": "topped up successfuly", "user names": accountuser.firstname + " " + accountuser.lastname, "balance": newAmount.balance });
    } catch (error) {
        res.status(400).json({ "message": error.message });
    }
});

router.get("/getaccountinfo", checkAuth, async (req, res) => {
    try {
        const phone = req.user;
        const accountuser = await userModel.findOne({ phoneNumber: phone });
        const account = await accountModel.findOne({ user: accountuser._id });
        res.status(200).json({ "balance": account.balance });
    }
    catch (error) {
        res.status(400).json(error.message);
    }
})


router.post("/withdraw", checkAuth, checkAccount.validateWithdrawal, async (req, res) => {
    try {
        const phone = req.user;
        const accountuser = await userModel.findOne({ phoneNumber: phone });
        const account = await accountModel.findOne({ user: accountuser._id });
        account.balance = req.amount;
        const data = await accountModel.findOneAndUpdate(account._id, account);
        //saving the history after we finish doing our operation
        const historyData = {
            user: accountuser._id,
            operation: "WITHDRAWING",
            operationDoneAt: transactionHelper(),
            amount: req.body.amount
        }
        const history = new accountHistoryModel(historyData);
        const hData = await history.save()
        //finished saving history
        const newAmount = await accountModel.findById(account._id);
        res.status(200).json({ "message": "withdrawal  successfull", "user names": accountuser.firstname + " " + accountuser.lastname, "balance": newAmount.balance });
    } catch (error) {
        res.status(400).json({ "message": error.message });
    }
});



module.exports = router;