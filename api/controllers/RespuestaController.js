/**
 * RespuestaController
 *
 * @description :: Server-side logic for managing respuestas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	respuestaAlumno: function(req, res, next) {
		var respuesta = req.body.answered;

	  	Opcion.findOne({
        	where: { id: Number(respuesta)}
		}).populate('subopcions').then(function(miOpcion){

			if(miOpcion) {

				sails.log.verbose(miOpcion.subopcions[0].valor);

				for (var i = 0; i < miOpcion.subopcions.length; i++) { 
					if (miOpcion.subopcions[i].valor == 100){
						sails.log.verbose('Correcto');
						res.send('OK');
					} else{
						next();
					}
				}

			} else { next(new Error('No has respondido correctamente'));}

			/*
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
		}).catch(function(error){next(error);});
	},
};

