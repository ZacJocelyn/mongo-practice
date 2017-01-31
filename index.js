const express = require('express')
const monk = require('monk')
const db = monk('localhost/testdb')
const bodyParser = require('body-parser')
const clowns = db.get('clownss')
const app = express()


app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())

app.listen(3000, () => {
  console.log('listening on port 3000');
})

app.get('/', (req, res, next) =>{
  clowns.find({}).then(result => res.json(result))
})

app.post('/', (req, res, next) => {
   clowns.insert(req.body)
   .then(result =>{
     res.json(result)
   })
})
