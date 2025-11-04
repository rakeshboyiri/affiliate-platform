const express = require('express');
const mongoose = require('mongoose');
const User = require("./models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get("",async(req,res)=>{

    
    res.status(200).send({message:"Hello to Store"});
})

app.delete('/admin/client-delete',async(req,res)=>{
    const {id} = req.body;
    try{
        user = await User.findById(id);
        if(!user){
            return res.status(500).json({message:"User Not found"});
        }
        const deletedUser = await User.findByIdAndDelete(id);
        console.log(deletedUser);
        res.status(200).json({messgae:"user deleted Successfull"});
    }catch(err){
        res.status(500).json({message:"something went wrong"});
    }
})

app.put("/admin/client-update",async(req,res)=>{
    const {name,email,id} = req.body;
    console.log(id);
    try{
        user = await User.findById(id);
        // console.log(user);
        const updatedUser = await User.findByIdAndUpdate(id,{name:name},{new:true});
        console.log(updatedUser);
    }catch(err){
        return res.status(200).json({message:"something went wrong"})
    }
    res.status(200).json({message:"successful"});
})

app.post('/admin/add-client',async(req,res)=>{
    const {email,name,password} = req.body;

    try{
        const user = await User.findOne({email:email});
        console.log(user);
        if(user){
            return res.status(500).json({message:"Email Already in Use"});
        }
        const newUser = new User({
            name:name,
            email:email,
            password:password,
            role:"client"
        })
        const response = await newUser.save();
        console.log(response);

    }catch(err){
        return res.status(500).json({error:err});
    }
    res.status(200).json({message:"succeesful"});
})

app.post('/admin/clients',async(req,res)=>{
    const {token} = req.body;
    // console.log(token);
    // res.status(200).json({message:"successful"})
    const auth = jwt.verify(token,"secret");
    // console.log(auth);
    const {id,role} = auth;
    // console.log(id);
    if(role!="admin"){
        return res.status(401).json({message:"Unauthorized access"});
    }
    const clients = await User.find({role:"client"}).select("name email role createdAt").lean();
    // clients["id"] = id;
    const formattedClients = clients.map(c => ({
        id: c._id.toString(),  
        name: c.name,
        email: c.email,
        role: c.role
      }));

    // console.log(formattedClients);
    res.status(200).json({message:"succesfful",clients:formattedClients});
})

app.post('/signin',async(req,res)=>{
    const {email,name,password} = req.body;
    try{
        const user = await User.findOne({email:email});
        if(user){
            console.log("User already Existed");
            throw new Error("User already Existed");
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const userData = new User({
            name:name,
            email:email,
            password:hashedPassword,
            // role:"client"
        })
        await userData.save();
    }
    catch(err){
        return res.status(500).json({ error: err.message });
    }

    console.log(email,name,password);
    res.status(200).send({messagew:"Registartion Successfull"});
})

app.post('/login',async(req,res)=>{
    console.log(req.body);
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(401).send({message:"Invalid Credentials"});
        }
        const validPassword = await bcrypt.compare(password,user.password);
        if (!validPassword){
            return res.status(401).send({message:"Invalid Credentials"});
        }
        const token = await jwt.sign({id :user._id,role:user.role},"secret",{expiresIn:"1hr"});
        // const obj = await jwt.verify(token,"secret");
        // console.log(obj);

        return res.status(200).send({message:"login Successful",token:token,role:user.role});

    }catch(err){
        return res.status(401).send("Something went wrong please try again later");
    }
    
})

const db = async ()=>{
    
    mongoose.connect("mongodb://localhost:27017/ecommerce").then((res)=>{
        console.log("Database Connected Successfully at port : ",res.connections[0].port);
    })
    .catch((err)=>{
        console.log(err);
    })
    
}

db();

app.listen(5000,()=>{
    console.log(`Running at host :${5000} `);
})