const router = require("express").Router();
const userModel = require("../../model/userModel");
const passwordUtil = require("../../Helpers/hash_match_password");
const Validation = require("../../middlewares/userValidation");
const checkCredentials = require("../../Helpers/checkCredentials");
const generateToken = require("../../Helpers/tokenGenerator");
const checkAuth = require("../../middlewares/checkAuthentication");
const uploadProfile = require("../../middlewares/UploadProfilePic");
const uploadCloudinary = require("../../middlewares/cloudinarySetting");
const accountModel=require("../../model/accountModel")

router.post("/signup", Validation.checkEmail, Validation.checkPhoneNumber, async (req, res) => {
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const password = await passwordUtil.hashPassword(req.body.password);
    const balance = req.body.balance;
    const user = new userModel({ firstname, lastname, email, phoneNumber, password, balance })
    try {
        //creating the user
        const data = await user.save();
        //creating the account
        const user_id=data._id;
        const account=new accountModel({user:user_id,balance:0})
        const accountData=account.save();
        res.status(200).json({"message":"successfully saved user"});
    } catch (error) {
        res.status(400).json({ "message": error });
    }

})


router.post("/login", async (req, res) => {
    const phoneNumber = req.body.phone;
    const password = req.body.password;
    const isMatching = await checkCredentials(phoneNumber, password);
    if (isMatching == true) {
        const token = await generateToken(phoneNumber);
        res.status(200).json({ "message": "logged in successful", "token": token })
    }
    else if (isMatching == null) {
        res.status(200).json({ "message": "cant find user" })
    }
    else {
        res.status(200).json({ "message": "password not matching phone number" })
    }

})

router.post("/uploadProfile", checkAuth, uploadProfile, async (req, res) => {
    try {
        const phone = req.user;
        const data = await userModel.findOne({ phoneNumber: phone })
        const result = await uploadCloudinary(req.file.path);
        data.profilePic.path = result.secure_url;
        const upload = await userModel.findOneAndUpdate(data._id, data);
        res.json({ "message": "saved image successfully" });
    } catch (error) {
        res.status(200).json({ "message": error.message })
    }
})

router.get("/getidentification", checkAuth, async (req, res) => {
    try {
        const phone = req.user;
        const user = await userModel.findOne({ phoneNumber: phone })
        res.status(200).json({ "id": user._id });
    }
    catch (error) {
        res.status(200).json({ "message": "can not find user" })
    }
})

router.get("/getprofilepicture", checkAuth, async (req, res) => {
    try {
        const phone = req.user;
        const user = await userModel.findOne({ phoneNumber: phone })
        res.status(200).sendFile(user.profilePic.path);
    }
    catch (error) {
        res.status(200).json({ "message": "can not profile oicture" })
    }
})

module.exports = router;