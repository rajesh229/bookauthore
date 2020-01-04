const express=require("express")
const bodyparser=require("body-parser")
const app=express()
const mongoose=require("mongoose")
const fs = require('fs');
const path = require('path');
const appconfig=require("./appConfig/appconfig")
const userRout=require("./router/router")
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

//app.get('/favicon.ico', (req, res) => res.status(204));
app.use( function(req, res, next) {

    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
      return res.sendStatus(204);
    }
  
    return next();
  
  });
app.use("",userRout)
app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET,DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

  
mongoose.connection.on("err",function(err){
if(err){
    console.log(err)
}else{
    console.log("connection not ok")
}
})
mongoose.connection.on("open",function(err){
if(err){
    console.log(err)
}else{
    console.log("connection Success!")
}
})
app.listen(appconfig.port,()=>{
    let db=mongoose.connect(appconfig.db.url,{useNewUrlParser:true})
    console.log(appconfig.port)
})


