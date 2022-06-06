//ce fichier postsModels.js va servir à stocker des modeles de base de données
//c'est avec le paquet mongoose que l'on va construire ces modèles

//modele pour les pages du site hormis les sign in et sign up
const mongoose = require('mongoose');

//le model pour les sauces
const sauces = mongoose.Schema({
    userId: {type : String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, required: true},
    dislikes: {type: Number, required: true},
    userLiked: {type: Array, required: true},
    userDisliked: {type: Array, required: true}
});
//on exporte le schéma
module.exports = mongoose.model("sauces", sauces);

// a quoi correspond le premier argument de la fonction mongoose.model ?