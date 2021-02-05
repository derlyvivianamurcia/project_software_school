const express = require('express');
const router = express.Router();
const pg = require('./../db/db').pool;
const excel = require('xlsx');
const pdf = require('html-pdf');
const fs = require('fs');
// Objeto de Guia
router.get("/", async (req, res) => {
    res.json([]);
});
router.get('/reporteestudiantesxgrupo/:id_cuenta', async(req, res) => {
    const {id_cuenta}=req.params;
    const client = await pg.connect();
    const grupos = await client.query(`UPDATE estudiantes SET nota_prom=notaestudiante(id_estudiante) WHERE aprobado is NULL;SELECT  grupos.id_grupo,
    grados.id_grados,
    grados.strgrado,
    grupos.cod_grupo
    FROM grupos join grados on grupos.grado= grados.id_grados where grupos.año = añovar() ORDER BY grados.id_grados, grupos.cod_grupo;`).then(resp=>resp.rows);    
    let libro= excel.utils.book_new();
    let name =`estudiantesxgrupo${id_cuenta}.xlsx`;
    libro=await (async (book)=>{
      for(let i=0; i<grupos.length;i++){      
        const { rows } = await client.query(`SELECT 
        concat(cuenta.nombre,' ', cuenta.apellidos) as Estudiantes,
        cuenta.correo,
        cuenta.fecha_de_nacimiento,
        genero.str_genero as Genero,
        tipo_documento.str_documento as Tipo_de_documento,
        cuenta.nro_de_documento,
        estudiantes.nota_prom as nota_promedio
        FROM estudiantes join cuenta 
        on estudiantes.id_cuenta = cuenta.id_cuenta join genero on genero.id_genero = cuenta.genero join tipo_documento on tipo_documento.id_documento = cuenta.tipo_de_documento where estudiantes.año = añovar() and cuenta.estado = true AND estudiantes.grupo=$1;`,[grupos[i].id_grupo]);
        let data = excel.utils.json_to_sheet(rows);          
        excel.utils.book_append_sheet(book, data, `${grupos[i].strgrado}-${grupos[i].cod_grupo}`);
        };
        return book;
    })(libro);    
    client.release();
    excel.writeFile(libro,name);
    res.download(`${__dirname}/../${name}`);
    setTimeout(()=>{
      try{
        fs.unlinkSync(`./${name}`);
        console.log('se elimino el archivo');
        } catch(err){
         console.log(err);
       }
    },3000);    
    
});
router.get('/reportesestudiantesxgrado/:id_cuenta', async(req, res) => {
    const {id_cuenta}=req.params;
    const client = await pg.connect();
    const grados = await client.query(`UPDATE estudiantes SET nota_prom=notaestudiante(id_estudiante) WHERE aprobado is NULL;SELECT 
    grados.id_grados,
    grados.strgrado
    FROM  grados where ORDER BY grados.id_grados`).then(resp=>resp.rows);    
    let libro= excel.utils.book_new();
    let name =`estudiantesxgrado${id_cuenta}.xlsx`;
    libro=await (async (book)=>{
      for(let i=0; i<grupos.length;i++){      
        const { rows } = await client.query(`SELECT 
        concat(cuenta.nombre,' ', cuenta.apellidos) as Estudiantes,
        cuenta.correo,
        cuenta.fecha_de_nacimiento,
        genero.str_genero as Genero,
        tipo_documento.str_documento as Tipo_de_documento,
        cuenta.nro_de_documento,
        estudiantes.nota_prom as nota_promedio,
        concat(grados.strgrado,'-', grupos.cod_grupo) as grupo
        FROM estudiantes join cuenta on estudiantes.id_cuenta = cuenta.id_cuenta 
        join genero on genero.id_genero = cuenta.genero 
        join tipo_documento on tipo_documento.id_documento = cuenta.tipo_de_documento 
        join grupos on grupos.id_grupo = estudiantes.grupo
        join grados on grupos.grado = grados.id_grados
        where estudiantes.año = añovar() and cuenta.estado = true AND grupos.grado=$1;`,[grados[i].id_grupo]);
        let data = excel.utils.json_to_sheet(rows);          
        excel.utils.book_append_sheet(book, data, `${grados[i].strgrado}`);
        };
        return book;
    })(libro);    
    client.release();
    excel.writeFile(libro,name);
    res.download(`${__dirname}/../${name}`);
    setTimeout(()=>{
      try{
        fs.unlinkSync(`./${name}`);
        console.log('se elimino el archivo');
        } catch(err){
         console.log(err);
       }
    },3000);    
    
});

router.get('/reportecantidadxgrado/:id_cuenta', async(req, res) => {
  const {id_cuenta}=req.params;
  const client = await pg.connect();
  const {rows} = await client.query('Select grados.strgrado as grado, Count(estudiantes.id_estudiante) as "Cantidad estudiantes" from grados left join grupos on grupos.grado = grados.id_grados left join estudiantes on estudiantes.grupo = grupos.id_grupo left join cuenta on cuenta.id_cuenta  = estudiantes.id_cuenta where estudiantes.aprobado is null and (cuenta.estado = true or cuenta.estado is null)   group by grados.id_grados, estudiantes.año order by grados.id_grados');
  let libro= excel.utils.book_new();
  let name =`cantidadxgrado${id_cuenta}.xlsx`;
  let data = excel.utils.json_to_sheet(rows);          
  excel.utils.book_append_sheet(book, data, `Conteo`);    
  client.release();
  excel.writeFile(libro,name);
  res.download(`${__dirname}/../${name}`);
  setTimeout(()=>{
    try{
      fs.unlinkSync(`./${name}`);
      console.log('se elimino el archivo');
      } catch(err){
       console.log(err);
     }
  },3000);    
  
});
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