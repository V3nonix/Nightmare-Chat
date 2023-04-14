const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Checks for the token in Authorization header OR query param:
  let token = req.get('Authorization') || req.query.token;
  if (token) {
    // Removes the 'Bearer ' if it is present:
    token = token.replace('Bearer ', '');
    // Checks token validity (expiration):
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      // If valid token, decodes user from token...
      // Else throws error:
      req.user = err ? null : decoded.user;  
      // If your app cares... (optional)
      req.exp = err ? null : new Date(decoded.exp * 1000);  
      return next();
    });
  } else {
    // No token:
    req.user = null;
    return next();
  }
};