const express = require('express');
const router = express.Router();
const pg = require('./../db/db').pool;

// Objeto de Guia
router.get("/", (req, res) => {
  res.json([]);
});

router.get("/materias", async (req, res) => {
  try {
    const client = await pg.connect();
    const { rows } = await client.query('SELECT * FROM materias');
    res.json(rows);
    client.release();
  } catch (err) {
    res.json(err);
  }
});
/*
router.post("/cambioaño", async (req, res) => {
  try{
  const client=await pg.connect();
  const rows=await client.query('UPDATE estudiantes SET estado=true WHERE estado is NULL AND nota_prom>3;UPDATE estudiantes SET estado=false WHERE estado is NULL AND nota_prom<3; INSERT INTO estudiantes(nro_matricula, año, grupo, id_cuenta, año) SELECT estudiantes.nro_matricula,añovar() as año , grupocambio (estudiantes.estado, grupos.grado, grupos.cod_grupo) as grupo,estudiantes.id_cuenta, añovar() +1 as año FROM estudiantes join grupos on estudiantes.grupo = grupos.id_grupo where estudiantes.año=añovar() and grupos.año=añovar();');
  res.json(rows);
  client.release();
}catch(err){
  res.json(err);
}
});*/
//Cambio de año
router.put("/cambioaño", async (req, res) => {
  try {
    const client = await pg.connect();
    const rows = await client.query(`UPDATE estudiantes SET nota_prom=notaestudiante(id_estudiante) WHERE estado is NULL;
  UPDATE estudiantes SET estado=true WHERE estado is NULL AND nota_prom>3;
  UPDATE estudiantes SET estado=false WHERE estado is NULL AND nota_prom<3;
  INSERT INTO grupos (año, grado, cod_grupo, id_profesor) 
  SELECT añovar()+1, grado, cod_grupo, id_profesor FROM grupos where año=añovar();
  INSERT INTO estudiantes(nro_matricula, año, grupo, id_cuenta) 
  SELECT estudiantes.nro_matricula,añovar()+1 as año , grupocambio (estudiantes.estado, grupos.grado, grupos.cod_grupo) as grupo,estudiantes.id_cuenta FROM estudiantes join grupos on estudiantes.grupo = grupos.id_grupo where (estudiantes.año=añovar() and grupos.año=añovar()) AND NOT(grupos.grado=11 AND estudiantes.estado=true);
  UPDATE año SET año = (añovar()+1);`);
    res.json(rows);
    client.release();
  } catch (err) {
    res.json(err);
  }
});
module.exports = router;