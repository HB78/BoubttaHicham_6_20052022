//on importe le modele des sauces
const sauce = require("../models/postsModel");

//le package fs permet de gérer modifier les fichiers du dossier Back-end ????
const fs = require("fs");

//affichage de toutes les sauces
exports.showAllSauce = (req, res, next) => {
    sauce.find()
     .then(sauces => res.status(200).json(sauces))
     .catch(error => res.status(400).json({ error }))
};

//affichage d'une seul sauce
exports.showOneSauce = (req, res, next) => {
    //on compare l'_id du produit à celui du parametre de requete 
    sauce.findOne({_id: req.params.id })
     .then(sauces => res.status(200).json(sauces))
     .catch(error => res.status(404).json({ error }))
};

//créer une sauce
exports.createSauce = (req, res, next) => {
    //à cause de req.file cad l'ajout de la photo et multer, req.body devient une string
    //demander la diff entre req.file et req.body
    //pourquoi on efface l'Id avec delete avant de commencer ?
    const parseRequest = JSON.PARSE(req.body.sauce);
    delete parseRequest._id;
    const Sauce = new sauce({
        ...parseRequest,
        imageUrl: `${req.protocole}://${req.get("host")}/images/${req.file.filename}`
    });
    Sauce.save()
     .then(() => res.status(201).json({message: "sauce enregistré"}))
     .catch(error => res.status(400).json({ error }))
};

//effacer une sauce
exports.deleteSauce = (req, res, next) => {
    //on cherche la sauce selectionnée avec findOne
  sauce.fincOne({_id: req.params.id})
    .then(thing => {
        //on récupère le nom de la photo grace a split[1]
        const filename = thing.imageUrl.split("/images/")[1];
        //on supprime la photo en amont de supp les infos de la sauce dans le cb de unlink
        fs.unlink(`images/${filename}`, () => {
            sauce.deleteOne({_id: req.params.id})
             .then(() => res.status(200).json({message: "sauce supprimée"}))
             .catch(error => res.status(400).json({ error }))

        });
    })
    .catch(error => res.status(500).json({ error }))
};

//modifier une sauce
exports.modifySauce = (req, res, next) => {
};

//req.params c'est pour trouver l'objet dans la base de donnée ?