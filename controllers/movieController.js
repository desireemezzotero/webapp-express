const connection = require('../data/db')
const imagePath = require('../middlewares/imagePath')

const index = ('/', (req,res) => {
  const sql = 'SELECT * FROM movies'

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ err: 'errore nella query del database' });

    const moviesWithImages = results.map(movie => {
     
      const img = req.imagePath + movie.image;
      return {
        ...movie,
        img 
      };
    });

    res.json(moviesWithImages); 
  });
})

const show = ('/', (req,res) => {
  const id = req.params.id;
  const sql = ` SELECT * FROM movies WHERE id = ? `

  const sqlReviews = `SELECT * FROM reviews WHERE movie_id = ?`

  connection.query(sql, [id], (err, results) => {
    if(err) return res.status(500).json({err:'errore nella query del database'})
    if(results.length == 0) return res.status(400).json({err:'film non trovato'})
    const movie = results[0]

    connection.query(sqlReviews, [id], (err, resultsReviews) => {
      if (err) return res.status(500).json({err:'errore nella query del database'})
        movie.reviews = resultsReviews;
        const img = req.imagePath + movie.image
      res.json({
        ... movie,
        img})
    }) 
  })
})

const store = ('/', (req,res) => {
  const id = req.params.id
  console.log(id)
  const {name, text, vote} = req.body
  const sql = `INSERT INTO reviews (name, text, vote, movie_id) VALUES (?,?,?,?)`

  connection.query(sql, [name,text,vote,id], (err, results) => {
    if(err) return res.status(500).json({error:err})
    res.status(201)
  console.log(results)
    res.json({
      messagge:'recensione aggiunta con successo',
      id: results.insertId
    })
  })
})

const storeMovie = ('/', (req,res) => {
  const {title, director,genre, release_year, abstract} = req.body
  const imageName = req.file.filename 
  console.log(req.body)

  const sql = `INSERT INTO movies (title, director, genre, release_year,abstract, image) VALUES (?,?,?,?,?,?)` 

  connection.query(sql,[title, director, genre, release_year,abstract, imageName], (err,results) => {
    console.log(err)
    if(err) return res.status(500).json({err: 'errore nella query del db'})
    res.status(201).json({status:'success', message: 'film aggiunto con successo'})
  })
})

module.exports = {
  index,
  show,
  store,
  storeMovie
}