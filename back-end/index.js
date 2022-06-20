//on utlise le framework express pour faciliter le codage avec nodeJS 
const express = require('express');
const app = express();

//importation de helmet pour proteger les headers
const helmet = require("helmet");

//le req et le res fonctionne avec le paquet body parser sa ressemble a la methode JSON.parse
//cela permet d'interpreter du JSON
const bodyParser = require("body-parser");

//importation de morgan pour logger les requete http
const morgan = require('morgan');

//on importe mongoose dans le fichier principal index.js depuis le dossier models et dbConfig.js
//si on importe pas une paquet dans le fichier principal il ne fonctionnera pas
const mongoose = require('./models/dbConfig');

//accession au path du server (sa veut dire quoi ?)
const path = require("path");

//on importe les routes qu'on a codé dans le fichier user du dossier route
const userRoutes = require("./routes/users");

//on importe les routes qu'on a codé dans le fichier post du dossier route
const saucesRoutes = require("./routes/posts");

//on donne par defaut le port 3000 si, il est occupé il recherchera un port libre
let port = process.env.PORT || 3000;

/**********************/

//utilisation de helmet pour protéger les headers
app.use(helmet());

//gestion des erreurs cors
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Ca veut dire quoi la gestion static ?
// __dirname c://user/desktop/projet
// path.join(__dirname, 'images') == __dirname + '/' + '/image';
app.use("/images", express.static(path.join(__dirname, 'images')));

//le req et le res fonctionne avec le paquet body parser sa ressemble a la methode JSON.parse
//cela permet d'interpreter du JSON
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

//utilisation de morgan
app.use(morgan('dev'));

//on utilise les routes users pour login et signup
app.use("/api/auth", userRoutes);

//on utilise les routes pour faire un CRUD des sauces
app.use("/api/sauces", saucesRoutes);

app.get("/", (req, res) => {
    res.status(200).send("API fonctionel route: /api/auth /api/sauces")
})

//les autres routes ici

//on écoute le port pour lancer le serveur
app.listen(port, () => {
    console.log(`Le server a été activé au port ${port}`)
    console.log("http://localhost:" + port)
});