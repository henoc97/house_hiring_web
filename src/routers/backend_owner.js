const express = require('express');
const router = express.Router();


const {getotp, createUserOwner, userauth, refreshToken} = require('../../controller/user');
const {createProperties, myProperties} = require('../../controller/property');
const {createTenant, TenantsProperties, recentTenants, allTenants} = require('../../controller/tenant');


router.post("/getotp", getotp);

router.post("/createUserOwner", createUserOwner);

router.post("/userauth", userauth);

router.post("/refreshToken", refreshToken);

router.post("/createProperties", createProperties);

router.post("/myProperties", myProperties);

router.post("/createTenant", createTenant);

router.post("/TenantsProperties", TenantsProperties);

router.post("/recentTenants", recentTenants);

router.post("/allTenants", allTenants);



module.exports = router