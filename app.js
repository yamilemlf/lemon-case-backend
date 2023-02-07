const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const port = 3000
const { eligibilityController } = require('./src/controllers/eligibilityController')

app.use('/eligibilityTest', router.post('/', jsonParser, eligibilityController.post))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})