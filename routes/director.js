const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Models
const Director = require('../models/Director');

//add director
router.post('/', (req, res, next) => {
    const director = new Director(req.body);
    const promise = director.save();
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
       res.json(err);
    });
});

//get directors
router.get('/', (req, res, next) => {
    //iki tablo arasındaki join işlemi bu şekilde oluyor.
    const promise = Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'  //dönen datanın atanacağı değişken
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true //filmi olmayan direktörleri de getirmek için yazmazsak sadece filmi olanlar gelir
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    soyad: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies' //bir kişinin kaç tane filmi varsa hepsi buraya yazılacak
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

//get director
router.get('/:director_id', (req, res, next) => {
    //iki tablo arasındaki join işlemi bu şekilde oluyor.
    const promise = Director.aggregate([
        {
            $match: {
                '_id': mongoose.Types.ObjectId(req.params.director_id) //object id türüne çevirdik
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'  //dönen datanın atanacağı değişken
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true //filmi olmayan direktörleri de getirmek için yazmazsak sadece filmi olanlar gelir
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    soyad: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies' //bir kişinin kaç tane filmi varsa hepsi buraya yazılacak
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

//update director
router.put('/:director_id', (req, res, next) => {
    const promise = Director.findByIdAndUpdate(req.params.director_id, req.body, {new: true}); //{new: true} yazınca güncellenmiş datayı döndürür bize yazmazsak eskisi döner
    promise.then((director) => {
        if (!director)
            next({message: 'The director was not found.', code: 404});
        res.json(director);
    }).catch((err) => {
        res.json(err);
    });
});

//delete director
router.delete('/:director_id', (req, res, next) => { //req.params ile get de gönderilen parametreler alınabilir
    const promise = Director.findByIdAndRemove(req.params.director_id);
    promise.then((director) => {
        if (!director)
            next({message: 'The director was not found.', code: 404});
        res.json({status: 1});
    }).catch((err) => {
        res.json(err);
    });
});


module.exports = router;