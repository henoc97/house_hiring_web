

const pool =  require("../database/database_connection");
const {hashPassword, comparePasswords} = require("../functions/hash_compare_pwd");
const {User} = require("../model/user");
const mailTest = require("../functions/email_test");
const generateToken = require("../functions/token")
const sendOTPemail = require('../email/activation/sender');
const codeOTP = require('../functions/otp');
const { config } = require("dotenv");

const email_otp = {}

module.exports.getotp = (req, res) => {
    
    
    console.log(req.body);
    const {email, pwd} = req.body;
    if (mailTest(email)) {

        const otp = codeOTP;
        sendOTPemail(email, pwd, otp);
        email_otp[email] = otp
    } else {
        res.status(404).json({ message: 'Entrer un email valide' });
    }
        
}

module.exports.refreshToken = (req, res) => {
    const {refreshToken} = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }

    try {
        const key = process.env.TOKEN_KEY;
        const decoded = jwt.verify(refreshToken, key);

        const user = { id: decoded.userId, email: decoded.userEmail };
        const newAccessToken = generateToken(user, "15m");
        const newRefreshToken = generateToken(user, "7d");

        res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (err) {
        res.status(401).json({ message: 'Invalid refresh token' });
    }
}


module.exports.createUserOwner = (req, res) => {
    
    pool.connect(async (err, client, release) => {
        try {
            if (err) {
                return console.error('Erreur de connexion au pool', err);
            }
            console.log(req.body);
            const {email, pwd, otp} = req.body;
            if (mailTest(email)) {
                
                const pwdhashed = await hashPassword(pwd);
                console.log(pwdhashed);

                console.log(email_otp[email], otp);

                if (email_otp[email] == otp) {
                    
                    console.log('Connecté à PostgreSQL');
                    const query = "SELECT * FROM insert_owner($1, $2)";
                    const values = [email, pwdhashed];
                    return client.query(query, values, (err, result) => {
                    release();
                    if (err) {
                        res.status(404).json({ message: 'Requête non validée',err });
                        return console.error('Erreur lors de l\'exécution de la requête', err);
                    }
                    console.log(result.rows);
                    res.status(200).json({ message: 'Requête réussie' });
                    });

                } else {
                    res.status(404).json({ message: 'OTP invalide' });
                }
                
                
            } else {
                res.status(404).json({ message: 'Entrer un email valide' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
        
        
    })
}

module.exports.userauth = (req, res) => {
    pool.connect((err, client, release) => {
        try {
            if (err) {
                return console.error('Erreur de connexion au pool', err);
            }
            console.log('Connecté à PostgreSQL');
            // Exemple d'exécution d'une requête SQL
            console.log(req.body);
            const {email, pwd} = req.body;
            console.log("email:", email);
            if (mailTest(email)){
                const query = "SELECT * FROM show_owner($1)"
                const values = [email]
                return client.query(query, values, async (err, result) => {
                    release();
                    if (err) {
                        return console.error('Erreur lors de l\'exécution de la requête', err);
                    }
                    console.log(result.rows);
                    if (result.rows.length > 0) {
                        const pwdhashed = result.rows[0].pwd
                        console.log(pwd, pwdhashed);
                        if(await comparePasswords(pwd, pwdhashed)){
                            console.log("ok");
                            const user = User.jsonToNewUser(result.rows[0])
                            console.log("user:", user);
                            const newaccesToken = generateToken({id : user.userID, email : user.email}, "2d");
                            const newrefreshToken = generateToken({id : user.userID, email : user.email}, "7d")
                            console.log("email",  user.email);
                            console.log(newaccesToken, newrefreshToken);
                            res.status(200).json({refreshToken : newrefreshToken, accessToken: newaccesToken, user: user.toJson()});
                        } else {
                            res.status(404).json({ message: 'Mot de passe incorrect' });
                        }
                    } else {
                        res.status(404).json({ message: 'Aucun utilisateur trouvé' });
                    }
                    
                });
            } else {
                res.status(404).json({ message: 'Entrer un email valide' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    })
}

