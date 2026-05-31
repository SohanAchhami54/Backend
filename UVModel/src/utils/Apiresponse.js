class Apireponse  {
    constructor(message,data,statusCode){
        this.message=message 
        this.data=data 
        this.statusCode=statusCode 
        this.success=statusCode<400
    }
}