const express = require('express');
const router = express.Router();
const sharp = require('sharp');


const {getotp, createUserOwner, userauth, updateSold, refreshToken} = require('../../controller/user');
const {createProperties, myProperties} = require('../../controller/property');
const {createTenant, TenantsProperties, recentTenants, allTenants} = require('../../controller/tenant');
const {require_receipt, receipt_unValid, receipt_valid, validateReceipt} = require('../../controller/receipt');


const {upload} = require('../../functions/storepicture');

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


router.post('/upload', upload.single('image'), (req, res) => {
    try {
        // Vérifier si un fichier a été téléchargé
        if (!req.file) {
            return res.status(400).json({ message: 'Aucun fichier téléchargé' });
        }

        // Construire le chemin de l'image téléchargée
        const imageUrl = `../../frontend/img/${req.file.filename}`;

        // Répondre avec l'URL de l'image et le nom du fichier
        res.status(200).json({ imageUrl: imageUrl, filename: req.file.filename });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de l\'upload du fichier' });
    }
});

module.exports = router

