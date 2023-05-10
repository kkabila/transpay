const express =require("express");
const connectivity=require("./Helpers/databaseConnectivity");
const bodyparser=require("body-parser");
const userRoutes=require("./routes/userRoutes/userRouting");
const accountRoutes=require("./routes/accountManagementRoute/accountRoutes");
const transactionRoutes=require("./routes/transactionRoute/transactionRouting");
const app=express();

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//routes
app.use("/api/users",userRoutes);
app.use("/api/account",accountRoutes);
app.use("/api/transaction",transactionRoutes);


app.listen(6000,()=>{
    console.log("SERVER STARTED ON PORT 6000");
})