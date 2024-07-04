const express = require('express');
const router = express.Router();


const {getotp, createUserOwner, userauth, updateSold, refreshToken} = require('../../controller/user');
const {createProperties, myProperties} = require('../../controller/property');
const {createTenant, TenantsProperties, recentTenants, allTenants} = require('../../controller/tenant');
const {require_receipt, receipt_unValid, receipt_valid, validateReceipt} = require('../../controller/receipt');

router.post("/getotp", getotp);

router.post("/createUserOwner", createUserOwner);

router.post("/userauth", userauth);

router.post("/updateSold", updateSold);

router.post("/refreshToken", refreshToken);

router.post("/createProperties", createProperties);

router.post("/myProperties", myProperties);

router.post("/createTenant", createTenant);

router.post("/TenantsProperties", TenantsProperties);

router.post("/recentTenants", recentTenants);

router.post("/allTenants", allTenants);

router.post("/require_receipt", require_receipt);

router.post("/receipt_unValid", receipt_unValid);

router.post("/receipt_valid", receipt_valid);


router.post("/validateReceipt", validateReceipt);




module.exports = router