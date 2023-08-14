import mongoose from "mongoose";
const UserDetailSchema = new mongoose.Schema({
        course:{type:String},
        branch:{type:String}, 
        fav_lang:{type:String},
        fav_food:{type:String},
        fav_movie:{type:String},
        fav_song:{type:String},
        fav_hobbies:{type:String},
        fav_sport:{type:String},  
        gender:{type:String},
        instagram_id:{type:String},
        linkedin_id:{type:String}
});

export const UserDetailModel = mongoose.model("userdetails",UserDetailSchema);