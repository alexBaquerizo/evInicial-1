/**
 * RespuestaController
 *
 * @description :: Server-side logic for managing respuestas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	respuestaAlumno: function(req, res, next) {
		var miRespuesta = req.body.answered;

		Opcion.find({
			where: { pregunta: Number(req.pregunta.id)}
		}).populate('subopcions').then(function(misOpciones){

			var prueba = 

			while (misOpciones.subopcions.length){
				if( == miRespuesta) {
					res.send('OK');
				}
	    	}

			next();
		}).catch(function(error){next(error);});
	},
};

