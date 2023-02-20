module.exports.centralErrorHandler = (e, req, res, next) => {
    const { statusCode = 500, message } = e;

    res.status(statusCode).send({
        message:
            statusCode === 500 ? "An error has occured on the server" : message,
    });
};
