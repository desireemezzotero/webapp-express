const connection = require('../data/db')
const imagePath = require('../middlewares/imagePath')

const index = ('/', (req,res) => {
  const sql = 'SELECT * FROM movies'

  connection.query(sql, (err,results) => {
    if(err) return res.status(500).json({err:'errore nella query del database'})
    res.json(results)
  })
})

const show = ('/', (req,res) => {
  const id = req.params.id;
  const sql = ` SELECT * FROM movies WHERE id = ? `

  const sqlReviews = `SELECT ROUND(AVG(reviews.vote)) Vote FROM reviews WHERE movie_id = ?`

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

module.exports = {
  index,
  show
}