import mongoose from "mongoose"
import { User } from "../models/user.model.js"
import { Like } from "../models/like.model.js"

const userAggregate = async(username,userid)=>{
   const channel = await User.aggregate([
    {
        $match:{username:username?.toLowerCase()}, 
    },{
        $lookup:{ //channel subscribers
            from:'subscriptions',
            localField:'_id', 
            foreignField:'channel',
            as:'subscribers'
        }
    },{
        $lookup:{ //channelsubscribeto
            from:'subscriptions', 
            localField:'_id', 
            foreignField:'subscriber',
            as:'subscribed'
        }
    },{
        $addFields:{
            subscribercount:{
                $size:'$subscribers'
            },
            channelSubscribeTo:{
                $size:'$subscribed'
            },
            isSubscribed:{
                $cond:{
                    if:{$in:[userid,'$subscribers.subscriber']}, 
                    then:true, 
                    else:false
                }
    }}
    },{
        $project:{ 
            fullName:1, 
            username:1, 
            subscribercount:1, 
            channelSubscribeTo:1,
            isSubscribed:1, 
            avatar:1, 
            coverimage:1,
            email:1,
        }
    }
   ])
   return channel[0]
}

const watchHistoryAggregate=async(userid)=>{
   const user= await User.aggregate([
    {
        $match:{_id:new mongoose.Types.ObjectId(userid)}
        
    },{
        $lookup:{
            from:'videos',
            localField:'watchHistory', 
            foreignField:'_id', 
            as:'watchHistory',
            pipeline:[
                {
                    $lookup:{
                        from:'users',
                        localField:'owner', 
                        foreignField:'_id', 
                        as:'owner',
                        pipeline:[
                            {
                                $project:{
                                    fullName:1, 
                                    username:1, 
                                    avatar:1
                                }
                            }
                        ]
                    }
                },
                {
                    $addFields:{
                        owner:{
                            $first:'$owner'
                        }
                    }
                }
            ]
        }
    }
   ])
   return user[0]
}



const allLikeVideo= async(userId)=>{
    const likeVideo= await Like.aggregate([
        {
            $match:{
                likedBy:userId, 
                video: {$exists:true}
            }
        },

        {
            $lookup:{
                from:'videos', 
                localField:'video',
                foreignField:'_id',
                as:'video'
            }
        },
        
    ])
    return likeVideo[0]
}



export {userAggregate,watchHistoryAggregate,allLikeVideo}