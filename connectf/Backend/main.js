import express from 'express' 
import dotenv from 'dotenv' 
import cors from 'cors'
dotenv.config() 

const app=express() 
const corsheader={
    origin:'http://localhost:5173',
    methods:['GET','POST','DELETE','PUT'],
    credentials:true
}
app.use(cors(corsheader))
app.get('/jokes',(req,res)=>{
   const jokes = [
  { id: 1, title: "Programmer Joke", joke: "Why do programmers prefer dark mode? Because light attracts bugs." },
  { id: 2, title: "Array Joke", joke: "Why did the array break up with the object? It needed more space." },
  { id: 3, title: "CSS Joke", joke: "Why was the CSS developer sad? Because he had too many class issues." },
  { id: 4, title: "JavaScript Joke", joke: "Why did JavaScript go to therapy? Because it had too many callbacks." },
  { id: 5, title: "HTML Joke", joke: "Why did HTML break up with CSS? Because CSS kept styling other elements." },
  { id: 6, title: "Debugging", joke: "Debugging: Being the detective in a crime movie where you are also the criminal." },
  { id: 7, title: "Computer Joke", joke: "Why did the computer show up at work late? It had a hard drive." },
  { id: 8, title: "Keyboard Joke", joke: "Why did the keyboard get promoted? Because it had great CTRL." },
  { id: 9, title: "Server Joke", joke: "Why did the server go broke? Because it lost its cache." },
  { id: 10, title: "Database Joke", joke: "Why do databases love relationships? Because they are relational." },
  { id: 11, title: "Git Joke", joke: "Why did the developer go broke? Because he used git push --force too much." },
  { id: 12, title: "Python Joke", joke: "Why did Python live at the beach? Because it loved indentation." },
  { id: 13, title: "Variable Joke", joke: "Why did the variable break up with the constant? Because it needed some space." },
  { id: 14, title: "Frontend Joke", joke: "Why did the frontend developer go broke? Because he used float too much." },
  { id: 15, title: "Backend Joke", joke: "Why did the backend developer get lost? Because he forgot to handle routes." },
  { id: 16, title: "Null Joke", joke: "Why did the object break up with null? It felt empty inside." },
  { id: 17, title: "Framework Joke", joke: "Why did the framework break up with the library? Because it needed structure." },
  { id: 18, title: "Compiler Joke", joke: "Why was the compiler so strict? It couldn't tolerate mistakes." },
  { id: 19, title: "Stack Joke", joke: "Why did the stack get promoted? Because it always followed LIFO." },
  { id: 20, title: "Queue Joke", joke: "Why was the queue always calm? Because it knew its place in line." },
  { id: 21, title: "Regex Joke", joke: "Why do programmers hate regex? Because it’s a hairy nightmare." },
  { id: 22, title: "Algorithm Joke", joke: "Why did the algorithm break up with the data? It couldn't find a match." },
  { id: 23, title: "Function Joke", joke: "Why did the function go to therapy? It had too many arguments." },
  { id: 24, title: "Object Joke", joke: "Why did the object get a promotion? Because it had all the right properties." },
  { id: 25, title: "API Joke", joke: "Why did the API break up with the frontend? Too many requests." },
  { id: 26, title: "Server Joke", joke: "Why did the server get fired? It couldn’t handle the load." },
  { id: 27, title: "Bug Joke", joke: "Why did the bug go to school? To learn how to hide better." },
  { id: 28, title: "Promise Joke", joke: "Why did the promise feel lonely? Because it was never resolved." },
  { id: 29, title: "Async Joke", joke: "Why did async feel tired? Because it was always waiting." },
  { id: 30, title: "Loop Joke", joke: "Why did the loop break up? It was stuck in a cycle." },
  { id: 31, title: "Boolean Joke", joke: "Why was the boolean sad? It felt true love was false." },
  { id: 32, title: "Memory Joke", joke: "Why did the memory get stressed? Too many references." },
  { id: 33, title: "Cache Joke", joke: "Why was the cache nervous? Because it didn’t want to forget." },
  { id: 34, title: "Node Joke", joke: "Why did Node.js break up with PHP? Too much blocking." },
  { id: 35, title: "Git Merge Joke", joke: "Why did the branch go to therapy? It couldn’t merge its feelings." },
  { id: 36, title: "Debugger Joke", joke: "Why did the debugger break up with the program? Too many breakpoints." },
  { id: 37, title: "Cloud Joke", joke: "Why did the developer go to the cloud? Because storage was unlimited." },
  { id: 38, title: "JSON Joke", joke: "Why did JSON feel incomplete? It was missing some keys." },
  { id: 39, title: "Boolean Joke", joke: "Why did the Boolean fail his exam? He kept flipping." },
  { id: 40, title: "Framework Joke", joke: "Why did the framework go to therapy? Too many dependencies." },
  { id: 41, title: "Recursion Joke", joke: "To understand recursion, you must first understand recursion." },
  { id: 42, title: "Frontend Joke", joke: "Why did the HTML file look sad? Because it was full of empty divs." },
  { id: 43, title: "Backend Joke", joke: "Why did the database break up with SQL? Too many constraints." },
  { id: 44, title: "Git Commit Joke", joke: "Why did the developer get stressed? He forgot to commit his feelings." },
  { id: 45, title: "Exception Joke", joke: "Why did the exception get thrown? It couldn’t handle the pressure." },
  { id: 46, title: "404 Joke", joke: "Why did the page break up? It couldn’t find the other." },
  { id: 47, title: "Loop Joke", joke: "Why did the loop go to therapy? It was going in circles." },
  { id: 48, title: "Debugger Joke", joke: "Why did the debugger cry? Too many errors to catch." },
  { id: 49, title: "Binary Joke", joke: "There are 10 types of people: Those who understand binary and those who don’t." },
  { id: 50, title: "Version Control Joke", joke: "Why did the developer love version control? Because it always keeps history." },
];
    res.send(jokes)
})

app.listen(process.env.PORT ||3000,()=>{
     console.log(`Server is running at the port:${process.env.PORT}`)
})

