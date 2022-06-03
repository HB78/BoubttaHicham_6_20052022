//on utlise le framework express pour faciliter le codage avec nodeJS 
const express = require('express');
const app = express();

//on importe mongoose dans le fichier principal index.js depuis le dossier models et dbConfig.js
//si on importe pas une paquet dans le fichier principal il ne fonctionnera pas
const mongoose = require('./models/dbConfig');

//on donne par defaut le port 3000 si, il est occupé il recherchera un port libre
let port = process.env.PORT || 3000;

//on écoute le port pour voir si il fonctionne
app.listen(port, () => {
    console.log(`Le server a été activé au port ${port}`)
    console.log("http://localhost:" + port)
});