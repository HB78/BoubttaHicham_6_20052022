// routes pour les pages autres que celle qui permet le sign in et sign up
//le CRUD des sauces, afficher toutes les produit ou seul seulement

const express = require('express');
const router = express.Router();

//importation de multer et de sa config
const multer = require("../middleware/multer");

//on importe le middleware d'authentification
const auth = require("../middleware/auth");

//importation des controllers pour le CRUD
const crud = require("../controllers/posts");

//route pour afficher une sauce
router.get("/:id", auth, crud.showOneSauce);

//route pour afficher toutes les sauces
router.get("/", auth, crud.showAllSauce);

//routes pour créer une sauce
router.post("/", multer, crud.createSauce);

//routes pour supprimer une sauce
router.delete("/:id", auth, crud.deleteSauce);

//route pour mettre à jour une sauce
router.put("/:id", auth, multer, crud.updateSauce)

//routes pour les likes et dislikes
router.post("/:id/like", crud.dislikeandlike)

//exportation des routers
module.exports = router;