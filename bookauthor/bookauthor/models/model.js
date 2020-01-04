const mongoose=require("mongoose")
const schema=mongoose.Schema;

let authore=new schema({
    authorename:{
        type:String,
        default:""
    },
    bookname:{
        type:String,
        default:''
    },
    image:{
        type:String,
        default:""
    }
})
mongoose.model("authoretable",authore)