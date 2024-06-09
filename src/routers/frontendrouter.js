const express = require('express');
const router = express.Router();
const path = require('path');




router.get('/redirect', (req, res) => {
  res.render('redirect');
});

// Routes pour les vues
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    recentpayments: 'recentpayments',
    newcustomers: 'newcustomers'
  });
});

router.get('/propertiespart', (req, res) => {
  res.render('propertiespart', {
    myproperties : "myproperties",
    addpropertyform : "addpropertyform"
  });
});

router.get('/tenant_home', (req, res) => {
  res.render('tenants_properties_part', {
    tenants_properties: "tenants_properties",
    addtenantform: "addtenantform"
  });
});

router.get('/tenants_part', (req, res) => {
  res.render('tenants_part', {
    mytenants : "mytenants",
    tenantsmessages:"tenantsmessages"
  });
});

router.get('/myreciept', (req, res) => {
  res.render('myreciept');
});

router.get('/receipt', (req, res) => {
  res.render('receipt');
});

module.exports = router;
