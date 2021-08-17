//requerir archivos de configuracion globales
require('./config/config');

const express = require('express');

const app = express();

//body-parser nos sirve para ver la informacion enviada en el body
const bodyParser = require('body-parser');

// parsear application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// pasear application/json
app.use(bodyParser.json())


app.get('/usuario', (req, res) => {
	res.json('get usuario')
})

app.post('/usuario', (req, res) => {
	//obtener informacion de body
	let body = req.body;

	if( body.nombre === undefined ){
		res.status(400).json({
			ok: false,
			message: "El nombre es necesario"
		})
	}

	res.json({
		"usuario": body
	});
})

app.put('/usuario/:id', (req, res) => {

	//obtener parametro de URL
	let id = req.params.id;

	res.json({
		id
	})
})

app.delete('/usuario', (req, res) =>{
	res.json('delete usuario')
})


app.listen(process.env.PORT, () => {
	console.log('Server on port: ', process.env.PORT)
})