const mongoose = require("mongoose")

const connectDB = (uri)=>{
    console.log("Connecting to Mangu Server");
    return mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports= connectDB