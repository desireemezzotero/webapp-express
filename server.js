require('dotenv').config() 
const express = require ('express')
const app = express()
const port = process.env.PORT || 3000
const errorsHandler = require ('./middlewares/errorsHandler.js');
const notFound = require ('./middlewares/notFound.js');
const router = require('./routes/movie.js')

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req,res) => {
  res.send('server dei movies')
})

app.use('/movie', router)

app.use(errorsHandler);
app.use(notFound);

app.listen(port, ()=> {
  console.log(`sono in asoclto alla porta ${port}`)
})

