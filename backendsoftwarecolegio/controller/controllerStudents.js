const controller = {};

const pool = require('../config/database');
const { cnn_mysql } = require('../config/databasemysql');

//Listar estudiantes
controller.listStudents = async(req, res) => {
    let client = await pool.connect();

    try {
        client.query(`SELECT * FROM estudiantes`, (error, resulset) => {
        client.release(true)
        if (error) {
            console.log(error)
            return res.status(500).send('Se presento un error en la base de datos.')
            } else {
                return res.json(resulset.rows)
            }
        });
        
    } catch (error) {
        console.log(error)
    }
    /*cnn_mysql.query(`SELECT * FROM estudiantes`, (err, resultSet) => {
        (err) ? res.status(500).send('Se presento un error'):
            res.json(resultSet);
    });*/
};

//Agregar estudiante
controller.addStudent = async(req, res) => {
    try {
        const {
            id_estudiante,
            aprobado,
            grupo,
            id_cuenta,
            nro_matricula,
            año,
            nota_prom,
        } = req.body;

        const client = await pool.connect();
        const rows =  await client.query(`INSERT INTO estudiantes(id_estudiante, aprobado, grupo, id_cuenta, 
            nro_matricula, año, nota_prom) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [id_estudiante, aprobado, grupo, id_cuenta, nro_matricula, año, nota_prom]);
        
        client.release();

        (rows.affectedRows > 0) ? res.json({
            id_estudiante: id_estudiante,
            aprobado: aprobado,
            grupo: grupo,
            id_cuenta: id_cuenta,
            nro_matricula: nro_matricula,
            año: año,
            nota_prom: nota_prom
        }): res.json({});

    } catch (err) {
        res.status(500).json({ errorCode: err.err, message: 'Error en el servidor.' });
    }
};

//Consultar estudiante
controller.getStudent = async(req, res) => {
    const { id } = req.params;
    try {        
        const client = await pool.connect();
        const student = await client.query(
            `SELECT * FROM estudiantes WHERE id_estudiante = $1`, [id]
        );        
        res.json(student.rows);
        client.release();
    } catch (error) {
        console.error(error.message);
    }
};

//Actualizar estudiante.
controller.updateStudent = async(req, res) => {
    const {id} = req.params;
    try {        
        const {           
            aprobado,
            grupo,
            id_cuenta,
            nro_matricula,
            año,
            nota_prom
        } = req.body;
        const client = await pool.connect();
        await client.query(`UPDATE estudiantes SET aprobado=$1, grupo=$2, id_cuenta=$3, nro_matricula=$4,
        año=$5, nota_prom=$6 WHERE id_estudiante=$7`, [aprobado, grupo, id_cuenta, nro_matricula, año, nota_prom, id]);
        client.release();
        res.json('Student was update');
    } catch (err) {
        res.status(500).json({ errorCode: err.err, message: 'Error en el servidor.' });
    }
};

//Eliminar estudiante,

controller.deleteStudent = async(req, res) => {
    const { id } = req.params;
    try {
        const client = await pool.connect();
        await client.query(`DELETE FROM estudiantes WHERE id_estudiante = $1`, [id]);
        res.json("Student was deleted");
        client.release();
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = controller;