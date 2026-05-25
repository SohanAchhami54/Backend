const results = []

for (let i = 1; i <= 1000; i++) {
  results.push(
    fetch(`http://localhost:3000/`)
      .then(res => res.text())
      .then(data => console.log(`Request ${i}: ${data}`))
  )
}

await Promise.all(results)