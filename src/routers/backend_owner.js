const express = require('express');
const router = express.Router();


const {getotp, createUserOwner, userauth} = require('../../controller/user');
const {createProperties} = require('../../controller/property');



router.post("/getotp", getotp);

router.post("/createUserOwner", createUserOwner);

router.post("/userauth", userauth);

router.post("/createProperties", createProperties);



module.exports = router