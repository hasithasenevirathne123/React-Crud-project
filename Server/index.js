const express = require('express')
const cors = require("cors")
const app = express()
const mongoose = require("mongoose")//MongoDB
app.use(cors())
app.use(express.json())


mongoose.connect("mongodb://localhost:27017/crudoperation")//DB Connetion String
.then(()=>console.log("connected to DB"))
.catch((error)=>console.log("Error"));

const PORT = process.env.PORT || 8080 // Local Host PORT

//Read //Get Data
app.get("/",async(req,res)=>{
    const data = await userModel.find({})
  res.json({success:true, data:data}); 
})

//Create //Save Data
app.post("/create",async(req,res)=>{
    const data = new userModel(req.body)
    await data.save()
    res.send({success : true, message:"Data Saved Successfully!", data : data})
})

//Update //Update Data
app.put("/update", async(req,res)=>{
    console.log(req.body)
    const {id,...rest} = req.body
    console.log(rest)
    const data = await userModel.updateOne({_id : req.body.id},rest)
    res.send({success : true , message: "Data Updated Successfully!", data : data})
})


//Schema
const schemaData = mongoose.Schema({
    vehicleno:String,
    vehiclebrand:String,
    vehicletype:String,
},{
    timestamps:true    
});

const userModel = mongoose.model("user",schemaData);

app.listen(PORT,()=>console.log("Server is running"));
