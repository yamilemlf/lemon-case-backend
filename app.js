const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const port = 3000
const { eligibilityController } = require('./controllers/eligibilityController.js')

app.use("/eligibilityTest", router.post("/", jsonParser, eligibilityController.post ))

app.get('/eligibilityTest', (req, res) => {
  res.send('Teste de elegibilidade')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})