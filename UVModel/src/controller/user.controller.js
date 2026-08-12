  import { createUser, findUserByEmailorName, findUserForAccountUpdate, findUserId, generateAccessandRefreshToken, logoutUser, saveNewPassword, updateImageUrl, updateUserDetails, userDetails } from '../services/auth.js'
  import { userAggregate, watchHistoryAggregate } from '../services/pipeline.js'
  import { Apierror } from '../utils/Apierror.js'
  import { Apiresponse } from '../utils/Apiresponse.js'
  import {Asyncerror} from '../utils/Asyncerror.js'
  import { verifyRefreshToken } from '../utils/auth.js'
  import { deleteFromCloudinary, uploadonCloudinary } from '../utils/cloudinary.js'

  const userRegister=Asyncerror(async(req,res,next)=>{
    
    const {fullname,email,username,password}=req.body  

    //all field are required.
    if([fullname,email,username,password].some((field)=>!field || field.trim()==="")){
        throw new Apierror(400,'All field are required') 
    }
      
    //find existingUser
    const existingUser=await findUserByEmailorName(email,username) 
    if(existingUser)  throw new Apierror(409,'User already Created.')
    
  
  // avatar and coverageimage
    const avatarlocalpath= req.files?.avatar?.[0]?.path  
    const coveragelocalpath= req.files?.coverimage?.[0]?.path
    
    if(!avatarlocalpath) throw new Apierror(400,'AvatarLocalfiles not found.')
    

    //cloudinary upload.
    const avatar= await uploadonCloudinary(avatarlocalpath) 
    const coverimage= await uploadonCloudinary(coveragelocalpath) 

    if(!avatar) throw new Apierror(400,'Avatar file is required')
    
    
    const user= await createUser(fullname,email,username,password,avatar,coverimage) 

    const createdUser= await userDetails(user._id)  
    if(!createdUser) throw new Apierror(500,'User not Created.')
    

    return res.status(201).json(new Apiresponse(200,createdUser,'User Register.'))

  }) 

  const userLogin=Asyncerror(async(req,res,next)=>{
    const {email,username,password}=req.body  

    if(!email && !username) throw new Apierror(400,'username or email is required')
    
    //find User
    const existingUser= await findUserByEmailorName(email,username) 
    if(!existingUser) throw new Apierror(404,'User doesnot exists cannot login') 

    //password check
    const isPasswordMatch=await existingUser.comparePassword(password) 
    if(!isPasswordMatch) throw new Apierror(401,'Password do not match')

    //access and refresh token 
    const {accesstoken,refreshtoken}=await generateAccessandRefreshToken(existingUser._id)
    
    const userLogin=await  userDetails(existingUser._id)

    const options={
      httpOnly:true,
      secure:true, 
      sameSite:'strict'
    }
    return res.status(200)
    .cookie('accessToken',accesstoken,options) 
    .cookie('refreshToken',refreshtoken,options)
    .json(
      new Apiresponse(
        200,
        {
          user:userLogin,accesstoken,refreshtoken
        },
        "User logged In"
      )
    )
  })

  const userLogout=Asyncerror(async(req,res)=>{ 
    await logoutUser(req.user._id)
      const options={
      httpOnly:true,
      secure:true, 
      sameSite:'strict'
    }

    return res.status(200)
    .clearCookie('accessToken',options)
    .clearCookie('refreshToken',options) 
    .json(new Apiresponse(200,{},'User logged out successfully'))

  })

  const generateNewAccessRefreshToken=Asyncerror(async(req,res)=>{
    const incomingRequestToken=req.cookies.refreshToken || req.body.refreshToken 
    if(!incomingRequestToken) throw new Apierror(401,'Token is invalid') 
      
    const decodedRefreshToken= verifyRefreshToken(incomingRequestToken) 

    //now we get the email and id through which we generate refreshtoken 
    const user=await findUserId(decodedRefreshToken._id)  
    if(!user) throw new Apierror(401,'Invalid refresh Token')

    if(incomingRequestToken!==user.refreshToken){
      throw new Apierror(400,'Token do not match')
    }
    
    const {accesstoken:newAccesstoken,refreshtoken:newRefreshtoken}=await generateAccessandRefreshToken(user._id) 
      
    const options={
      httpOnly:true, 
      secure:true,
      sameSite:'strict'
    }
    
    return res.status(200)
    .cookie('accessToken',newAccesstoken,options) 
    .cookie('refreshToken',newRefreshtoken,options) 
    .json(
        new Apiresponse(200,
          {accesstoken:newAccesstoken ,refreshtoken:newRefreshtoken},
      'New tokens are generated.'
    ))



  }) 

  const changePassword=Asyncerror(async(req,res)=>{
    const {oldPassword,newPassword,confirmPassword}=req.body  
    if(!newPassword || !confirmPassword) throw new Apierror(400,'New password is required.')

    if(newPassword!==confirmPassword) throw new Apierror(400,'Password do not match') 

    const user=await findUserId(req.user._id) 
    if(!user) throw new Apierror(404,'User not found') 

    const isPasswordCorrect = await user.comparePassword(oldPassword)
    if(!isPasswordCorrect) throw new Apierror(400,'Invalid Password') 

    await saveNewPassword(user,newPassword) 

    return res.status(200).json(new Apiresponse(200,{},'Password Change Successfully'))
  }) 

  const getCurrentUser=Asyncerror(async(req,res)=>{
    return res.status(200)
    .json(new Apiresponse(200,{userinfo:req.user},'Current User fetch successfully')) 
  })

  const updateAccountDetails=Asyncerror(async(req,res)=>{
    const fullname=req.body.fullname?.trim() 
    const email= req.body.email?.trim()
    if((!fullname || !email)) throw new Apierror(400,'All fields are required')  


    const existingUser = await findUserForAccountUpdate(req.user._id,email) 
    if(existingUser) throw new Apierror(409,'User with this email already exists')


    const user= await updateUserDetails(req.user._id, fullname,email) 
    if(!user) throw new Apierror(400,'user fail to updated.')
    

    return res.status(200) 
    .json(new Apiresponse(200,{user},'User Details update successfully.'))
  })

  const updateAvatarImage=Asyncerror(async(req,res)=>{
    const avatarlocalpath=req.file?.path 
    if(!avatarlocalpath) throw new Apierror(400,'Avatar path is not available') 
   
    const user= await findUserId(req.user._id) 
    if(!user) throw new Apierror(400,'User not found') 
    const oldAvatar=user.avatar

    const avatarImage = await uploadonCloudinary(avatarlocalpath) 
    if(!avatarImage) throw new Apierror(400,'Avatar image is not upload on cloudinary') 
    
    const updatedUser= await updateImageUrl(req.user?._id,avatarImage.url)
    if(!updatedUser) throw new Apierror(409,'User not updated')   

    if(oldAvatar){
      await deleteFromCloudinary(oldAvatar)
    } 

    return res.status(200)
    .json(new Apiresponse(200,updatedUser,'User avatar updated'))
  })


  const updateCoverImage=Asyncerror(async(req,res)=>{
    const coverlocalpath=req.file?.path 
    if(!coverlocalpath) throw new Apierror(400,'CoverImage path is not available') 

     const user= await findUserId(req.user._id) 
    if(!user) throw new Apierror(400,'User not found') 
    const oldAvatar=user.coverimage

    const coverImage = await uploadonCloudinary(coverlocalpath) 
    if(!coverImage) throw new Apierror(400,'Cover image is not upload on cloudinary') 

    const updatedUser = await updateImageUrl(req.user._id,coverImage.url) 
    if(!updatedUser) throw new Apierror(409,'User not updated')
      
     if(oldAvatar){
      await deleteFromCloudinary(oldAvatar)
    } 
      
    return res.status(200). 
    json(new Apiresponse(200,user,'User cover updated'))
  })

  const getChannelInfo=Asyncerror(async(req,res)=>{
    const {username}=req.params  
    if(!username.trim()) throw new Apierror(400,'Username not defined') 

   const channel = await userAggregate(username,req.user?._id)  
   console.log('channel name is:',channel)
   if(!channel?.length) throw new Apierror(404,'Channel does not exist') 

   return res.status(200) 
   .json(new Apiresponse(200,channel,'Channel info fetched successfully'))
  }) 
 
  const getWatchHistory=Asyncerror(async(req,res)=>{ 
    const userid=req.user?._id 
    if(!userid) throw new Apierror(400,'User id not found')

    const user= await watchHistoryAggregate(userid) 
    if(!user) throw new Apierror(404,'Watchhistory not found')   

    return res.status(200)
    .json(new Apiresponse(200,user.watchHistory,'Watch history fetched successfully'))
  })


  export {userRegister,userLogin,userLogout,changePassword,generateNewAccessRefreshToken,getCurrentUser,updateAccountDetails,updateAvatarImage,updateCoverImage}