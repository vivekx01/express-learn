const express = require('express')
const router = express.Router();

const {getAllProducts,getAllProductsTesting} = require("../controllers/products")

router.route("/").get(getAllProducts)
router.route("/all").get(getAllProductsTesting)

module.exports = router
