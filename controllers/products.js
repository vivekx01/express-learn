const Product = require("../models/product")

const getAllProducts = async (req,res) =>{
    //processing user query
    const {company,name,featured,sort,select} = req.query
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
    //storing the find query in normal form
    let apiData = Product.find(queryobject)
    //checking if the user has specified any sorting constraint
    if (sort) {
        //user passes params with comma we need to remove it and add space inorder to process the query
        let sortfix = sort.replace(","," ")
        console.log(sortfix)
        //only include sort function in query if the user passes sort param or else normally call query
        apiData = apiData.sort(sortfix)
    }
    //checking if the user has specified any select constraint (only returns the requested field)
    if (select) {
        let selectfix = select.replace(","," ")
        console.log(selectfix)
        //only include select function in query if the user passes select param or else normal call
        apiData= apiData.select(selectfix)
    }
    let page = Number(req.query.page) || 1 //fetching number of pages passed and defautl 1
    let limit = Number(req.query.limit) || 1 //fetching limit passed and default 1
    let skip = (page-1)*limit //formula for skipping the number of contents (pagination formula)
    apiData= apiData.skip(skip).limit(limit)
    
    console.log(queryobject)
    //finally performing the query with or without sort param
    const myData = await apiData
    res.status(200).json({myData,nbHits: myData.length})
}

const getAllProductsTesting = async (req,res) =>{
    console.log(req.query);
    //mention the field for ascending sort & fieldname with minus sign for descending sort (.sort("-price"))
    const myData = await Product.find(req.query)
    res.status(200).json({myData,nbHits: myData.length})
}

module.exports = {getAllProducts,getAllProductsTesting}