// Après avoir envoyé ses infos (mdp et login) on va créer ici le token de l'utilisateur
//le token sera créer à partir de ses infos envoyé
//ensuite on lui enverra ce token pour qu'il se connecte à l'api 
//le token va servir d'authentifiant, de passeport pour le user

//importations
const jwt = require("jsonwebtoken");

//exportation de la fonction du middleware
module.exports = (req, res, next) => {
    try {
        //on s'occupe du token ici qui se trouve dans le header autorization : voir bearer token
          const allToken = req.headers.autorization
          //problème : dans allToken il y a un tableau avec le token et bearer, on juste le token"

          //avec les parenthèse du .split on coupe au niveau de l'espace
          //dans les crochets on met l'index de ce qu'on veut récupérer dans le tableau
          const token = req.headers.autorization.split(" ")[1]

        //on décode le token
          const decodedToken = jwt.verify(token, "key")

        //on récupère l'userId dans le token
          const userIdDecodedToken = decodedToken.userId
        
        //on récupère l'userId de la req cad celui de l'utilisateur
          const userIdFront = req.body.userId
        
        //on compare les deux ID des users
        if(req.body.userId && (req.body.userId === userIdDecodedToken)) {
            next()
        }else {
            throw "l'identifiant utilisateur non valide"
        }

        //on passe au middleware suivant avec next()

    }catch {
        //ici on récupère et on gère les erreurs du try
        res.status(401).json({
            error: new Error('Requete invalide!')
          });
    }
};