const connection = require('../data/db')

const index = ('/', (req,res) => {
  const sql = 'SELECT * FROM movies'

  connection.query(sql, (err,results) => {
    if(err) return res.status(500).json({err:'errore nella query del database'})
    res.json(results)
  })
})

const show = ('/', (req,res) => {
  const id = req.params.id;
  res.send(`dettagli del film con id: ${id}`)
})

module.exports = {
  index,
  show
}