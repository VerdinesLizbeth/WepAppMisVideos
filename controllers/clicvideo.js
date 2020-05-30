const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const bc = require('../database');

const controller = {}

controller.list = (req, res) => {
    bc.query('SELECT linkVideo.id, name, description, url, category, name_Pla, avg(rates)as rate FROM linkVideo JOIN plataforma ON  linkVideo.id_Pla=plataforma.id_Pla LEFT JOIN rate ON linkVideo.id =rate.id_rates  WHERE user = ? group by linkVideo.id  ORDER BY  created_at DESC  ', [req.user.id], (err, videos) => {
        if (err) {
            res.json(err);
        }
        res.render('webvideos/listuser', {
            data: videos
        });
    });
};
controller.save = async(req, res) => {
    const { name, description, url, category, id_Pla } = req.body;
    const newVideo = {
        name,       
        description,
        url,
        category,
        id_Pla,
        user: req.user

    };
     bc.query('INSERT INTO linkVideo set ?', [newVideo], (err, video) => {
        req.flash('success', 'Saved video');
        bc.query("select url from linkVideo order by id desc limit 1", (err2, urlvideo) => {
            bc.query('SELECT * FROM plataforma ', (err, red) => {

                if (err2) {
                    res.json(err2);
                }
                res.render('webvideos/add', {
                    link: urlvideo[0],
                    red: red
                });
            });

        });
    })
};
controller.edit = async(req, res) => {
    const { id } = req.params;
    bc.query("SELECT * FROM linkVideo WHERE id = ?", [id], (err, rows) => {
        bc.query('SELECT * FROM plataforma ', (err, red) => {
            res.render('webvideos/edit', {
                data: rows[0],
                red: red
            })
        });
    });
};

controller.update = async(req, res) => {
    const { id } = req.params;
    const { name, description, url, category, id_Pla } = req.body;
    const rateNew = {
        name,
        description,
        url,
        category,
        id_Pla,
        user: req.user
    };
    bc.query('UPDATE linkVideo set ?  WHERE id = ?', [rateNew, id], (err, rows) => {
        req.flash('success', 'Video Updated');
        res.redirect('/webvideos');
    });
};
controller.delete = async(req, res) => {
    const { id } = req.params;
    bc.query('DELETE  FROM rate WHERE id_rates= ?', [id], (err, rows1) => {
        bc.query('DELETE FROM linkVideo WHERE id = ?', [id], (err, rows) => {
            req.flash('success', 'Video Removed');
            res.redirect('/webvideos');
        });
    });
}