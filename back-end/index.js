//on utlise le framework express pour faciliter le codage avec nodeJS 
const express = require('express');
const app = express();

//le req et le res fonctionne avec le paquet body parser sa ressemble a la methode JSON.parse
//cela permet d'interpreter du JSON
const bodyParser = require("body-parser");

//on importe mongoose dans le fichier principal index.js depuis le dossier models et dbConfig.js
//si on importe pas une paquet dans le fichier principal il ne fonctionnera pas
const mongoose = require('./models/dbConfig');

//on importe les routes qu'on a codé dans le fichier user du dossier route
const userRoutes = require("./routes/user");

//on donne par defaut le port 3000 si, il est occupé il recherchera un port libre
let port = process.env.PORT || 3000;

//on écoute le port pour voir si il fonctionne
app.listen(port, () => {
    console.log(`Le server a été activé au port ${port}`)
    console.log("http://localhost:" + port)
});

/**********************/

//le req et le res fonctionne avec le paquet body parser sa ressemble a la methode JSON.parse
//cela permet d'interpreter du JSON
app.use(bodyParser.json());

//on utilise les routes users pour login et signup
app.use("/node-api", userRoutes);

