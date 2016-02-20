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

				if(subopcion.nombre === 'fraccion'){
					puntos= subopcion.valor;

				}

				if(subopcion.nombre === 'text'){
					valorRespuesta= subopcion.valor;
				}
				
			});

			Respuesta.create({valor: valorRespuesta, puntuacion: puntos})
				.exec(function createCB(err, created){
					res.json(created);
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