const express = require("express");
const router = express.Router();
//para poder crear los ids
const mongoose = require("mongoose");

const Apartment = require("../models/apartment");

router.get("/apartments", (req, res, next) => {

    //pasando find() sin parametros, trae todo lo de la base
    Apartment.find()
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

router.post("/apartments", (req, res, next) => {

    const apartment = new Apartment({
        _id: new mongoose.Types.ObjectId(),
        floor: req.body.floor,
        number: req.body.number,
        owner_dni: req.body.owner_dni,
        owner_name: req.body.owner_name,
        owner_lastname: req.body.owner_lastname,
    });

    //method save graba en DB el objeto
    apartment
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Departamento creado!",
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

// para representar variables en el path, se usa ':' y el nombre
router.get("/apartments/:apartmentId", (req, res, next) => {

    const id = req.params.apartmentId;

    Apartment.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: "No se pudo encontrar objetos con ese ID" })
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});

router.patch("/apartments/:apartmentId", (req, res, next) => {

    const id = req.params.apartmentId;

    Apartment.update({ _id: id },
        {
            $set: {
                number: req.body.number
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

router.delete("/apartments/:apartmentId", (req, res, next) => {

    const id = req.params.apartmentId;

    Apartment.remove({ _id: id })
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