var express = require('express');
var router = express.Router();

//Models
const Movie = require('../models/Movie');

//Top 10 List
router.get('/top10', (req, res, next) => {
  const promise = Movie.find({}).limit(10).sort({imdb_score: -1}); //küçükten büyüğe -1 yaz tam tersine 1 yaz
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

//between start and end year get movies
router.get('/between/:start_year/:end_year', (req, res, next) => {
  const  {start_year, end_year} = req.params;
  const promise = Movie.find({
    year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year) }//gte büyük veya eşit anlamına geliyor, lte ise küçük veya eşit anlamına geliyor, gt veya lt deseydik eşit olanları getirmezdi
  });
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

//get movie
router.get('/:movie_id', (req, res, next) => { //req.params ile get de gönderilen parametreler alınabilir
  const promise = Movie.findById(req.params.movie_id);
  promise.then((movie) => {
    if (!movie)
      next({message: 'The movie was not found.', code: 404});
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

//delete movie
router.delete('/:movie_id', (req, res, next) => { //req.params ile get de gönderilen parametreler alınabilir
  const promise = Movie.findByIdAndRemove(req.params.movie_id);
  promise.then((movie) => {
    if (!movie)
      next({message: 'The movie was not found.', code: 404});
    res.json({status: 1});
  }).catch((err) => {
    res.json(err);
  });
});

//get movies
router.get('/', (req, res, next) => {
  const promise = Movie.aggregate([
    {
      $lookup: {
        from: 'directors',
        localField: 'director_id',
        foreignField: '_id',
        as: 'director'
      }
    },
    {
      $unwind: '$director'
    }
  ]);
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

//update movie
router.put('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, {new: true}); //{new: true} yazınca güncellenmiş datayı döndürür bize yazmazsak eskisi döner
  promise.then((movie) => {
    if (!movie)
      next({message: 'The movie was not found.', code: 404});
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

//add movie
router.post('/', function(req, res, next) {
  //2.YOL
  const movie = new Movie(req.body);

  //2.YOL
  const promise = movie.save();
  promise.then((data) => {
    res.json({status: 1});
  }).catch ((err) => {
    res.json(err);
  });

  //1.YOL
  /*const { title, imdb_score, category, country, year } = req.body;
  const movie = new Movie({
    title: title,
    imdb_score: imdb_score,
    category: category,
    country: country,
    year: year
  });*/

  //1.YOL
  /*movie.save((err, data) => {
    if (err) {
      res.json(err);
    }
    res.json({status: 1});
  })*/
});

module.exports = router;
