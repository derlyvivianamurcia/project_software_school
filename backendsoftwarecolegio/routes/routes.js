const { Router } = require('express')
const { pool } = require('./../db/db')
const router = Router()

//Servicio get cuentas


router.get('/cuenta', async (req, res) => {
    let client = await pool.connect()
    try{
    client.query(`SELECT * FROM cuenta`, (error, resulset) => {
        client.release(true)
        if (error) {
            console.log(error)
            return res.status(500).send('Se presento un error en la base de datos.')
        } else {
            return res.json(resulset.rows)
        }
    })
    }catch(error){
        console.log(error)
    }
})
/*

// Servicio get profesores

router.get("/profesor", async(req,res) =>{
  const [rows]=await cnn_mysql.execute(`SELECT * FROM profesores`); 
  if(rows[0]){res.json(rows);
  }
  else{
    res.json({});
  }  
});

//Servicio post agregar cuenta

router.post("/nueva-cuenta", async(req,res) =>{
  try {
    const {id_cuenta, correo, contraseña, tipo_cuenta, edad, fecha_de_nacimiento, tipo_de_documento, nro_de_documento, nombre, apellidos, genero, fecha_ultimo_acceso, estado} = req.body;
    const [rows]=await cnn_mysql.execute(`INSERT INTO cuenta (id_cuenta, correo, contraseña, tipo_cuenta, edad, fecha_de_nacimiento, tipo_de_documento, nro_de_documento, nombre, apellidos, genero, fecha_ultimo_acceso, estado) VALUES (?, ?, ?,?,?,?,?,?,?,?,?,?,?)`,[id_cuenta, correo, contraseña, tipo_cuenta, edad, fecha_de_nacimiento, tipo_de_documento, nro_de_documento, nombre, apellidos, genero, fecha_ultimo_acceso, estado]);
    res.json({message: `Cuenta creada con éxito id= ${rows.insertId}` });
             
  } catch (e) {
    res.status(500).json({errorCode : e.errno, message : "Error"})
  }
}); 

//Servicio post crear un profesor

router.post("/registro/profesor", async(req,res) =>{
  try {
    const {id_profesor, id_cuenta, jornada} = req.body;
    const [rows]=await cnn_mysql.execute(`INSERT INTO profesores (id_profesor, id_cuenta, jornada) VALUES (?, ?, ?)`,[id_profesor, id_cuenta, jornada]);
    res.json({message: `Cuenta profesor creada con éxito id= ${rows.insertId}` });
             
  } catch (e) {
    res.status(500).json({errorCode : e.errno, message : "Error"})
  }
}); 

//Servicio put actualizar usuario 
/*
 router.put("/cuenta/:id", (req, res) => {
    const {
   tipo_de_documento, nro_de_documento, nombre, apellidos, genero, fecha_ultimo_acceso, estado,
    } = req.body;
    const id_cuenta= req.params.id_cuenta;
  
    cnn_mysql.query(
      `UPDATE cuenta SET tipo_de_documento=?, nro_de_documento=?, nombre=?, apellidos=?, genero=?, fecha_ultimo_acceso=?, estado=? WHERE id_cuenta = ?`,
      [id_cuenta, tipo_de_documento, nro_de_documento, nombre, apellidos, genero, fecha_ultimo_acceso, estado],
      (err, rows, fields) => {
        if (err) {
          return res
            .status(500)
            .send("Se presentó un error y no se pudieron actualizar los datos");
        } else {
          console.log(req.params);
          return res.send("Datos actualizados con éxito!");
        }
      }
    );
  });*/

/*
  router.put('/cuenta/:id', (req, res) => {
  const {nombre} = req.body;
  const { id_cuenta } = req.params;
  cnn_mysql.query(`UPDATE cuenta SET nombre =? WHERE id_cuenta = ?`, 
      [nombre, id_cuenta], 
        (err, rows, fields) => {
          if(!err) {
            res.json({status: 'Usuario actualizado'});
          } else {
            console.log(err);
        }
      });
});
  */

  //Servicio delete

module.exports= router;

