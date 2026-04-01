import React, { useEffect, useState } from 'react'
import Axios from './api/axios'
import { fetchJokes } from './services/joke'
const App = () => {
  const [jokes,setJokes]=useState([])

   useEffect(()=>{
      const getJokes=async()=>{
          const response=await fetchJokes()
          setJokes(response.data)
      }
       getJokes()
   },[])
   console.log('the value of jokes is:',jokes)
  return (
   <>
   <div className='mx-10 my-5'>


     <h1 className='text-xl bg-blue-400 mt-3'>Hello This is jokes</h1>
     <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-6'>
       {
        jokes.map((joke)=>{
          return (
            <li key={joke.id} className='bg-gray-700 text-white text-sm sm:text-base'>
              <div className='m-4 bg-neutral-600 h-50 space-y-8'>
               <h1>{joke.id} </h1>
                 <p>{joke.title} </p>
                 <p>{joke.joke} </p>
              </div>
                 
            </li>
          )
        })
       }
     </ul>
     <div className='flex gap-2'>
        <button className='px-2 text-white rounded border-2 border-black bg-blue-600 mt-2'>Previous</button>

     <button className='px-2 text-white rounded border-2 border-black bg-blue-600 mt-2'>Next</button>
     </div>
    
         </div>
   </>

  )
}
export default App
