class Apierror extends Error{
    constructor(message,statusCode,error=[],stack){
        super(message) 
        this.statusCode=statusCode 
        this.error=error 
        this.stack=stack
        this.success=false
    }
}
