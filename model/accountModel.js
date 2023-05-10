const {Schema,model}=require("mongoose");

const accountSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    balance:Number
},{timestamps:true});

const accountModel=model('accounts',accountSchema);

module.exports=accountModel;