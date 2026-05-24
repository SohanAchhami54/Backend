import mongooseAggregatePagination from 'mongoose-aggregate-paginate-v2'
import mongoose from 'mongoose' 
import bcrypt from 'brcypt'
import jwt from 'jsonwebtoken'
const userSchema=new mongoose.Schema({
    username:{
        type:String, 
        required:true,
    
    }, 
    email:{
        type:String, 
        required:true, 
        unique:true,
        index:true

    },
    watchHistory:[{
       type:mongoose.Schema.Types.ObjectId, 
       ref:'Video'
    }],
    fullname:{
        type:String , 
        required:true,   
    }, 
    avatar:{
        type:String, 
        required:true, 
    }, 
    coverimage:{
        type:String, 
        required:true, 
    }, 
    password:{
        type:String, 
        required:true, 
    }
},{timestamps:true})

userSchema.plugin(mongooseAggregatePagination)

userSchema.pre('save',async function(next){
    if(!this.password(this.isModified)) return next()
    await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.comparePassword=async function (password){
    await bcrypt.compare(this.password,password)
}

userSchema.methods.generateAccessToken=function (){
    jwt.sign(
        {
            _id:this._id, 
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET, 
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRE
      })
}

userSchema.methods.generateRefreshToken=function (){
    jwt.sign( 
        {
            _id:this._id, 
            email:this.email
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRE
        }
    )
}

export const User=mongoose.model('User',userSchema)

