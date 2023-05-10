require('dotenv').config();
const mongoose = require("mongoose");
const db_url = process.env.DATABASE_URL;
mongoose.connect(db_url, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", error => {
    console.log(error);
})

module.exports = db;