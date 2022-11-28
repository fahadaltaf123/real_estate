// import { ValidationError } from 'joi';
import CustomErrorHandler from '../../services/CustomErrorHandler.js';

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let data = {
    status: 500,
    message: 'Internal server error'
  }

//   if (err instanceof ValidationError) {
//     statusCode = 422;
//     data = err.message;
//   }

  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    data = {
      status: err.status,
      message: err.message
    }
  }

  return res.status(statusCode).json(data)
}

export default errorHandler;