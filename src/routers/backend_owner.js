const express = require('express');
const router = express.Router();


const {getotp, createUserOwner, userauth, refreshToken} = require('../../controller/user');
const {createProperties, myProperties} = require('../../controller/property');



router.post("/getotp", getotp);

router.post("/createUserOwner", createUserOwner);

router.post("/userauth", userauth);

router.post("/refreshToken", refreshToken);

router.post("/createProperties", createProperties);

router.post("/myProperties", myProperties);


module.exports = router