const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.post('/login', (req, res) => {
	
	let {email, password} = req.body

	Usuario.findOne({ email: email }, (err, usuarioDB) => {
		if(err){
			return res.status(500).json({
				ok: false,
				err
			})
		}

		//verificar si el usuario existe
		if( !usuarioDB ){
			return res.status(400).json({
				ok: false,
				message: '(Usuario) o contraseña incorrectos',
				err
			});
		}

		// evaluar constraseña: encriptamos la contraseña que nos llega por body 
		// y la comparamos con la contraseña que trae el usuario de la base de datos
		if ( !bcrypt.compareSync( password, usuarioDB.password ) ){
			return res.status(400).json({
				ok: false,
				message: 'Usuario o (contraseña) incorrectos',
				err
			});	
		}
		//creamos el token y le pasamos un objeto con el contenido que queremos que tenga
		let token = jwt.sign({
			usuario: usuarioDB,
		}, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN })

		res.json({
			ok: true,
			usuario: usuarioDB,
			token
		})

	})

});
















module.exports = app