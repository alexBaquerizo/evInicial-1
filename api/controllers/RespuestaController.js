/**
 * RespuestaController
 *
 * @description :: Server-side logic for managing respuestas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	respuestaAlumno: function(req, res, next) {
		var Respuesta = req.body.answered;
		var Puntos =0;

		Opcion.find({
			where: { pregunta: Number(req.pregunta.id)}
		}).populate('subopcions').then(function(misOpciones){

			/*
			misOpciones.forEach(function(name){}
			*/
			sails.log.verbose(Respuesta);
			sails.log.verbose(misOpciones[0].subopcions[0].valor);
			sails.log.verbose(misOpciones[0].id);

			for (var i = 0; i < misOpciones.length; i++) { 
				if (misOpciones[i].id == Respuesta){
					Puntos ++;
					sails.log.verbose('Correcto');
					res.send(Puntos);
				} else{
					sails.log.verbose('Incorrecto');
					res.send('NO');
					next(new Error('Respuesta Incorrecta'));
				}
			}

		}).catch(function(error){next(error);});
	},
};

 