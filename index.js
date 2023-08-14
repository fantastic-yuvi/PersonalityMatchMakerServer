// Imported Modules
import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import {userRouter} from "./routes/users.js";
import dotenv from "dotenv";

dotenv.config({path:"./.env"})
// DataBase link
const DATABASE = process.env.DATABASE;
const PORT = process.env.PORT || 3001;

const app=express();
app.use(express.json());
app.use(cors());
app.use("/auth",userRouter);

// Initialize database
mongoose.connect(`${DATABASE}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

// Design Schema
const userSchema = new mongoose.Schema({
    userid:String,
    name:String,
    age:String,
    course:String,
    branch:String,
    food:String,
    movie:String,
    song:String,
    artist:String,
    hobbies:String,
    lang:String,
    sport:String,
    gender:String,
    instagram_id:String,
    linkedin_id:String,
    email:String,
    img_url:String,
});

// Create Collection
const Collection = new mongoose.model("userdetails",userSchema);

// Function to respond for find data.
app.post('/fetchdata',async(req,res)=> {
    // console.log("hello");
    const doc = await Collection.find();
    var result = [];
    var count = 0;
    var ind = 0;
    // console.log(doc);
    for(var it in doc) {
        count = 0;
        if(doc[it].course === req.body.course) {
            count += 1;
        }
        if(doc[it].branch === req.body.branch) {
            count += 1;
        }
        if(doc[it].food === req.body.food) {
            count += 1;
        }
        if(doc[it].movie === req.body.movie) {
            count += 1;
        }
        if(doc[it].song === req.body.song) {
            count += 1;
        }
        if(doc[it].artist === req.body.artist) {
            count += 1;
        }
        if(doc[it].hobbies === req.body.hobbies) {
            count += 1;
        }
        if(doc[it].lang === req.body.lang) {
            count += 1;
        }
        if(doc[it].sport === req.body.sport) {
            count += 1;
        }
        if(count > 0) {
            const r = doc[it]._doc
            result.push(r);
            result[ind] = [count,result[ind]];
            ind+=1;
        }
    }
    result.sort()
    result.reverse();
    res.send(result);
});

// Function used to return the data to perticular id.
app.post('/getuserdata',async (req,res)=>{
    const user_data = await Collection.find({userid:req.body.username});
    res.json(user_data);
});

// Function to save data in Database.
app.post('/userdetail',async(req,res)=> {
    let userdetails = new Collection();
    userdetails.userid = req.body.userid;
    userdetails.name = req.body.name;
    userdetails.age = req.body.age;
    userdetails.course = req.body.course;
    userdetails.branch = req.body.branch;
    userdetails.food = req.body.food;
    userdetails.movie = req.body.movie;
    userdetails.song = req.body.song;
    userdetails.artist= req.body.artist;
    userdetails.hobbies= req.body.hobbies;
    userdetails.lang = req.body.lang;
    userdetails.sport = req.body.sport;
    userdetails.gender = req.body.gender;
    userdetails.instagram_id = req.body.instagram_id;
    userdetails.linkedin_id = req.body.linkedin_id;
    userdetails.email = req.body.email;
    userdetails.img_url = req.body.img_url;
    await userdetails.save();
    res.json(200);
});

// PORT for listening.
app.listen(PORT,()=>console.log("Connection Successful"));
