
//requerir archivos de configuracion globales
require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

//body-parser nos sirve para ver la informacion enviada en el body
const bodyParser = require('body-parser');

// parsear application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// pasear application/json
app.use(bodyParser.json())


//configuracion global de rutas
app.use(require('./routes/index'))


mongoose.connect('mongodb://localhost/cafe', {
	useNewUrlParser: true,
	createIndex: true,
	useUnifiedTopology: true
})
.then(db => console.log('Database is connected'))


app.listen(process.env.PORT, () => {
	console.log('Server on port: ', process.env.PORT)
})