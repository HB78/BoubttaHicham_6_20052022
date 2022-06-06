//ce fichier dbCongig.js sert à se connecter à la base de données avec mongoose
const mongoose = require("mongoose");

//pour se connecter à la base de données, mongoose fait le lien entre l'api et mongoDB
mongoose.connect(
    "mongodb://localhost:27017/node-api",
    {useNewUrlParser : true, useUnifiedTopology: true},
    (err) => {
        if(!err) console.log("vous etes connecté à mongodb");
        else console.log("la connexion à mongodb a échouée" + err);
    }
)
