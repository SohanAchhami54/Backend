class ApiError extends Error{
    constructor(message,statusCode,errors=[],stack){ 
     super(message) 
     this.statusCode=statusCode 
     this.errors=errors 
     this.stack=stack
     this.success=false
    }
}
