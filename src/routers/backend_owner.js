const express = require('express');
const router = express.Router();


const {getotp, createUserOwner} = require('../../controller/user');




router.post("/getotp", getotp);

router.get("/createUserOwner", createUserOwner);



module.exports = router