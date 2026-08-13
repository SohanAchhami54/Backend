const errorMiddleware=(err,req,res,next)=>{
  const statusCode=err.statusCode || '400'
  const message=err.message || 'Internal Error' 
  return res.status(200).json({
    success:'false', 
    message, 
    errors: err.error || []
  })
}
export {errorMiddleware}