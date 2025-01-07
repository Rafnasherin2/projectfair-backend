const mongoose = require('mongoose')
const connectionString= process.env.connectionString

mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Atlas successfully connected to pfserver...");

}).catch((err)=>{
    console.log("mongodb connection failed!!!",err);
    
})