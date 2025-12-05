import { useQuery } from '@tanstack/react-query'

const Jokes = () => {
 const {data,isLoading,error} = useQuery({
    queryKey: ['jokes'],
    queryFn: () => {
    return fetch('/api/jokes')
        .then(res => {
            return res.json()       
})}})

 if(isLoading){
    return (
        <div>
            <h1>This page is loading please wait</h1>
        </div>
    )
 }
 
 if(error){
    return(
        <div>
            <h1>Error occur: {error.message}</h1>
        </div>
    )
 }
 
  return (
    <div className='min-h-screen bg-gray-500'>
      <h1 className='text-3xl text-center'>This is universe of the jokes.</h1>
      <p className='text-2xl text-center'>The total number of the jokes is: {data.length}</p>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-10'>
        {
          data.map((joke) => (
             <li key={joke.id} className='bg-amber-800 m-3 p-3 transition-all duration-200 hover:scale-105'>
                 <h2>{joke.id}</h2>
                 <p>{joke.title}</p>
                 <p>{joke.data}</p>
                 <p>{joke.joke}</p>
             </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Jokes