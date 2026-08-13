import mysql from 'mysql2/promise' 
import dotenv from 'dotenv' 

dotenv.config() 

const connectSql= mysql.createPool({ 
    host:process.env.DB_HOST, 
    user:process.env.DB_USER, 
    password:process.env.DB_PASSWORD, 
    database:process.env.DB_NAME, 
    port:process.env.DB_PORT,
})

async function connection(){
    try {
        const connect=await connectSql.getConnection() 
        connect.release()
    } catch (error) {
        console.error('Database connection failed',error.message) 
        process.exit(1)
    }
}

export {connection,connectSql} 