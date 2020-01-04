const express=require("express")
const router=express.Router()
const mongoose=require("mongoose")
const formidable = require('express-formidable');
const authoredeat=require("../models/model")
const author=mongoose.model("authoretable")
const fs = require('fs');
const path=require("path")
const sharp = require('sharp');

let newName = "";
  let newNameSmall = "";
  let fileOK = true;

  const opts ={
    encoding: 'utf-8',
    keepExtensions: true,
    maxFileSize : 5 * 1024 * 1024,
   // uploadDir:"./public/uploads"
  }
  const events = [
    {
      event: 'fileBegin',
      action: function (req, res, next, name, file) {
        console.log("ecco il file!!");
        console.log(file);
        const fileType = file.type.split('/').pop();
        const fileName = file.name.split('.').shift();
       // console.log(fileName);
        if(file.type.startsWith('image/')){
          fileOK = true;
          let newFileTitle = fileName + new Date().getTime();
          newName= newFileTitle+"."+fileType;
          newNameSmall= newFileTitle+"Small."+fileType;
          file.path = './public/uploads' + newFileTitle + '.' + fileType;
        }else{
          console.log('extention not supported');
          fileOK = false;
        }
      }
    },
    {
      event: 'error',
      action: function (error) {
        console.log("Error");
        fileOK = false;
      }
    }
];

reducePicture = (target, destination) =>{
  sharp(target).resize({ height: 500 }).toFile(destination)
  .then(function() {
      fs.unlinkSync(target);
  })
  .catch(function(err) {
      console.log("Error occured: ", err);
  });
}
//   const events = [
//       {
//         event: 'fileBegin',
//         action: function (req, res, next, name, file) {
//           console.log("ecco il file!!");
//           console.log(file);
//           const fileType = file.type.split('/').pop();
//           const fileName = file.name.split('.').shift();
//           console.log(fileType);
//           if(file.type.startsWith('image/')){
//             fileOK = true;
//             let newFileTitle = fileName + new Date().getTime();
//             newName= newFileTitle+"."+fileType;
//             newNameSmall= newFileTitle+"Small."+fileType;
//             file.path = './uploads/' + newFileTitle + '.' + fileType;
//           }else{
//             console.log('extention not supported');
//             fileOK = false;
//           }
//         }
//       },
//       {
//         event: 'error',
//         action: function (error) {
//           console.log("Error");
//           fileOK = false;
//         }
//       }
//   ];


router.get("/:name",(req,res)=>{
  res.render(req.params.name)
})

router.post("/uploadimg",formidable(opts),(req,res)=>{
    console.log("hi")
let path1=req.files.image.path
// console.log(req.fields)
console.log(path1)
req.fields.image=path1;
author(req.fields).save((err,result)=>{
  if(result){
    let obj={
      status:400,
      result:result,
      error:null
    }
    res.send(obj)
  }else{
    let obj={
      status:404,
      result:null,
      error:err

    }
    res.send(obj)
  }
})
    // let formidable=require("formidable")
    // const form=new formidable.IncomingForm()
    // form.uploadDir="./public/uploads";
    // form.keepExtensions=true;
    // form.maxFieldsSize=10*1024*1024;
    // form.multiples=true;
    // form.parse(req,(err,fields,files)=>{
    //     if(err){
    //         res.json({
    //             result:"faild",
    //             message:"upload faild"

    //         })
    //     }
    //   //  this.length
    //     var filedaofArray = files['']
    //    if(filedaofArray.length > 0){
    //         var fileName=[]
    //         filedaofArray.forEach((eachfile)=>{
    //             fileName.push(eachfile.path)
    //         })
    //       res.json({
    //           result:"ok",
    //           data:fileName,
    //           message:"upload Image Succefully!"
    //       })
    //     }else{res.send("no images Upload")}
    // })

})
// uploads image with photo
router.post('/uploadimgwithajax', formidable(opts, events), (req, res) =>{

  console.log(req.files);
  req.fields.image = "./public/uploads"+newNameSmall;
  target = "./public/uploads"+newName;
  console.log(req.fields.image);

  if(fileOK == false){
    res.status(500).send("Error");
    return;
  }
 reducePicture(target, req.fields.image);

  author(req.fields).save().then((data)=>{
    res.status(200).send(data);
  }).catch((error)=>{
    res.status(500).send("Error");
  })
})

// router.get("/authorer/getAuthoredata",(req,res)=>{
//   author.find().then(result=>{
//     if(result){
//       res.send(result)
//     }
//   })
// })

module.exports=router;