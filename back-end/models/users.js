//page JS qui permet de créer les utilisateur et aussi qui permet de se connecter

//pour pouvoir créer un schéma il faut importer en amont mongoose afin d'utiliser ses options
const mongoose = require("mongoose");

//on installe mongoose unique validator pour eviter a l'utilisateur de créer unautre compte avec le meme mail
//avec unique:true et mongoose validator l'utilisateur ne peut pas créer deux comptes avec une seul adresse mail 
const uniqueValidator = require("mongoose-unique-validator");

//modèle pour le sign in / le terme unique dans email c'est pour éviter l'ajout d'un meme mail lors de l'inscription
const signSchema = mongoose.Schema({
    email: { type : String, required: true, unique:true },
    password: { type: String, required: true }
});

//maintenant qu'on a require mongoose unique validator, on peut utiliser son plugin (cad sa fonction)
//on ajoute le plugin à la constante signSchema qui contient le schema
signSchema.plugin(uniqueValidator);

//maintenant il faut exporter le modèle pour qu'il soit disponible dans d'autres dossiers
//le premier argument users c'est le nom de la collection qui va se créer dans mongoDB
module.exports = mongoose.model("user", signSchema);