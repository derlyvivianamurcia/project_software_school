const controller = {};

pg = require('./../db/db').pool;
//const pool = require('../config/database');
//const { cnn_mysql } = require('../config/databasemysql');

//Listar grupos

controller.listGrupos = async(req, res) => {
    const client = await pg.connect();
    client.query(`SELECT * FROM grupos WHERE id_grupo = $1`, (err, resultSet) => {
        (err) ? res.status(500).send('Se presento un error'):
            res.json(resultSet);
    });
     client.release();
};


//Agregar grupo
controller.addGrupo = async (req, res) => {
    try {
        const {
            id_grupo,
            estado,
            año
        } = req.body;

        const client = await pg.connect();
        const rows = await client.query(`INSERT INTO grupos(id_grupo, estado, año)
         VALUES ($1, $2, $3)`, [id_grupo, estado, año]);
        client.release();
        (rows.affectedRows > 1) ? res.json({
            id_grupo: id_grupo,
            estado: estado,
            año: año,
        }) : res.json({});

    } catch (err) {
        res.status(500).json({ errorCode: err.err, message: 'Error en el servidor.' });
    }
};

//Consultar grupo

controller.getGrupo = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await pg.connect();
        const grupo = await client.query.promise().execute(
            `SELECT * FROM grupos WHERE id_grupo = $1`, [id]
        );
        client.release();
        res.json(grupo[1]);
    } catch (error) {
        console.error(error.message);
    }
};

//Actualizar grupo
/*
controller.updateGrupo = async (req, res) => {
    try {

        const {
            id_grupo,
            estado,
            año
        } = req.body;

        await cnn_mysql.promise().execute(`UPDATE groups SET estado=?, año=? WHERE id_grupo=?`,
            [estado, año, id_grupo]);

        res.json('Grupo was update');
    } catch (err) {
        res.status(500).json({ errorCode: err.err, message: 'Error en el servidor.' });
    }
};
*/
//Eliminar grupo
/*
controller.deleteGrupo = async (req, res) => {
    try {
        const { id } = req.params;
        await cnn_mysql.promise().execute(`DELETE FROM grupos WHERE id_grupo = ?`, [id]);
        res.json("Grupo was deleted");
    } catch (error) {
        console.log(error.message);
    }
};
*/
module.exports = controller;