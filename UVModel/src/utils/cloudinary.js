import dotenv from 'dotenv' 
dotenv.config()
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadonCloudinary=async(filepath)=>{
    try {
        if (!filepath) return null 
        const response=await cloudinary.uploader.upload(filepath,{
        resource_type:'auto'
    }) 
    // console.log('Url of the image is:',response.url) 
    fs.unlinkSync(filepath)
    return response

    } catch (error) {
        console.log('Cloudinary error:',error)
        fs.unlinkSync(filepath) 
        return null
    }
}
export {uploadonCloudinary}
