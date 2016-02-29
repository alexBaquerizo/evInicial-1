/**
 * PreguntaController
 *
 * @description :: Server-side logic for managing preguntas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	load: function(req, res, next) {
		Pregunta.findOne({
			where: { id: Number(req.params.preguntaId)}
		}).populate('opcions').then(function(pregunta){
			if(pregunta) {
				req.pregunta = pregunta;
				next();
			} else { next(new Error('No existe la pregunta con el id' + req.params.preguntaId));}
		}).catch(function(error){next(error);});
	},

	corregirRespuesta: function(req, res) {
		var respuestaVal = (req.query.respuesta) ? req.query.respuesta : undefined,
			resultado = 'Incorrecto';
		if(req.pregunta.respuesta == respuestaVal) {
			resultado = 'Correcto';
		}
		res.json(resultado);
	},
	/*
	miPregunta: function(req, res, next) {
		res.send(req.pregunta.miPregunta());
	},
	*/

	miPregunta: function(req, res, next) {
		Opcion.find({
			where: { pregunta: Number(req.pregunta.id)}
		}).populate('subopcions').then(function(miPregunta){
			var ob = req.pregunta.toJSON();
			ob['opcions'] = miPregunta;
			res.json(ob);
			next();
		}).catch(function(error){next(error);});
	},

	siguiente: function(req, res) {

		/*
		Cuestionario.findOne({
			where: { id: Number(req.cuestionario.id)}
		}).populate('preguntas').then(function(allPreguntas){
			sails.log.verbose(allPreguntas.preguntas[preguntaActual].id);
			siguiente = allPreguntas.preguntas[preguntaActual+1].id;
			sails.log.verbose(siguiente);
		*/

		Pregunta.findOne({
			where: { id : { '>': Number(req.pregunta.id)}}
		}).then(function(allPreguntas){
		
			sails.log.verbose(allPreguntas);
			res.json(allPreguntas);

		});
	},
};

