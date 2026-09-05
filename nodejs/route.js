const express = require("express")
const {getAvailableCountries, compareCountries} = require("./controller.js")

const router = express.Router()


router.get("/allcontries",getAvailableCountries)
router.get("/compare",compareCountries)

module.exports = router