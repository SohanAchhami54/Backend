import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';

function App() {
const [add,setAdd]=useState(0);
const [substract,setSubstract]=useState(10);
const [jokes,setJokes]=useState(null);

//function to fetch the jokes.
const fetchJokes=async ()=>{
   const response= await axios.get('/api/jokes');
   setJokes(response.data);
}
useEffect(()=>{
  fetchJokes();
},[]);

 //this is add function
const handleClickAdd=()=>{
  if(add<20){
    setAdd(add+1);
  }
}
//this is substract function
 const handleClickSubstract=()=>{
  if (substract>0){
     setSubstract(substract-1);
  }
 }

  return (
    <div className='bg-gray-900 min-h-screen'>
     <h1 className='text-3xl text-amber-700'>My name is sohan achhami.</h1>
     <button onClick={handleClickAdd}
     className='mt-10 ml-10 text-2xl bg-amber-200 p-3 rounded-xl border'>Click me {add} </button>
     <button onClick={handleClickSubstract}
     className='mt-10 ml-10 text-2xl bg-amber-200 p-3 rounded-xl border'>Click me {substract} </button>

    <ul className='grid grid-cols-3 gap-5 m- p-5'>
      {
        jokes&& jokes?.map((jokes)=>{
          return (
            <li key={jokes.id} className='text-white'>
              <div className='rounded-sm shadow-2xl bg-gray-700 min-h-20
                  hover:scale-101 transition-all duration-150 ease-in-out delay-150 '>
              <h1 className='underline'>{jokes.id}: {jokes.title} </h1>
              <h2>{jokes.joke}</h2>
              </div>
              
            </li>
          )
        })
      }
    </ul>
    
    </div>
  )
}

export default App
