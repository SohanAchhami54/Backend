const errorMiddleware=(err,req,res,next)=>{
    const statusCode=err.statusCode || '400' 
    const message= err.message || 'Internal Server error' 
    return res.status(statusCode).json({
        success:'false',
        message, 
        errors:err.error || []
    })
}

export {errorMiddleware}