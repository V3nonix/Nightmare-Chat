const jwt = require('jsonwebtoken');

module.exports = function(socket, next) {
    const { token } = socket.handshake.auth;
    if (!token) {
      return next(new Error('No token present!'));
    }
    try {
      const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET);
      socket.user = decoded.user;  
      socket.exp = new Date(decoded.exp * 1000);  
      return next();
    } catch (err) {
      return next(new Error('Invalid token!'));
    }
  };