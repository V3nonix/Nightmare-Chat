module.exports = function(req, res, next) {
    // If no valid user exists, throw Unauthorized status:
    if (!req.user) return res.status(401).json('Unauthorized');
    // Otherwise continue to next:
    next();
};