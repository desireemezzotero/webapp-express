const express = require ('express')
const app = express()
const port = process.env.PORT || 3000
const errorsHandler = require ('./middlewares/errorsHandler.js');
const notFound = require ('./middlewares/notFound.js');
const router = require('./routes/movie.js')
const imagePath = require('./middlewares/imagePath.js')
const cors = require ('cors')

app.use(express.static('public'));
app.use(express.json());
app.use(imagePath);
app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/', (req,res) => {
  res.send('server dei movies')
})

app.use('/movie', router)

app.use(errorsHandler);
app.use(notFound);

app.listen(port, ()=> {
  console.log(`sono in asoclto alla porta ${port}`)
})

