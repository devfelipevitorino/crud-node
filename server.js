const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.listen(3000, function(){
    console.log('server running on port 3000')
})

app.use(bodyParser.urlencoded({ extended: true}))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/formulario', (req, res) => {
    console.log(req.body)
})