const mongoose = require('mongoose');
require('dotenv').config();

const connect = async()=>{
    try{
        const uri = process.env.MONGODB_URI;
        await mongoose.connect(uri)
    }catch(err){
        console.log(err.message);
    }
}

module.exports = connect;