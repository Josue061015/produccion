  module.exports = function(role) {
    return (req, res, next) => {
      const userRole = req.user.role;  // El rol viene del token JWT que ya verificaste
  
      if (userRole !== role) {
        return res.status(403).json({ message: 'Acceso denegado: no tienes permisos suficientes' });
      }
  
      next();  // Si el rol es correcto, continuar a la siguiente función
    };
  };
  