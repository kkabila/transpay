const {Schema,model}=require("mongoose");

const accountHistory=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    operation:{
        type:String,
        require:true
    },
    operationDoneAt:{
        type:String,
        required:true
    },
    amount:Number,
    receivedBy:{
        default:null,
        type:Schema.Types.ObjectId,
        ref:'user'
    },
},{timestamps:true});

const accountHistoryModel=model('accountHistory',accountHistory);

module.exports=accountHistoryModel;