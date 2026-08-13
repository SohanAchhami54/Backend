import { connectSql } from "../db/mysql.js"

const findUserByEmail=async(email)=>{
   const [user]=await connectSql.query(
    'SELECT * FROM users WHERE  email = ?',
    [email]
   ) 
   return user[0]
}

const createUser=async(name,email,address)=>{
     const [result] = await connectSql.query(
    'INSERT INTO users (name, email, address) VALUES (?, ?, ?)',
    [name, email, address]) 
    return result
}

export {findUserByEmail,createUser}