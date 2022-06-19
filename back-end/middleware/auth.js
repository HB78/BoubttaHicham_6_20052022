// Après avoir envoyé ses infos (mdp et login) on va créer ici le token de l'utilisateur
//le token sera créer à partir de ses infos envoyé
//ensuite on lui enverra ce token pour qu'il se connecte à l'api 
//le token va servir d'authentifiant, de passeport pour le user//

//importations
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const result = dotenv.config();
console.log("-->test sur la page user auth", process.env.KEY)

//exportation de la fonction du middleware
module.exports = (req, res, next) => {
    try {
        const BearerAndToken = req.headers.authorization;
        const token = BearerAndToken.replace("Bearer ", "");

        //on s'occupe du token ici qui se trouve dans le header autorization : voir bearer token
        //problème : dans allToken il y a un tableau avec le token et bearer, on juste le token"
        
        //avec les parenthèse du .split on coupe au niveau de l'espace
        //dans les crochets on met l'index de ce qu'on veut récupérer dans le tableau
        // allToke = "Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmE0YjIyMjJiZTY4Zjg2NjczNWY5Y2IiLCJpYXQiOjE2NTU0MDQzOTEsImV"

        //on décode le token
        const decodedToken = jwt.verify(token, process.env.KEY);

        //on compare les deux ID des users
        if (!decodedToken) {
          res.status(401).json("Vous n'etes pas autorisé à vous connécté")
          throw "Mauvais jwt";
        } else {
          //on récupère l'userId dans le token
          req.body.userIdDecodedToken = decodedToken.userId;
          next();
        }

    } catch {
        //ici on récupère et on gère les erreurs du try
        res.status(401).json('Requete invalide!');
    }
};