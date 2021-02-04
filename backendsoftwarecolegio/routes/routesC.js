const express = require('express');
const router = express.Router();
const pg = require('./../db/db').pool;
const excel = requiere('xlsx');
const pdf = requiere('html-pdf');
// Objeto de Guia
router.get("/", (req, res) => {
  const client = await pg.connect();
    const { rows } = await client.query(`SELECT materias.codmateria,
    materias.strmateria,
    permisomateria(materias.id_materia ,1) as Primero,
    permisomateria(materias.id_materia ,1) as Segundo,
    permisomateria(materias.id_materia ,1) as Tercero,
    permisomateria(materias.id_materia ,1) as Cuarto,
    permisomateria(materias.id_materia ,1) as Quinto,
    permisomateria(materias.id_materia ,1) as Sexto,
    permisomateria(materias.id_materia ,1) as Septimo,
    permisomateria(materias.id_materia ,1) as Octavo,
    permisomateria(materias.id_materia ,1) as Noveno,
    permisomateria(materias.id_materia ,1) as Decimo,
    permisomateria(materias.id_materia ,1) as Once,
    concat(cuenta.nombre,' ', cuenta.apellidos) as Profesor
    FROM materias join profesores 
    on profesores.id_profesor = materias.id_profesor join cuenta on  cuenta.id_cuenta = profesores.id_cuenta;`);    
    client.release();
    let data = excel.utils.json_to_sheet(rows);
    let libro= excel.utils.book_new();
    excel.utils.book_append_sheet(libro, data, 'prueba');
    excel.writeFile(libro,'prueba.xlsx');
  res.json([]);
});
router.get('/reportesprueba'

);
//materias
router.get("/adminmaterias", async (req, res) => {
  try {
    const client = await pg.connect();
    const { rows } = await client.query(`SELECT materias.codmateria,
    materias.strmateria,
    permisomateria(materias.id_materia ,1) as Primero,
    permisomateria(materias.id_materia ,1) as Segundo,
    permisomateria(materias.id_materia ,1) as Tercero,
    permisomateria(materias.id_materia ,1) as Cuarto,
    permisomateria(materias.id_materia ,1) as Quinto,
    permisomateria(materias.id_materia ,1) as Sexto,
    permisomateria(materias.id_materia ,1) as Septimo,
    permisomateria(materias.id_materia ,1) as Octavo,
    permisomateria(materias.id_materia ,1) as Noveno,
    permisomateria(materias.id_materia ,1) as Decimo,
    permisomateria(materias.id_materia ,1) as Once,
    concat(cuenta.nombre,' ', cuenta.apellidos) as Profesor
    FROM materias join profesores 
    on profesores.id_profesor = materias.id_profesor join cuenta on  cuenta.id_cuenta = profesores.id_cuenta;`);
    res.json(rows);
    client.release();
  } catch (err) {
    res.json(err);
  }
});
router.post("/adminmaterias", async (req, res) => {
  const {codmateria, strmateria, id_profesor, permisos}=req.body;
    try {
    const client = await pg.connect();
    const rows = await client.query('INSERT INTO materias(codmateria, strmateria, id_profesor) VALUES($1,$2,$3)',[codmateria, strmateria, id_profesor]);

    let query='INSERT INTO materias_en_grado(id_materia,id_grado,permiso) VALUES';
    for(let i=0;permisos.length>i;i++){
      query+='((select log_cnt from sq_materias), '+(i+1)+', '+ permisos[i]+')'+(i!=(permisos.length-1)?',':'');
    }
    const rows2 = await client.query(query);
    res.json([rows, rows2]);
    client.release();
  } catch (err) {
    res.json(err);
  }
});
router.put("/adminmaterias/:id_materia", async (req, res) => {
  const {codmateria, strmateria, id_profesor, permisos}=req.body;
  const {id_materia}=req.params;
    try {
    const client = await pg.connect();
    const rows = await client.query('UPDATE materias set codmateria=$1 , strmateria=$2, id_profesor=$3 WHERE  id_materia= $4',[codmateria, strmateria, id_profesor, id_materia]);

    let query='UPDATE materias_en_grado set permiso = ';
    for(let i=0;permisos.length>i;i++){ 
      query+= permisos[i]+' WHERE id_materia='+id_materia+' AND id_grado ='+ (i+1)+ ';';
    }
    const rows2 = await client.query(query);
    res.json([rows, rows2]);
    client.release();
  } catch (err) {
    res.json(err);
  }
});
router.delete("/adminmaterias/:id_materia", async (req, res) => {
  const {id_materia}=req.params;
    try {
    const client = await pg.connect();3
    const rows = await client.query('DELETE materias WHERE id_materia= $1',[id_materia]);
    res.json(rows);
    client.release();
  } catch (err) {
    res.json(err);
  }
});
//Cambio de año
router.put("/cambioaño", async (req, res) => {
  try {
    const client = await pg.connect();
    const rows = await client.query(`UPDATE estudiantes SET nota_prom=notaestudiante(id_estudiante) WHERE aprobado is NULL;
    UPDATE estudiantes SET aprobado=true WHERE aprobado is NULL AND nota_prom>3;
    UPDATE estudiantes SET aprobado=false WHERE aprobado is NULL AND nota_prom<3;
    INSERT INTO grupos (año, grado, cod_grupo, id_profesor) 
    SELECT añovar()+1, grado, cod_grupo, id_profesor FROM grupos where año=añovar();
    INSERT INTO estudiantes(nro_matricula, año, grupo, id_cuenta) 
    SELECT estudiantes.nro_matricula,añovar()+1 as año , grupocambio (estudiantes.aprobado, grupos.grado, grupos.cod_grupo) as grupo,estudiantes.id_cuenta FROM estudiantes join grupos on estudiantes.grupo = grupos.id_grupo where (estudiantes.año=añovar() and grupos.año=añovar()) AND NOT(grupos.grado=11 AND estudiantes.aprobado=true);
    UPDATE año SET año = (añovar()+1);
    ALTER SEQUENCE sq_matricula RESTART WITH 1`);
    res.json(rows);
    client.release();
  } catch (err) {
    res.json(err);
  }
});
module.exports = router;