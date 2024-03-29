const { NotFoundError } = require('../../utils/errors');

function notFoundMiddleware(req, res, next) {
    next(new NotFoundError(`${req.method} ${req.url} was not found`))
}

module.exports = notFoundMiddleware