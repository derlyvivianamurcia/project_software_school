const express = require('express');
const router = express.Router();
const pg = require('./db/db').pool;

// Objeto de Guia
router.get("/", (req, res) => {
  res.json([]);
});

router.get("/materias", async (req, res) => {
  try{
  const client=await pg.connect();
  const {rows}=await client.query('SELECT * FROM estudiantes');
  res.json(rows);
  client.release();
}catch(err){
  res.json(err);
}
});
router.put("/cambioaño/:año", async (req, res) => {
  const {año} = req.params;
  try{
  const client=await pg.connect();
  const rows=await client.query('UPDATE estudiantes SET estado=true WHERE estado=NULL AND nota_prom>3;UPDATE estudiantes SET estado=false WHERE estado=NULL AND nota_prom<3;');
  res.json(rows);
  client.release();
}catch(err){
  res.json(err);
}
});
//Cambio de año
router.put("/cambioaño", async (req, res) => {
  try{
  const client=await pg.connect();
  const rows=await client.query('UPDATE estudiantes SET estado=true WHERE estado=NULL AND nota_prom>3;UPDATE estudiantes SET estado=false WHERE estado=NULL AND nota_prom<3;');
  res.json(rows);
  client.release();
}catch(err){
  res.json(err);
}
});
module.exports = router;