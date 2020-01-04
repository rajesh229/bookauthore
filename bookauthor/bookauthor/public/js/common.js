function saveAuthore(){

    const xhr=new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:3000/uploadimgwithajax', true);
   var authorname=document.querySelector("#exampleInputName").value;
   var name=document.querySelector("#exampleInputbookName").value;

   var image=document.getElementById("image").files[0]
  var  formData = new FormData();
  formData.append("authorename",authorname)
  formData.append("bookname",name)
  formData.append("image",image)
alert("hi")
// $.ajax({
//     url:"http://localhost:3000/uploadimg",
//     data:formData,
//     dataType:"JSON",
//     type:"POST",
    
//     processData : false,
//    //cache : false,
//     success:function(responce){
//         console.log(responce)
        
//     }
// })

xhr.onreadystatechange=function(){
console.log(xhr.status)
    if(xhr.status == 200){
       // document.querySelector('#addBookModal').innerHTML = errorMessage;
       // return;
       console.log(JSON.parse(xhr.responseText));
      // console.log("hiihiii")
      }
      if(xhr.status == 400) {
        if(xhr.responseText.includes('Error')){
            console.log(xhr.responseText);
        
        }
        console.log(JSON.parse(xhr.responseText));
       // document.querySelector('#addBookModal').innerHTML = success;
      }
}
xhr.send(formData);
//document.querySelector('#addBookModal').innerHTML = progress;
}



$(document).ready(function(){
    $.ajax({
    url:"http://localhost:3000/getAuthoredata",
    dataType:"JSON",
    JSON:"get",
    success:function(responce){
        console.log(responce)

    }
})
})