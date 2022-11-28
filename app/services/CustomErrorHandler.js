class CustomErrorHandler extends Error {
    constructor(status, msg) {
      super();
      this.status = status;
      this.message = msg;
    }
  
    static alreadyExist(message = 'Already Exists') {
      return new CustomErrorHandler(409, message);
    }
  
    static wrongCredentials(message = 'Wrong Credentials!') {
      return new CustomErrorHandler(400, message);
    }
  
    static unAuthorized(message = 'unAuthorized') {
      return new CustomErrorHandler(401, message);
    }
  
    static notFound(message = '404 Not Found') {
      return new CustomErrorHandler(404, message);
    }
  
    static unavailable(message = '410 no longer available') {
      return new CustomErrorHandler(410, message);
    }
  
    static serverError(message = 'Internal server error') {
      return new CustomErrorHandler(500, message);
    }
  }
  export default CustomErrorHandler;