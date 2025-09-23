const express=require('express');
const app=express();
require('dotenv').config();
const cors=require('cors');
app.use(cors()); //to accept the frontend request.

app.get('/api/jokes', (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "Programming Joke",
      joke: "Why do programmers prefer dark mode? Because light attracts bugs!"
    },
    {
      id: 2,
      title: "Math Joke",
      joke: "Why was the equal sign so humble? Because it knew it wasn’t less than or greater than anyone else."
    },
    {
      id: 3,
      title: "Computer Joke",
      joke: "Why did the computer go to the doctor? Because it caught a virus."
    },
    {
      id: 4,
      title: "Dad Joke",
      joke: "I only know 25 letters of the alphabet. I don’t know y."
    },
    {
      id: 5,
      title: "Work Joke",
      joke: "Why don’t scientists trust atoms? Because they make up everything!"
    },
    {
      id: 6,
      title: "School Joke",
      joke: "Why was the math book sad? Because it had too many problems."
    },
    {
      id: 7,
      title: "Animal Joke",
      joke: "Why don’t cows have any money? Because the farmers milk them dry."
    },
    {
      id: 8,
      title: "Food Joke",
      joke: "Why did the scarecrow win an award? Because he was outstanding in his field."
    },
    {
      id: 9,
      title: "Tech Joke",
      joke: "Why did the developer go broke? Because he used up all his cache."
    },
    {
      id: 10,
      title: "Knock-Knock Joke",
      joke: "Knock knock. Who’s there? Cow says. Cow says who? No silly, cow says moooo!"
    }
  ];

  res.send(jokes);
});
const port=process.env.PORT;
app.listen(port||4000,()=>{
    console.log(`The Server is running at the port:${port}`);
});