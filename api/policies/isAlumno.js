
module.exports = function isAlumno (req, res, next) {

  Role.findOne({
  	where: {name: 'alumno'}
  }).populate('users',{id: req.session.passport.user})
  .then(function(alumno){
  	if(alumno){
  		return next();
  	}else{
  		return res.forbidden('You are not permitted to perform this action.');
  	}
  })

};