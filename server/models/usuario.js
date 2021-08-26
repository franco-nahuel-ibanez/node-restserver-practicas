
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let rolesValido = {
	values: ['ADMIN_ROLE', 'USER_ROLE'],
	message: '{VALUE} No es un rol valido'
}


let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
	nombre: {
		type: String,
		required: [true, 'El nombre es requerido'],
	},
	email: {
		type: String,
		required: [true, 'El correo es requerido'],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'La contraseña es obligatoria']
	},
	img: {
		type: String,
		required: false
	},
	role: {
		type: String,
		default: 'USER_ROLE',
		enum: rolesValido
	},
	estado: {
		type: Boolean,
		default: true
	},
	google:{
		type: Boolean,
		default: false
	}
});

usuarioSchema.methods.toJSON = function() {
	
	let user = this;
	let userObject = user.toObject();
	delete userObject.password;

	return userObject;
}

usuarioSchema.plugin( uniqueValidator, { message: '{PATH} debe ser unico' })

module.exports = mongoose.model( 'Usuario', usuarioSchema );


