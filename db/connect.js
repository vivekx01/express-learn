const mongoose = require("mongoose")

// const uri = "mongodb+srv://vivekx01:vivek1234@vivekx01.lf7rj5y.mongodb.net/?retryWrites=true&w=majority"
const connectDB = (uri)=>{
    console.log("Connecting to Mangu Server");
    return mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports= connectDB