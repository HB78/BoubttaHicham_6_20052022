//ici on met en place les routes en utilisant les verbes liés au CRUD

const express = require("express");
const router = express.Router();

//on importe les consignes autrement dit les controllers
//on importe les schémas par richochet car déjà importés par les controllers
const userConnexion = require("../controllers/users");

//on importe le middleware d'authentification
const auth = require("../middleware/auth");

router.post("/signup", userConnexion.signup);
router.post("/login", userConnexion.login);

//on exporte tous les routers que l'on a coder ici
module.exports = router;