import express from 'express' 
import dotenv from 'dotenv' 
import app from './app.js'
dotenv.config()
import cluster from 'cluster' 
import os from 'os'

const totalcpu=os.cpus().length  
if(cluster.isPrimary){
    console.log(`Master Process ${process.pid} is running`) 
    
    for(let i=0;i<totalcpu;i++){
        cluster.fork() //creates workers per CPU.
    }
    cluster.on('exit',(worker)=>{
        console.log(`Worker ${worker.process.pid} dead`) 
        cluster.fork()
    })
    cluster.on('online',(worker)=>{
        console.log(`Worker ${worker.process.pid} is online`)
    })
}else{
const server= app.listen(process.env.PORT||8000,()=>{
    console.log(`Worker ${process.pid} running on port ${process.env.PORT} `) 
})
 
 const shutdown=()=>{
    console.log(`Worker ${process.pid} shutting down.`) 
    server.close(()=>{
        console.log(`Worker ${process.pid} closed`)
        process.exit(0)
    })
 }
  process.on('SIGTERM',shutdown) 
  process.on('SIGINT',shutdown)
}





