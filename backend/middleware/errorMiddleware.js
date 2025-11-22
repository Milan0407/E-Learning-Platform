const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Standardize error response
    const error = {
        message: err.message || 'Internal Server Error',
        status: err.status || 500
    };

    // Handle specific types of errors
    if (err.name === 'ValidationError') {
        error.status = 400;
    } else if (err.name === 'UnauthorizedError') {
        error.status = 401;
    }

    res.status(error.status).json({ msg: error.message });
};

module.exports = errorHandler;