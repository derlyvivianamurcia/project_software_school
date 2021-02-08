const controllerCuentas = {};

const pool = require('../config/database');

//Listar cuentas.
controllerCuentas.listCuentas = async (req, res) => {
    let client = await pool.connect();

    try {
        client.query(`SELECT * FROM cuenta`, (error, resulset) => {
        client.release(true);
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
};

//Agregar cuentas.
controllerCuentas.addCuenta = async(req, res) => {
    try {
        const {
            id_cuenta,
            correo,
            contraseña,
            tipo_cuenta,
            edad,
            fecha_de_nacimiento,
            tipo_de_documento,
            nro_de_documento,
            nombre,
            apellidos,
            genero,
            fecha_ultimo_acceso,
            estado
        } = req.body;

        const client = await pool.connect();
        const rows =  await client.query(`INSERT INTO cuenta(id_cuenta, correo, contraseña, tipo_cuenta, 
            edad, fecha_de_nacimiento, tipo_de_documento, nro_de_documento, nombre, apellidos,
            genero, fecha_ultimo_acceso, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
            [id_cuenta, correo, contraseña, tipo_cuenta, edad, fecha_de_nacimiento, tipo_de_documento, 
                nro_de_documento, nombre, apellidos, genero, fecha_ultimo_acceso, estado]);        
        client.release();

        (rows.affectedRows > 0) ? res.json({
            id_cuenta : id_cuenta,
            correo : contraseña,
            tipo_cuenta : tipo_cuenta,
            edad : edad,
            fecha_de_nacimiento : fecha_de_nacimiento,
            tipo_de_documento : tipo_de_documento,
            nro_de_documento : nro_de_documento,
            nombre : nombre,
            apellidos : apellidos,
            genero : genero,
            fecha_ultimo_acceso : fecha_ultimo_acceso,
            estado : estado
        }): res.json({});

    } catch (err) {
        res.status(500).json({ errorCode: err.err, message: 'Error en el servidor.' });
    }
};

//Consultar cuenta
controllerCuentas.getCuenta = async(req, res) => {
    const { id } = req.params;
    try {        
        const client = await pool.connect();
        const cuenta = await client.query(
            `SELECT * FROM cuenta WHERE id_cuenta = $1`, [id]
        );        
        res.json(cuenta.rows);
        client.release();
    } catch (error) {
        console.error(error.message);
    }
};

//Actualizar cuenta.
controllerCuentas.updateCuenta = async(req, res) => {
    const {id} = req.params;
    try {        
        const { 
            correo,
            contraseña,
            tipo_cuenta,
            edad,
            fecha_de_nacimiento,
            tipo_de_documento,
            nro_de_documento,
            nombre,
            apellidos,
            genero,
            fecha_ultimo_acceso,
            estado
        } = req.body;
        const client = await pool.connect();
        await client.query(`UPDATE cuenta SET correo=$1, contraseña=$2, tipo_cuenta=$3, edad=$4,
        fecha_de_nacimiento=$5, tipo_de_documento=$6, nro_de_documento=$7, nombre=$8, apellidos=$9, 
        genero=$10, fecha_ultimo_acceso=$11, estado=$12 WHERE id_cuenta=$13`, 
        [correo, contraseña, tipo_cuenta, edad, fecha_de_nacimiento, tipo_de_documento, 
            nro_de_documento, nombre, apellidos, genero, fecha_ultimo_acceso, estado, id]);
        client.release();
        res.json('cuenta was update');
    } catch (err) {
        res.status(500).json({ errorCode: err.err, message: 'Error en el servidor.' });
    }
};

//Eliminar estudiante,
controllerCuentas.deleteCuenta = async(req, res) => {
    const { id } = req.params;
    try {
        const client = await pool.connect();
        await client.query(`DELETE FROM cuenta WHERE id_cuenta = $1`, [id]);
        res.json("Cuenta was deleted");
        client.release();
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = controllerCuentas;