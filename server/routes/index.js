/*
	Este es el archivo global de rutas, todas las rutas que creemos en disferentes archivos
	deberemos importarlas aqui. Para luego exportar este archivo al server
*/
const express = require('express')

const app = express()

// rutas de usuarios
app.use(require('./usuario'))

// rutas de login
app.use(require('./login'))



module.exports = app