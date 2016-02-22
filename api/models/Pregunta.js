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

        aJSON: function(cb) {
            
            var PreguntaJSON = this.toJSON();
            return Opcion.find().where({ pregunta: this.id }).populate('subopciones');     
        },

        comprobarRespuesta: function(respuesta, user, cuestionario, pregunta, res){
            switch(this.tipo){
                case "truefalse":

                    this.comprobar_truefalse(respuesta, function cb(puntuacion, texto){
                        Alumno.findOne({
                            where: {user: user}
                        }).then(function(alumno){
                            if(alumno){
                                sails.log.verbose(texto);
                                Respuesta.create({valor: texto, puntuacion: puntuacion, cuestionario: cuestionario, pregunta: pregunta, alumno: alumno.id})
                                .exec(function createCB(err, created){
                                    res.json(created);
                                })

                            }else{
                                sails.log.verbose("No estas autenticado como usuario Alumno");
                            }
                        })
                    });

                    break;

                case "shortanswer":
                    
                    break;
                case "numerical":
                    
                    break;
                case "multichoice":
                    
                    break;
                case "matching":
                    
                    break;
                case "essay":
                
                break;
            }

        },

        comprobar_truefalse: function(respuesta, cb){

            var puntuacion;
            var texto;

            Opcion.findOne({
                where: { id: Number(respuesta)}
                }).populate('subopcions').then(function(misOpciones){

                misOpciones.subopcions.forEach(function(subopcion){
                    
                    sails.log.verbose(subopcion);

                    if(subopcion.nombre === 'fraction'){
                        puntuacion = subopcion.valor;
                    }

                    if(subopcion.nombre === 'text'){
                        texto = subopcion.valor;
                    }
                    cb(puntuacion, texto);
                });
            });
        },

    }
};

