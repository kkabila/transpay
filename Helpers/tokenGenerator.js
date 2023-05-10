require("dotenv").config();
const jwt = require("jsonwebtoken");
const generateToken = async (phone) => {
    const token = await jwt.sign({ phone },
        process.env.TOKEN_SECRET,
        {
            expiresIn: "5m"
        }

    )
    return token;
}

module.exports = generateToken;