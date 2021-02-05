const { Router } = require('express')
const { pool } = require('./../db/db')
const router = Router()

//Servicio get cuentas
router.get('/cuenta', async (req, res) => {
    let client = await pool.connect()
    try {
        client.query(`SELECT * FROM cuenta`, (error, resulset) => {
            client.release(true)
            if (error) {
                console.log(error)
                return res.status(500).send('Se presento un error en la base de datos.')
            } else {
                return res.json(resulset.rows)
            }
        })
    } catch (error) {
        console.log(error)
    }
})
//Servicio get profesor
router.get('/profesor', async (req, res) => {
    let client = await pool.connect()
    try {
        client.query(`SELECT * FROM profesores`, (error, resulset) => {
            client.release(true)
            if (error) {
                console.log(error)
                return res.status(500).send('Se presento un error en la base de datos.')
            } else {
                return res.json(resulset.rows)
            }
        })
    } catch (error) {
        console.log(error)
    }
})
//Servicio get nota
router.get('/nota', async (req, res) => {
    let client = await pool.connect()
    try {
        client.query(`SELECT * FROM notas`, (error, resulset) => {
            client.release(true)
            if (error) {
                console.log(error)
                return res.status(500).send('Se presento un error en la base de datos.')
            } else {
                return res.json(resulset.rows)
            }
        })
    } catch (error) {
        console.log(error)
    }
})
//Servicio get grupo
router.get('/grupo', async (req, res) => {
    let client = await pool.connect()
    try {
        client.query(`SELECT * FROM grupos`, (error, resulset) => {
            client.release(true)
            if (error) {
                console.log(error)
                return res.status(500).send('Se presento un error en la base de datos.')
            } else {
                return res.json(resulset.rows)
            }
        })
    } catch (error) {
        console.log(error)
    }
})

//Servicio get plan
router.get('/plan', async (req, res) => {
    let client = await pool.connect()
    try {
        client.query(`SELECT * FROM plan`, (error, resulset) => {
            client.release(true)
            if (error) {
                console.log(error)
                return res.status(500).send('Se presento un error en la base de datos.')
            } else {
                return res.json(resulset.rows)
            }
        })
    } catch (error) {
        console.log(error)
    }
})

// Servicio crear profesor 
router.post('/new-profesor', async (req, res) => {
    try {
        const {
            id_profesor, id_cuenta, jornada
        } = req.body
        const client = await pool.connect()
        const response = await client.query(`INSERT INTO profesores (id_profesor, id_cuenta, jornada)  VALUES ($1, $2, $3) RETURNING id_profesor`, [id_profesor, id_cuenta, jornada])

        // console.log(response)
        if (response.rowCount > 0) {
            res.json({
                id_profesor: response.rows[0].id_profesor,
                id_profesor: id_profesor,
                id_cuenta: id_cuenta,
                jornada: jornada
            })
        } else {
            res.json({})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ errorCode: e.errno, message: "Error en el servidor" })
    }
})

// Servicio registar notas
router.post('/new-nota', async (req, res) => {
    try {
        const {
            id_nota, valor, componente, id_materia, matricula_estudiante
        } = req.body
        const client = await pool.connect()
        const response = await client.query(`INSERT INTO notas (id_nota, valor, componente, id_materia, matricula_estudiante)  VALUES ($1, $2, $3, $4, $5) RETURNING id_nota`, [id_nota, valor, componente, id_materia, matricula_estudiante])

        // console.log(response)
        if (response.rowCount > 0) {
            res.json({
                id_nota: response.rows[0].id_nota,
                valor: valor,
                componente: componente,
                id_matricula: id_matricula,
                matricula_estudiante: matricula_estudiante
            })
        } else {
            res.json({})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ errorCode: e.errno, message: "nota registrada" })
    }
})

// Servicio registar grupos
router.post('/new-grupos', async (req, res) => {
    try {
        const {
            id_grupo, año, grado, cod_grupo, id_profesor
        } = req.body
        const client = await pool.connect()
        const response = await client.query(`INSERT INTO grupos (id_grupo, año, grado, cod_grupo, id_profesor)  VALUES ($1, $2, $3, $4, $5) RETURNING id_grupo`, [id_grupo, año, grado, cod_grupo, id_profesor])

        // console.log(response)
        if (response.rowCount > 0) {
            res.json({
                id_grupo: response.rows[0].id_grupo,
                año: valor,
                grado: grado,
                cod_grupo: cod_grupo,
                id_profesor: id_profesor
            })
        } else {
            res.json({})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ errorCode: e.errno, message: "Grupo Registrado" })
    }
})

// Servicio registar grupos
router.post('/new-plan', async (req, res) => {
    try {
        const {
            id_plan, cant_acti, cant_proce, cant_conceptual,  id_grupo, id_materia
        } = req.body
        const client = await pool.connect()
        const response = await client.query(`INSERT INTO plan (id_plan, cant_acti, cant_proce, cant_conceptual, id_grupo, id_materia)  VALUES ($1, $2, $3, $4, $5,  $6) RETURNING id_plan`, [ id_plan, cant_acti, cant_proce, cant_conceptual,  id_grupo, id_materia])

        // console.log(response)
        if (response.rowCount > 0) {
            res.json({
                id_plan: response.rows[0].id_plan,
                cant_acti: cant_acti,
                cant_proce: can_proce,
                cant_conceptual: cant_conceptual,
                id_grupo: id_grupo,
                id_materia: id_materia
            })
        } else {
            res.json({})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ errorCode: e.errno, message: "Plan Registrado" })
    }
})

//Servicio actualizar plan
router.put("/updateplan/:id_plan", async (req, res) => {
    const { cant_acti, cant_proce, cant_conceptual, id_grupo, id_materia } = req.body;
     const { id_plan } = req.params;

    try {
        const client = await pool.connect();
        const rows = await client.query('UPDATE plan SET cant_acti=$2, cant_proce=$3, cant_conceptual=$4, id_grupo=$5, id_materia=$6 WHERE id_plan= $1', [id_plan, cant_acti, cant_proce, cant_conceptual, id_grupo, id_materia]);
        res.json(rows);
        client.release();
    } catch (err) {
        res.json(err);
    }
});


// Servicio actualizar profesor
router.put("/updateprofesor/:id_profesor", async (req, res) => {
    const { id_cuenta, jornada } = req.body;
    const { id_profesor } = req.params;

    try {
        const client = await pool.connect();
        const rows = await client.query('UPDATE profesores SET id_cuenta=$2, jornada=$3 WHERE id_profesor= $1', [id_profesor, id_cuenta, jornada]);
        res.json(rows);
        client.release();
    } catch (err) {
        res.json(err);
    }
});

// Servicio actualizar nota
router.put("/updatenota/:id_nota", async (req, res) => {
    const { valor, componente, id_materia, matricula_estudiante } = req.body;
    const { id_nota } = req.params;

    try {
        const client = await pool.connect();
        const rows = await client.query('UPDATE notas SET valor=$2, componente=$3, id_materia=$4, matricula_estudiante=$5 WHERE id_nota= $1', [id_nota,valor, componente, id_materia, matricula_estudiante]);
        res.json(rows);
        client.release();
    } catch (err) {
        res.json(err);
    }
});

// 
router.delete("/deleletprofesor/:id_profesor", async (req, res) => {
  const {id_profesor}=req.params;
  try {
  const client = await pool.connect();
  const rows = await client.query('DELETE profesores WHERE id_profesor= $1',[id_profesor]);
  res.json(rows);
  client.release();
} catch (err) {
  res.json(err);
}
});

module.exports = router;

