const jwt = require('jsonwebtoken');


// ===================
// Verificar Token
// ====================


//NEXT: continua con la ejecucion del programa
let verificaToken = ( req, res, next ) => {

	let token = req.get('token'); //en este caso lo llamamos 'token' pero tambien es comun nombrarlo como 'autentication' 

	jwt.verify( token, process.env.SEED, (err, decoded) => {
		if(err){
			return res.status(401).json({
				ok: false,
				err: {
					message: 'token no valido'
				}
			});
		}

		req.usuario = decoded.usuario
		next();

	})

};


let verificaAdmin_Role = (req, res, next) => {

	let usuario = req.usuario

	console.log(usuario.role)

	if( usuario.role !== 'ADMIN_ROLE'){

		return res.json({
			ok: false,
			err: {
				message: 'El usuario no es administrador'
			}
		})
	}

	next()
}



module.exports = {
	verificaToken,
	verificaAdmin_Role
}