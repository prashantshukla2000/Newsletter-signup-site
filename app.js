const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https= require("https");

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/signup.html");

})
app.post("/",function(req,res){
console.log("Posting done");
const firstName=req.body.fname;
const lastName=req.body.lname;
const email=req.body.Email;

var data={
  members: [
    {
      email_address: email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstName,
        LNAME:lastName
      }
    }
  ]
};
var jsonData=JSON.stringify(data);
const url="https://us12.api.mailchimp.com/3.0/lists/2a384f3aad";
const options = {
  method:"POST",
  auth:"Prashant:d070778a227bf95e52d4e31114d5160c-us12"
}
const request=https.request(url,options,function(response){
if(response.statusCode===200){

   res.sendFile(__dirname+"/success.html");
}else{
res.sendFile(__dirname+"/failure.html");}

response.on("data",function(data){
  console.log(JSON.parse(data));
})
})
request.write(jsonData);
request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(){
  console.log("Server Started at Port 3000");
});
