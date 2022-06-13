// routes pour les pages autres que celle qui permet le sign in et sign up
//le CRUD des sauces, afficher toutes les produit ou seul seulement

const express = require('express');
const router = express.Router();

//importation de multer et de sa config
const multer = require("../middleware/multer");

//on importe le middleware d'authentification
const auth = require("../middleware/auth");

//route pour afficher une sauce 
//route pour afficher toutes les sauces
//routes pour créer une sauce
//routes pour supprimer une sauce
//route pour mettre à jour une sauce

