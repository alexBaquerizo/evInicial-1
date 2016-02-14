/**
* Pregunta.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    enunciado : {
    	type: 'string',
    	size: 45,
	},

    tipo : {
        type: 'string',
        enum: ['truefalse', 'shortanswer', 'numerical', 'multichoice', 'matching', 'essay']
    },

    cuestionarios : {
        collection : 'cuestionario',
        via : 'preguntas'
    },

    respuestas : {
        collection : 'respuesta',
        via : 'pregunta'
    },

    opcions : {
        collection : 'opcion',
        via : 'pregunta'
    },

    miPregunta: function () {
        return this.toJSON();

    },

  }
};

