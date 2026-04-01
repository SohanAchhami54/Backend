import  Axios  from "../api/axios"

const fetchJokes=async()=>{
   const response=await Axios.get('/jokes')
   return response
}
export {fetchJokes}