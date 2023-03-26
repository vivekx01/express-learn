const Product = require("../models/product")

const getAllProducts = async (req,res) =>{
    //processing user query
    const {company,name,featured,sort} = req.query
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
    //storing the find query
    let apiData = Product.find(queryobject)
    //checking if the user has specified any sorting constraint
    if (sort) {
        //user passes params with comma we need to remove it and add space inorder to process the query
        let sortfix = sort.replace(","," ")
        console.log(sortfix)
        //only include sort function in query if the user passes sort param or else normally call query
        apiData = apiData.sort(sortfix)
    }
    
    console.log(queryobject)
    //finally performing the query with or without sort param
    const myData = await apiData
    res.status(200).json({myData})
}

const getAllProductsTesting = async (req,res) =>{
    console.log(req.query);
    //mention the field for ascending sort & fieldname with minus sign for descending sort (.sort("-price"))
    const myData = await Product.find(req.query).sort("price") 
    res.status(200).json({myData})
}

module.exports = {getAllProducts,getAllProductsTesting}