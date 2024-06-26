
const pool =  require("../database/database_connection");
const {Property} = require('../model/property');
const jwt = require('jsonwebtoken');

require('dotenv').config();


module.exports.createProperties = (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Erreur de connexion au pool', err);
        }
        console.log('Connecté à PostgreSQL');

        try {
            const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token not provided' });
            }
            jwt.verify(
                token,
                process.env.TOKEN_KEY,
                async(_err, _tokendata) => {
                    console.log(_tokendata);
                    if (_err) {
                        return res.status(403).json({message: 'Token not valid'})
                    } else {
                        console.log(_tokendata.userId, _tokendata.userEmail);
                        const {address, description, cost} = req.body;
                        const query = "SELECT * FROM insert_property($1, $2, $3, $4)";
                        const values = [_tokendata.userId, address, description, cost];
                        return client.query(query, values, (err, result) => {
                            release();
                            if (err) {
                                release();
                                return console.error('Erreur lors de l\'exécution de la requête', err);
                            }
                            console.log(result.rows);
                            res.status(200).json({ message: "requête réussie" });
                    })
                    }
                }
            )
        } catch (error) {
            console.log('Erreur lors de l\'exécution', error);
        }
        
    })
}



module.exports.myProperties = (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Erreur de connexion au pool', err);
        }
        console.log('Connecté à PostgreSQL');

        try {
            const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token not provided' });
            }
            jwt.verify(
                token,
                process.env.TOKEN_KEY,
                async(_err, _tokendata) => {
                    console.log(_tokendata);
                    if (_err) {
                        return res.status(403).json({message: 'Token not valid'})
                    } else {
                        console.log(_tokendata.userId, _tokendata.userEmail);
                        const query = "SELECT * FROM show_properties($1)";
                        const values = [_tokendata.userId];
                        return client.query(query, values, (err, result) => {
                            release();
                            if (err) {
                                return console.error('Erreur lors de l\'exécution de la requête', err);
                            }
                            console.log(result.rows);
                            const myProperties = result.rows.map(row =>
                                 Property.jsonTONewProperty(row));
                                 console.log("myProperties: ", myProperties);
                            res.status(200).json(myProperties);
                    })
                    }
                }
            )
        } catch (error) {
            console.log('Erreur lors de l\'exécution', error);
        }
        
    })
}
