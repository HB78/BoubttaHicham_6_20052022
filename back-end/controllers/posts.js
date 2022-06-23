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
    sauce.findOne({ _id: req.params.id })
     .then((response) => {
        res.status(200).json(response);
    })
     .catch((error) => {
        res.status(404).json({ error });
    });
};

//créer une sauce
exports.createSauce = (req, res, next) => {
    //à cause de req.file cad l'ajout de la photo et multer, req.body devient une string
    //demander la diff entre req.file et req.body
    //pourquoi on efface l'Id avec delete avant de commencer ?
    const parseRequest = JSON.parse(req.body.sauce);
    delete parseRequest._id;
    const Sauce = new sauce({
        ...parseRequest,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    });
    // console.log("saucee image url", Sauce.imageUrl); 
    Sauce.save()
     .then(() => res.status(201).json({message: "sauce enregistré"}))
     .catch(error => res.status(400).json({ error }))
};

//effacer une sauce
exports.deleteSauce = (req, res, next) => {
    //on cherche la sauce selectionnée avec findOne
  sauce.findOne({_id: req.params.id})
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
exports.updateSauce = (req, res, next) => {
    //premier cas : la photo est modifiée par l'utilisateur
    if(req.file) {
        // on l'efface et on remet à jour le tout
        //_id : req.params.id sélectionne l'objet à mettre à jour
        //le contenu finira t'il dans {...req.body } ?
        //dans {...req.body, _id : req.paramas.id} on ajoute l'id pour etre sur que l'id soi le meme
        //req.file => sa veut dire si il y a un fichier dans la requete
        //si l'utilisateur modifie la photo on va recevoir en form data donc il faur parser le tout
        sauce.findOne({ _id: req.params.id })
         .then(resContain => {
            console.log("--->>> la reponse pour voir la photo", resContain)
            //pk on le récupère dans la requete ?
            const fileNameOfReq = resContain.imageUrl.split('/images/')[1];
            console.log(fileNameOfReq)
            fs.unlink(`images/${fileNameOfReq}`, () => {
                //on update tout en recréant une nouvelle sauce avec les nouveaux élements
                const updateSauce = {
                    ...JSON.parse(req.body.sauce),
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                }
                sauce.updateOne({ _id: req.params.id }, { ...updateSauce, _id: req.params.id })
                 .then(() => res.status(200).json({ message: "sauce mise à jour" }))
                 .catch(error => res.status(400).json({ error }));
            })
         })
         .catch(error => res.status(400).json({ error }))
    }else {
        //deuxième cas : la photo n'est pas concernée par les modifications
        //on recoit cette fois des données sous format JSON
        //A QUOI CORRESPOND ...req.body ??????
        const infosChangedByUser = { ...req.body };
        sauce.updateOne({ _id: req.params.id }, { ...infosChangedByUser, _id: req.params.id })
         .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
         .catch(error => res.status(400).json({ error }));
    }
};

//gestion des likes
exports.dislikeandlike = (req, res, next) => {
    switch(req.body.like) {
        //si le user a liker
        case 1 : 
        sauce.updateOne(
            { _id: req.params.id},
            {
             $inc: { likes: 1 },
             $push: { usersLiked: req.body.userId }
            }
        )
        .then(() => res.status(201).json({ message: 'sauce liker' }))
        .catch((error) => { res.status(400).json({ error }) });
        break;
        
        //pour disliker
        case -1 : 
        sauce.updateOne(
            { _id: req.params.id},
            {
             $inc: { dislikes: 1 },
             $push: { usersDisliked: req.body.userId }
            }
        )
        .then(() => res.status(201).json({ message: 'sauce disliker' }))
        .catch(error => res.status(400).json({ error }));
        break;
        
        //pour annuler le like et le dislike
        case 0 :
        sauce.findOne({ _id: req.params.id })
        .then((obj) => {
            if(obj.usersLiked.includes(req.body.userId)) {
                sauce.updateOne(
                    { _id: req.params.id},
                    {
                        $inc: { likes: -1 },
                        $pull: { usersLiked: req.body.userId }
                    }
                )
                .then(() => res.status(201).json({ message: 'like annulé' }))
                .catch(error => res.status(400).json({ error }));
            }
            if(obj.usersDisliked.includes(req.body.userId)) {
                sauce.updateOne(
                    { _id: req.params.id},
                    {
                        $inc: { dislikes: -1 },
                        $pull: { usersDisliked: req.body.userId }
                    }
                )
                .then(() => res.status(201).json({ message: 'dislike annulé' }))
                .catch(error => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(400).json({ error }));
        break;
        
        default :
        console.log(' le problème se situe au niveau du switch')
  }
};