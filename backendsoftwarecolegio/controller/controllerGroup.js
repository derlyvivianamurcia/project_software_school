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
            grado,
            año,
            cod_grupo
        } = req.body;

        const client = await pg.connect();
        const rows = await client.query(`INSERT INTO grupos(id_grupo, grado, año, cod_grupo)
         VALUES ($1, $2, $3, $4)`, [id_grupo, grado, año, cod_grupo]);
        client.release();
        (rows.affectedRows > 1) ? res.json({
            id_grupo: id_grupo,
            grado: grado,
            año: año,
            cod_grupo: cod_grupo,
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

controller.updateGrupo = async (req, res) => {
    try {

        const {
            id_grupo,
            grado,
            año,
            cod_grupo
        } = req.body;
        const client = await pool.connect();
        await client.query.promise().execute(`UPDATE groups SET grado=$3, año=$2 WHERE id_grupo=$1, cod_grupo=$4`,
            [grado, año, id_grupo, cod_grupo]);
        client.release();
        res.json('Grupo was update');
    } catch (err) {
        res.status(500).json({ errorCode: err.err, message: 'Error en el servidor.' });
    }
};

//Eliminar grupo

controller.deleteGrupo = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await pool.connect();
        await client.query.promise().execute(`DELETE FROM grupos WHERE id_grupo = $1`, [id]);
        client.release();
        res.json("Grupo was deleted");
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = controller;