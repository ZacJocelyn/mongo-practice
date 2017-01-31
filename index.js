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
  clowns.find({})
  .then(result => res.json(result))
})

app.get('/:id', (req, res, next) =>{
  clowns.findOne({_id: req.params.id})
  .then(result => res.json(result))
})

app.post('/', (req, res, next) => {
   clowns.insert(req.body)
   .then(result =>{
     res.json(result)
   })
})

app.delete('/:id', (req, res, next) =>{
  clowns.findOneAndDelete({_id: req.params.id})
  .then( () => res.json({
    message: 'its gone'
  }))
})

app.patch('/:id', (req, res, next) =>{
  clowns.findOneAndUpdate({_id: req.params.id}, req.body)
  .then( (result) => res.json(result))
})
