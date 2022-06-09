// ici se sont les consignes qu'il y aura dans les requetes get et post des sign in et sign up 

//ici on importe bcrypt
const bcrypt = require("bcrypt");

//ici on importe les modeles dans lesquelles on injectera les données
const user = require("../models/postsModel");

//ici on va importer plus tard le jwt
const jwt = require("jsonwebtoken");

// le code pour l'inscription
exports.signup = (req, res, next) => {
    //ici on crypte le mot de passe que l'utilisateur envoie depuis le front
    //on exécute le hashage 10 fois (pdt 10 tours)
    bcrypt.hash(req.body.password, 10)
       //ici on récupère le hash du mot de passe qu'on enregistre dans un nouveau user dans la DB
      .then(hash => {
          const user = new user({
              email: req.body.email,
              password: hash
          });
          user.save()
           .then(() => res.status(201).json({message : "l'utilisateur à été crée avec succès"}))
           .catch(error => res.status(400).json({ error }))
      })
      .catch(error => res.status(500).json({ error }))
}
 //le code pour le login cad l'authentification
 exports.login = (req, res, next) => {
     //findOne permet de trouver un seul utilisateur de la DB en comparant ladresse mail car elle est unique
     //on introduit dans la parenthèse l'objet de comparaison mongoose va donc chercher le mail entré par l'utilisateur
     user.findOne({email: req.body.email})
    //dans le then on vérifie si on a récupérer un user
     .then(user => {
         if(!user){
             return res.status(401).json({error: "utilisateur inexistant"})
         }
         //on compare le mdp entré par l'utilisateur et celui stocker
         bcrypt.compare(req.body.password, user.password)
           //dans le then on reçoit un bolean pour savoir si la comparaison est bonne
          .then(valid => {
              if(!valid) {
                return res.status(401).json({error: "mot de passe incorrect"})
              }
              res.status(200).json({
                  userId : user._id,
                  token : jwt.sign(
                      {userId : user._id},
                      'key',
                      {expiresIn: "24h"}
                  )
              })
          })
          .catch(error => res.status(500).json({ error }))
     })
     .catch(error => res.status(500).json({ error }))
 }