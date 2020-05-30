const express = require('express');
const router = express.Router();
const bc = require('../database');
const controller= {};

controller.list = (req, res) => {
    const { id } = req.params;
    bc.query('SELECT linkVideo.id, name, description,url, category, name_Pla, avg(rates)as rate  FROM linkVideo JOIN plataforma ON linkVideo.id_Pla=plataforma.id_Pla LEFT JOIN rate ON linkVideo.id =rate.id_rates  WHERE user = ? group by linkVideo.id  ORDER BY  created_at DESC  ', [id], (err, videos) => {
        bc.query('  SELECT  username  FROM  users  WHERE id = ?', [id], (err, username) => {
            if (err) {
                res.json(err);
            }
            res.render('wevvideos/lisvid', {
                data: videos,
                username: username[0]

            });

        });
    });
};
controller.list_user = async(req, res) => {
    bc.query("SELECT id, username from users ", (err, users) => {
        if (err) {
            res.json(err);
        }
        res.render('users', {
            data: users
        })
    });
};
controller.lists = (req, res) => {
    const { id } = req.params;
    bc.query('SELECT linkVideo.id, name,description, url, category, name_Pla, avg(rates)as rate  FROM linkVideo JOIN plataforma ON  linkVideo.id_Pla=plataforma.id_Pla LEFT JOIN rate ON linkVideo.id =rate.id_rates  WHERE user = ? group by linkVideo.id  ORDER BY  created_at DESC  ', [id], (err, videos) => {
        bc.query('  SELECT  username  FROM  users  WHERE id = ?', [id], (err, username) => {
            if (err) {
                res.json(err);
            }
            res.json({
                data: videos,
                username: username[0]

            });

        });
    });
};
controller.apiuserlist = async(req, res) => {
    bc.query("SELECT id, username from users ", (err, users) => {
        if (err) {
            res.json(err);
        }
        res.json({
            data: users
        })
    });
};



module.exports = controller;