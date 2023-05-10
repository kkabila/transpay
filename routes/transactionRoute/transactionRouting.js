const router = require("express").Router();
const accountModel = require("../../model/accountModel");
const userModel = require("../../model/userModel");
const checkAuth = require("../../middlewares/checkAuthentication");
const checkAccount = require("../../middlewares/accountValidation");
const transactionHelper = require("../../Helpers/TransactionHistoryHelper");
const accountHistoryModel = require("../../model/accountHistory");


router.post("/sendmoney", checkAuth, checkAccount.validateUserExistance, checkAccount.validateSendMoney, async (req, res) => {
    try {
        //updating sender account amount
        const senderphone = req.user;
        const sender = await userModel.findOne({ phoneNumber: senderphone });
        const senderAccount = await accountModel.findOne({ user: sender._id });
        senderAccount.balance = req.amount;
        const senderData = await accountModel.findOneAndUpdate(senderAccount._id, senderAccount);
        //finished updating senders account
        //updating receiver account amount
        const receiverphone = req.body.phone;
        const receiver = await userModel.findOne({ phoneNumber: receiverphone });
        const receiverAccount = await accountModel.findOne({ user: receiver._id });
        //adding to the receiver balance money sent
        receiverAccount.balance = receiverAccount.balance + req.body.amount;
        const receiverData = await accountModel.findOneAndUpdate(receiverAccount._id, receiverAccount);
        //finished updating receivers account
        //messages
        //recording data into the account history
        const historyData = {
            user: sender._id,
            operation: "SENT",
            operationDoneAt: transactionHelper(),
            amount: req.body.amount,
            receivedBy: receiver._id
        }
        const history = new accountHistoryModel(historyData);
        const hData = await history.save()
        //finished updating into the account history
        const responseMessage = {
            "message": "successfully sent money",
            "to": receiver.firstname + " " + receiver.lastname,
            "receiver phone number": receiver.phoneNumber
        }
        res.status(200).json(responseMessage);
    } catch (error) {
        res.status(400).json({ "message": error.message });
    }
});


module.exports = router;