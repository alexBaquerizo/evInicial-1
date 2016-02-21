/**
 * RespuestaController
 *
 * @description :: Server-side logic for managing respuestas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	respuestaAlumno: function(req, res, next) {
		var respuesta = req.body.answered;
		var puntos = 0;
		var valorRespuesta = 0;

	  	Opcion.findOne({
        	where: { id: Number(respuesta)}
		}).populate('subopcions').then(function(misOpciones){

			/*sails.log.verbose(misOpciones.subopcions[0]);*/
		
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

		/*
		miOpcion.findOne({
        	where: { nombre: 'fraccion'}
        }).then(function(miSubopcion){

			sails.log.verbose(miSubopcion.valor);
		
		});
				miOpcionJSON = miOpcion.toJSON();
				res.json(miOpcionJSON);
				next();
				Respuesta.create({valor: answered});
            
			for (var i = 0; i < misOpciones.length; i++) { 
				if (misOpciones[i].id == Respuesta){
					sails.log.verbose('Correcto');
					res.send('OK');
				} else{
					sails.log.verbose('Incorrecto');
					res.send('NO');
					next(new Error('Respuesta Incorrecta'));
				}
			}
		*/
	},
};
