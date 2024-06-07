const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
require("dotenv/config");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurer le moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Définir la route principale
app.get('/', (req, res) => {
  res.render('index');
});

// Routes pour les vues
app.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    recentpayments: 'recentpayments',
    newcustomers: 'newcustomers'
  });
});

app.get('/propertiespart', (req, res) => {
  res.render('propertiespart', {
    myproperties : "myproperties",
    addpropertyform : "addpropertyform"
  }); // Assurez-vous que myproperties.ejs existe
});

app.get('/tenant_home', (req, res) => {
  res.render('tenants_properties_part', {
    tenants_properties: "tenants_properties",
    addtenantform: "addtenantform"
  }); 
});

app.get('/tenants_part', (req, res) => {
  res.render('tenants_part', {
    mytenants : "mytenants",
    tenantsmessages:"tenantsmessages"
  }); 
});

app.get('/myreciept', (req, res) => {
  res.render('myreciept'); 
});

app.get('/receipt', (req, res) => {
  res.render('receipt');
});


const port = 3000;

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
