//on utlise le framework express pour faciliter le codage avec nodeJS 
const express = require('express');
const app = express();

//on donne par defaut le port 3000 si, il est occupé il recherchera un port libre
let port = process.env.PORT || 3000;

//on écoute le port pour voir si il fonctionne
app.listen(port, () => {
    console.log(`Le server a été activé au port ${port}`)
    console.log("http://localhost:" + port)
});