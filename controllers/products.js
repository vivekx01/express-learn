const Product = require("../models/product")

const getAllProducts = async (req,res) =>{
    //processing user query
    const {company,name,featured} = req.query
    //creating a queryobject to make api more secure and robust
    const queryobject = {}
    //checking if the user has passed company name
    if (company) {
        queryobject.company = company;
    }
    //checking if the user has passed product name
    if (name) {
        //using regex in order to search for all elements and also make query case insensitive
        queryobject.name= { $regex : name, $options:"i"} 
    }
    //checking if the user has passed featured (boolean value)
    if (featured) {
        queryobject.featured= featured;
    }
    console.log(queryobject)
    const myData = await Product.find(queryobject)
    res.status(200).json({myData})
}

const getAllProductsTesting = async (req,res) =>{
    console.log(req.query);
    const myData = await Product.find(req.query)
    res.status(200).json({myData})
}

module.exports = {getAllProducts,getAllProductsTesting}