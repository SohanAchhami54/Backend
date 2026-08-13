class Apierror extends Error{
    constructor(statusCode,message="Something went wrong",error=[],stack){
        super(message)  
        this.statusCode=statusCode 
        this.error=error 
        this.stack=stack 
        this.success=false
    }
}
export {Apierror}