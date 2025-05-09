const express = require('express')
const app = express()
const PORT = 5000

app.get('/', (req, res) => {
  res.send('API está a funcionar 🚀')
})

app.listen(PORT, () => {
  console.log(`Servidor backend a correr na porta ${PORT}`)
})
