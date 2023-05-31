const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Internal Server Error';
  
    switch (err.message) {
      case 'No token, authorization denied':
        statusCode = 401;
        message = 'No token, authorization denied';
        break;
      case 'Token is not valid':
        statusCode = 401;
        message = 'Token is not valid';
        break;
      case 'Not found':
        statusCode = 404;
        message = 'Not found';
        break;
      case 'Bad parameter':
        statusCode = 400;
        message = 'Bad parameter';
        break;
      default:
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
          statusCode = 400;
          message = 'Bad Request';
        }
        break;
    }
  
    res.status(statusCode).json({ msg: message });
  };

  app.use(errorHandler);
  