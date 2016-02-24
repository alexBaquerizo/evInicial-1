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

                    this.comprobar_truefalse(respuesta, function (puntuacion, texto){
                        Alumno.findOne({
                            where: {user: user}
                        }).then(function(alumno){
                            if(alumno){
                                console.log('------------');
                                sails.log.verbose(texto, puntuacion);
                                console.log('------------');
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

                case "numerical":

                    this.comprobar_numerical(respuesta, function (puntuacion, texto){
                        Alumno.findOne({
                            where: {user: user}
                        }).then(function(alumno){
                            if(alumno){
                                console.log('------------');
                                sails.log.verbose(texto, puntuacion);
                                console.log('------------');
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

                case "multichoice":

                    this.comprobar_multichoice(respuesta, function (puntuacion, texto){
                        Alumno.findOne({
                            where: {user: user}
                        }).then(function(alumno){
                            if(alumno){
                                console.log('------------');
                                sails.log.verbose(texto, puntuacion);
                                console.log('------------');
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

                case "matching":

                    this.comprobar_matching(respuesta, function (puntuacion, texto){
                        Alumno.findOne({
                            where: {user: user}
                        }).then(function(alumno){
                            if(alumno){
                                console.log('------------');
                                sails.log.verbose(texto, puntuacion);
                                console.log('------------');
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

                case "essay":

                   this.comprobar_essay(respuesta, function (puntuacion, texto){
                        Alumno.findOne({
                            where: {user: user}
                        }).then(function(alumno){
                            if(alumno){
                                console.log('------------');
                                sails.log.verbose(texto, puntuacion);
                                console.log('------------');
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
            }

        },

        /** true-false **/

        comprobar_truefalse: function(respuesta, cb){

            var puntuacion;
            var texto;

            Opcion.findOne({
                where: { id: Number(respuesta)}
                }).populate('subopcions').then(function(misOpciones){

                misOpciones.subopcions.forEach(function(subopcion){
                    
                    sails.log.verbose(subopcion);

                    if(subopcion.nombre === 'fraccion'){
                        puntuacion = subopcion.valor;
                    }

                    if(subopcion.nombre === 'text'){
                        texto = subopcion.valor;
                    }
                
                });

                cb(puntuacion, texto);
            });
        },

        /** multichoice - luis **/

        comprobar_multichoice: function(respuesta, cb){

            Subopcion.findOne({
                where: {opcion: Number(respuesta), nombre: "fraccion"}
            }).then(function(subopcion){
                var puntuacion = subopcion.valor;
                Subopcion.findOne({
                    where: {opcion: Number(respuesta), nombre: "text"}
                }).then(function(subopcion){
                    var texto = subopcion.valor;
                    cb(puntuacion, texto);
                })  
            });
        },

        /** numerical - lenin y osmar **/

        comprobar_numerical: function(respuesta, cb) {
            var guardavalor1;
            var guardavalor2;

            Opcion.findOne({
                where: { id: Number(respuestaRec) }
            }).populate('subopciones').then(function(opcion){
                    //console.log(opcion.subopciones); 
                opcion.subopciones.forEach(function(subopcion){
                    //De opcion entro a subopciones y con el forEach recorro en subopciones una subopcion
                    if(subopcion.nombre=='fraccion'){
                        guardavalor1=subopcion.valor; //guardo el valor de fraccion
                        //sails.log.verbose(guardavalor1);
                    }
                    if(subopcion.nombre=='text'){
                        guardavalor2=subopcion.valor; //guardo el valor de texto
                        //sails.log.verbose(guardavalor2);
                    }
                })

                cb(guardavalor1, guardavalor2);

            })
        },

         /** essay - adrian **/

        comprobar_essay: function(respuesta, cb) {
        
            var valor1;
            var valor2;
                
            Opcion.findOne({
                where: { id: Number(respuestaRecibida) }
            }).populate('subopciones').then(function(opcion){
                    
                opcion.subopciones.forEach(function(subopcion){
                    
                    if(subopcion.nombre=='responserequired'){
                        valor1=subopcion.valor; 
                        
                    }
                    if(subopcion.nombre=='responsefieldlines'){
                        valor2=subopcion.valor; 
                        
                    }

                    cb(valor1, valor2);
            });
        },

        /** matching - antonio **/

        comprobar_matching: function(respuesta, cb) {

            Incremento = 0;
            Puntos = 0;

            // Cliente envia ID de la 'subquestion' y el ID de la subopcion 'answer'.

            Opcion.find().where({ pregunta: req.pregunta.id, tipoOpcion: 'subquestion' }).populate('subopciones')
                .then(function(opciones){
                        
                    Puntos = 0;
                    Incremento = Math.floor(100 / opciones.length);

                    for ( i = 0 ; i < Answered.length ; i += 2 ) {
                            for ( n = 0 ; n < opciones.length ; n++ ) {
                                    if ( Answered[i] == opciones[n].subopciones[0].valor && 
                                             Answered[i+1] == opciones[n].subopciones[1].valor ) {

                                            Puntos += Incremento;
                                    }
                            }
                    }

                    cb(Puntos, respuesta);
                        
                }).catch(function(error){console.log(error);});
                
        },

    }
};

