const express = require('express');
 const router = express.Router();
 const bc = require('../database');
 const {isLoggedIn} = require('../vid/auth');
 const controller = {};

 controller.list = async(req, res) => {
    bc.query('SELECT linkVideo.id, url, avg(rates) as rate FROM linkVideo INNER JOIN rate ON rate.id_rates=linkVideo.id  group by linkVideo.id  having rate > 4 ORDER BY  created_at DESC', (err, fav, fields) => {
        bc.query('SELECT linkVideo.id, name, description, url, category, user, id_Pla, avg(rates)as rate ,users.id as user FROM linkVideo INNER JOIN users ON linkVideo.user = users.id   LEFT JOIN rate ON linkVideo.id =rate.id_rates JOIN plataforma ON  linkVideo.id_Pla=plataforma.id_Pla group by linkVideo.id ORDER BY  created_at DESC ', (err, videos, fields) => {
            if (err) { res.json(err); }
            res.json({
                data: videos,
                fav: fav
            });

        });
    });
};
controller.listindex = async(req, res) => {
    bc.query('SELECT linkVideo.id, url, avg(rates) as rate FROM linkVideo INNER JOIN rate ON rate.id_rates=linkVideo.id  group by linkVideo.id  having rate > 4 ORDER BY  created_at DESC', (err, fav, fields) => {
        bc.query('SELECT linkVideo.id, name, description, url, category, user, id_Pla, avg(rates)as rate ,users.id as user FROM linkVideo INNER JOIN users ON linkVideo.user = users.id   LEFT JOIN rate ON linkVideo.id =rate.id_rates JOIN plataforma ON  linkVideo.id_Pla=plataforma.id_Pla group by linkVideo.id ORDER BY  created_at DESC ', (err, videos, fields) => {
            if (err) { res.json(err); }
            res.json({
                data: videos,
                fav: fav
            });

        });
    });
};
controller.info = (req, res) => {
    const { id } = req.params;
    const { rates } = req.body;
    const rateNew = {
        id_rates: id,
        rates
    };
    console.log(rateNew);
    bc.query("SELECT linkVideo.id as id, name,description, url, category, username, users.id , name_Pla, FROM linkVideo INNER JOIN users ON linkVideo.user = users.id JOIN plataforma ON  linkVideo.id_Pla=plataforma.id_Pla WHERE linkVideo.id = ?", [id], (err, rows) => {
        bc.query('INSERT INTO rates set ?', [rateNew], (err, voto) => {
            bc.query("SELECT avg(rates) as promedio  FROM rate   WHERE id_rates = ?", [id], (err, promedio) => {
                bc.query('SELECT linkVideo.id, url, avg(rates) as rate FROM linkVideo INNER JOIN rate ON rate.id_rates=linkVideo.id  group by linkVideo.id  having rate > 4 ORDER BY  created_at DESC', (err, fav, fields) => {

                    console.log(promedio);
                    res.render('webvideos/info', {
                        data: rows[0],
                        promedio: promedio,
                        fav: fav
                    })
                })
            });
        });
    });
};
controller.infos = async(req, res) => {
    const { id } = req.params;
    const { rates } = req.body;
    const rateNew = {
        id_rates: id,
        rates
    };
    console.log(rateNew);
      bc.query("SELECT linkVideo.id as id, name,description, url, category, username, users.id , name_Pla, FROM linkVideo INNER JOIN users ON linkVideo.user = users.id JOIN plataforma ON  linkVideo.id_Pla=plataforma.id_Pla WHERE linkVideo.id = ?", [id], (err, rows) => {
        bc.query("SELECT avg(rates) as promedio  FROM rate  WHERE id_rates = ?", [id], (err, promedio) => {
            console.log(promedio);
            bc.query('INSERT INTO rate set ?', [rateNew], (err, voto) => {
                if (!err) {
                    res.json({
                        status: 'rate saved',
                        data: rows[0],
                        promedio: promedio
                    });
                } else {
                    console.log(err);
                }
            })
        })
    });
};
controller.results = async(req, res) => {
    const { name } = req.body;
    console.log(name);
    bc.query('SELECT linkVideo.id, name, description, url, category, user, name_Pla, avg(rates)as rate ,user.id as users FROM linkVideo INNER JOIN users ON linkVideo.user = users.id   LEFT JOIN rate ON linkVideo.id =rate.id_rates JOIN plataforma ON  linkVideo.id_Pla=plataforma.id_Pla where name like "%' + name + '%" group by linkVideo.id ', (err, videos) => {
        if (err) { res.json(err); }

        res.render('results', {
            data: videos
        });

    });
};

module.exports = controller;