const express = require("express");
const router = express.Router();
//para poder crear los ids
const mongoose = require("mongoose");

const News = require("../models/news");

router.get("/news", (req, res, next) => {
    
    //pasando find() sin parametros, trae todo lo de la base
    News.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.post("/news", (req, res, next) => {

    const news = new News({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        date: Date.now()
    });

    //method save graba en DB el objeto
    news
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Noticia generada",
                apartment: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.get("/news/:newId", (req, res, next) => {

    const id = req.params.newId;
    
    News.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: "No se pudo encontrar objetos con ese ID"})
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});

router.patch("/news/:newId", (req, res, next) => {

    const id = req.params.newId;

    News.update({ _id: id }, 
        { $set: { 
                description: req.body.description
            } 
        })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.delete("/news/:newId", (req, res, next) => {

    const id = req.params.newId;

    News.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

module.exports = router;