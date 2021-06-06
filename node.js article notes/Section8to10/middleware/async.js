function asyncMiddleware(handler){
    return async (req,res, next) => { // Standard express route handler
      try{
        await handler(req, res);
      }
      catch(ex){
        next(ex)
      }
    }
  }

module.exports = asyncMiddleware