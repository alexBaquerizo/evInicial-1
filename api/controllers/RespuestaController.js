/**
 * RespuestaController
 *
 * @description :: Server-side logic for managing respuestas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	respuesta: function(req, res, next){
		req.pregunta.comprobarRespuesta(req.body.answered, req.session.passport.user, req.cuestionario.id, req.pregunta.id, function (created){res.json(created);});
	},
	/*
	respuestaAlumno: function(req, res, next) {
		var respuesta = req.body.answered;
		var puntos = 0;
		var valorRespuesta = 0;

	  	Opcion.findOne({
        	where: { id: Number(respuesta)}
		}).populate('subopcions').then(function(misOpciones){

			misOpciones.subopcions.forEach(function(subopcion){
				
				sails.log.verbose(subopcion);

				if(subopcion.nombre === 'fraction'){
					puntos= subopcion.valor;
				}

				if(subopcion.nombre === 'text'){
					valorRespuesta= subopcion.valor;
				}
				
			});

			sails.log.verbose(req.session.passport.user);

			Alumno.findOne({
				where: {user: req.session.passport.user}
				}).then(function(alumno){

					sails.log.verbose(alumno);

					if(alumno){
						Respuesta.create({valor: valorRespuesta, puntuacion: puntos, cuestionario: req.cuestionario.id, pregunta: req.pregunta.id, alumno: alumno.id })
						.exec(function createCB(err, created){
							res.json(created);
						});
					}else{
						res.send("No estas autenticado como usuario Alumno");
					}
			});

		});
	},
	*/
};
