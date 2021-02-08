const express = require('express');
const router = express.Router();
const pg = require('./../db/db').pool;
const excel = require('xlsx');
const pdf = require('html-pdf');
const fs = require('fs');
let config = {
  format: "Legal",
  border: "1 cm"
};
// Objeto de Guia
router.get("/", async (req, res) => {
  res.json([]);
});
//reportes
router.get('/reporteestudiantesxgrupo/:id_cuenta', async (req, res) => {
  try {
    const { id_cuenta } = req.params;
    const client = await pg.connect();
    const grupos = await client.query(`UPDATE estudiantes SET nota_prom=notaestudiante(id_estudiante) WHERE año=añovar();SELECT  grupos.id_grupo,
    grados.id_grados,
    grados.strgrado,
    grupos.cod_grupo
    FROM grupos join grados on grupos.grado= grados.id_grados where grupos.año = añovar() ORDER BY grados.id_grados, grupos.cod_grupo;`).then(resp => resp[1].rows);
    let libro = excel.utils.book_new();
    let name = `estudiantesxgrupo${id_cuenta}.xlsx`;
    libro = await (async (book) => {
      for (let i = 0; i < grupos.length; i++) {
        const { rows } = await client.query(`SELECT concat(cuenta.nombre,' ', cuenta.apellidos) as Estudiantes, cuenta.correo, cuenta.edad,cuenta.fecha_de_nacimiento, genero.str_genero as Genero, tipo_documento.str_documento as Tipo_de_documento, cuenta.nro_de_documento, estudiantes.nota_prom as nota_promedio FROM estudiantes join cuenta on estudiantes.id_cuenta = cuenta.id_cuenta join genero on genero.id_genero = cuenta.genero join tipo_documento on tipo_documento.id_documento = cuenta.tipo_de_documento where estudiantes.año = añovar() and cuenta.estado = true AND estudiantes.grupo=$1;`, [grupos[i].id_grupo]);
        let data = excel.utils.json_to_sheet(rows);
        excel.utils.book_append_sheet(book, data, `${grupos[i].strgrado}-${grupos[i].cod_grupo}`);
      };
      return book;
    })(libro);
    client.release();
    excel.writeFile(libro, name);
    res.download(`${__dirname}/../${name}`);
    setTimeout(() => {
      try {
        fs.unlinkSync(`./${name}`);
        console.log('se elimino el archivo');
      } catch (err) {
        console.log(err);
      }
    }, 3000);
  } catch (err) {
    res.json(err);
  }
});

router.get('/pdfreporteestudiantesxgrupo/:id_cuenta', async (req, res) => {
  try {
    config.orientation = 'landscape';
    const { id_cuenta } = req.params;
    const client = await pg.connect();
    const grupos = await client.query(`UPDATE estudiantes SET nota_prom=notaestudiante(id_estudiante) WHERE año=añovar();SELECT grupos.id_grupo,
  grados.id_grados,
  grados.strgrado,
  grupos.cod_grupo
  FROM grupos 
  join grados on grupos.grado= grados.id_grados 
  where grupos.año = añovar() 
  ORDER BY grados.id_grados, grupos.cod_grupo;`).then(resp => resp[1].rows);
    let name = `estudiantesxgrupo${id_cuenta}.pdf`;
    let diseño = '';
    diseño = await (async (book) => {
      for (let i = 0; i < grupos.length; i++) {
        const { rows, fields } = await client.query(`SELECT concat(cuenta.nombre,' ', cuenta.apellidos) as Estudiantes,
         cuenta.correo,
          cuenta.edad,cuenta.fecha_de_nacimiento, genero.str_genero as Genero, tipo_documento.str_documento as Tipo_de_documento, cuenta.nro_de_documento, estudiantes.nota_prom as nota_promedio FROM estudiantes join cuenta on estudiantes.id_cuenta = cuenta.id_cuenta join genero on genero.id_genero = cuenta.genero join tipo_documento on tipo_documento.id_documento = cuenta.tipo_de_documento where estudiantes.año = añovar() and cuenta.estado = true AND estudiantes.grupo=$1;`, [grupos[i].id_grupo]);
        book += `<div><h1><center>${grupos[i].strgrado}-${grupos[i].cod_grupo}</center></h1>
      <table style='width:100%; border: 1px solid black; border-collapse:collapse;'><tr style='border: 1px solid black; border-collapse:collapse;'>`;
        book += `${fields.map((value) => { return (`<th style='border: 1px solid black; border-collapse:collapse;'>${value.name}</th>`) }).join('')}</tr>`;
        book += rows.map((value) => { return (`<tr style='border: 1px solid black; border-collapse:collapse;'>${fields.map((fiel) => { return `<td style='border: 1px solid black; border-collapse:collapse;'>${typeof (value[fiel.name]) == 'object' ? new Date(value[fiel.name]).toLocaleDateString() : value[fiel.name]}</td>` }).join('')}</tr>`) }).join('') + '</table></div>';
      };
      return book;
    })(diseño);
    client.release();
    pdf.create(diseño, config).toFile(name, (err, resp) => {
      if (err) {
        console.log(err);
        res.json({ error: err })
      }
      else {
        res.download(`${__dirname}/../${name}`)
        setTimeout(() => {
          try {
            fs.unlinkSync(`./${name}`);
            console.log('se elimino el archivo');
          } catch (err) {
            console.log(err);
          }
        }, 3000);
      }
    });
  } catch (err) {
    res.json(err);
  }
});

router.get('/reportesestudiantesxgrado/:id_cuenta', async (req, res) => {
  try {
    const { id_cuenta } = req.params;
    const client = await pg.connect();
    const grados = await client.query(`UPDATE estudiantes SET nota_prom=notaestudiante(id_estudiante) WHERE año=añovar();SELECT 
    grados.id_grados,
    grados.strgrado
    FROM  grados ORDER BY grados.id_grados`).then(resp => resp[1].rows);
    let libro = excel.utils.book_new();
    let name = `estudiantesxgrado${id_cuenta}.xlsx`;
    libro = await (async (book) => {
      for (let i = 0; i < grupos.length; i++) {
        const { rows } = await client.query(`SELECT 
        concat(cuenta.nombre,' ', cuenta.apellidos) as Estudiantes,
        cuenta.correo,
        cuenta.edad,
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
        where estudiantes.año = añovar() and cuenta.estado = true AND grupos.grado=$1;`, [grados[i].id_grados]);
        let data = excel.utils.json_to_sheet(rows);
        excel.utils.book_append_sheet(book, data, `${grados[i].strgrado}`);
      };
      return book;
    })(libro);
    client.release();
    excel.writeFile(libro, name);
    res.download(`${__dirname}/../${name}`);
    setTimeout(() => {
      try {
        fs.unlinkSync(`./${name}`);
        console.log('se elimino el archivo');
      } catch (err) {
        console.log(err);
      }
    }, 3000);
  } catch (err) {
    res.json(err);
  }
});

router.get('/pdfreportesestudiantesxgrado/:id_cuenta', async (req, res) => {
  try {
    config.orientation = 'landscape';
    const { id_cuenta } = req.params;
    const client = await pg.connect();
    const grupos = await client.query(`UPDATE estudiantes SET nota_prom=notaestudiante(id_estudiante) WHERE año=añovar();SELECT 
  grados.id_grados,
  grados.strgrado
  FROM  grados ORDER BY grados.id_grados`).then(resp => resp[1].rows);
    let name = `estudiantesxgrado${id_cuenta}.pdf`;
    let diseño = '';
    diseño = await (async (book) => {
      for (let i = 0; i < grupos.length; i++) {
        const { rows, fields } = await client.query(`SELECT 
      concat(cuenta.nombre,' ', cuenta.apellidos) as Estudiantes,
      cuenta.correo,
      cuenta.edad,
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
      where estudiantes.año = añovar() and cuenta.estado = true AND grupos.grado=$1;`, [grupos[i].id_grados]);
        book += `<div><h1><center>${grupos[i].strgrado}</center></h1>
      <table style='width:100%; border: 1px solid black; border-collapse:collapse;'><tr style='border: 1px solid black; border-collapse:collapse;'>`;
        book += `${fields.map((value) => { return (`<th style='border: 1px solid black; border-collapse:collapse;'>${value.name}</th>`) }).join('')}</tr>`;
        book += rows.map((value) => { return (`<tr style='border: 1px solid black; border-collapse:collapse;'>${fields.map((fiel) => { return `<td style='border: 1px solid black; border-collapse:collapse;'>${typeof (value[fiel.name]) == 'object' ? new Date(value[fiel.name]).toLocaleDateString() : value[fiel.name]}</td>` }).join('')}</tr>`) }).join('') + '</table></div>';
      };
      return book;
    })(diseño);
    client.release();
    pdf.create(diseño, config).toFile(name, (err, resp) => {
      if (err) {
        console.log(err);
        res.json({ error: err })
      }
      else {
        res.download(`${__dirname}/../${name}`)
        setTimeout(() => {
          try {
            fs.unlinkSync(`./${name}`);
            console.log('se elimino el archivo');
          } catch (err) {
            console.log(err);
          }
        }, 3000);
      }
    });
  } catch (err) {
    res.json();
  }
});

router.get('/reportecantidadxgrado/:id_cuenta', async (req, res) => {
  try {
    const { id_cuenta } = req.params;
    const client = await pg.connect();
    const { rows } = await client.query('Select grados.strgrado as grado, Count(estudiantes.id_estudiante) as "Cantidad estudiantes" from grados left join grupos on grupos.grado = grados.id_grados left join estudiantes on estudiantes.grupo = grupos.id_grupo left join cuenta on cuenta.id_cuenta  = estudiantes.id_cuenta where estudiantes.aprobado is null and (cuenta.estado = true or cuenta.estado is null) and estudiantes.año =añovar()  group by grados.id_grados order by grados.id_grados');
    let libro = excel.utils.book_new();
    let name = `cantidadxgrado${id_cuenta}.xlsx`;
    let data = excel.utils.json_to_sheet(rows);
    excel.utils.book_append_sheet(libro, data, `Conteo`);
    client.release();
    excel.writeFile(libro, name);
    res.download(`${__dirname}/../${name}`);
    setTimeout(() => {
      try {
        fs.unlinkSync(`./${name}`);
        console.log('se elimino el archivo');
      } catch (err) {
        console.log(err);
      }
    }, 3000);
  } catch (err) {
    res.json(err);
  }
});
router.get('/pdfreportecantidadxgrado/:id_cuenta', async (req, res) => {
  try {
    config.orientation = 'portait';
    const { id_cuenta } = req.params;
    const client = await pg.connect();
    const { rows, fields } = await client.query('Select grados.strgrado as grado, Count(estudiantes.id_estudiante) as "Cantidad estudiantes" from grados left join grupos on grupos.grado = grados.id_grados left join estudiantes on estudiantes.grupo = grupos.id_grupo left join cuenta on cuenta.id_cuenta  = estudiantes.id_cuenta where estudiantes.aprobado is null and (cuenta.estado = true or cuenta.estado is null) and estudiantes.año =añovar()  group by grados.id_grados order by grados.id_grados');
    let name = `cantidadxgrado${id_cuenta}.pfd`;
    client.release();
    let diseño = `<div><h1><center>Cantidaad de estudiantes por grado</center></h1>
    <table style='width:100%; border: 1px solid black; border-collapse:collapse;'><tr style='border: 1px solid black; border-collapse:collapse;'>`;
    diseño += `${fields.map((value) => { return (`<th style='border: 1px solid black; border-collapse:collapse;'>${value.name}</th>`) }).join('')}</tr>`;
    diseño += rows.map((value) => { return (`<tr style='border: 1px solid black; border-collapse:collapse;'>${fields.map((fiel) => { return `<td style='border: 1px solid black; border-collapse:collapse;'>${typeof (value[fiel.name]) == 'object' ? new Date(value[fiel.name]).toLocaleDateString() : value[fiel.name]}</td>` }).join('')}</tr>`) }).join('') + '</table></div>';
    pdf.create(diseño, config).toFile(name, (err, resp) => {
      if (err) {
        console.log(err);
        res.json({ error: err })
      }
      else {
        res.download(`${__dirname}/../${name}`)
        setTimeout(() => {
          try {
            fs.unlinkSync(`./${name}`);
            console.log('se elimino el archivo');
          } catch (err) {
            console.log(err);
          }
        }, 3000);
      }
    });
  } catch (err) {
    res.json();
  }
});

router.get('/reportecantidadxgrupo/:id_cuenta', async (req, res) => {
  try {
    const { id_cuenta } = req.params;
    const client = await pg.connect();
    const { rows, fields } = await client.query(`Select concat(grados.strgrado, '-',grupos.cod_grupo) as grupo, Count(estudiantes.id_estudiante) as "Cantidad estudiantes" from grados left join grupos on grupos.grado = grados.id_grados left join estudiantes on estudiantes.grupo = grupos.id_grupo left join cuenta on cuenta.id_cuenta  = estudiantes.id_cuenta where estudiantes.año =añovar() and estudiantes.aprobado is null and (cuenta.estado = true or cuenta.estado is null)  group by grupos.id_grupo, grados.id_grados order by grados.id_grados, grupos.cod_grupo`);
    let libro = excel.utils.book_new();
    let name = `cantidadxgrupo${id_cuenta}.xlsx`;
    let data = excel.utils.json_to_sheet(rows);
    excel.utils.book_append_sheet(libro, data, `Conteo`);
    client.release();
    excel.writeFile(libro, name);
    res.download(`${__dirname}/../${name}`);
    setTimeout(() => {
      try {
        fs.unlinkSync(`./${name}`);
        console.log('se elimino el archivo');
      } catch (err) {
        console.log(err);
      }
    }, 3000);
  } catch (err) { res.json(err) }
});

router.get('/pdfreportecantidadxgrupo/:id_cuenta', async (req, res) => {
  try {
    config.orientation = 'portait';
    const { id_cuenta } = req.params;
    const client = await pg.connect();
    const { rows, fields } = await client.query(`Select concat(grados.strgrado, '-',grupos.cod_grupo) as grupo, Count(estudiantes.id_estudiante) as "Cantidad estudiantes" from grados left join grupos on grupos.grado = grados.id_grados left join estudiantes on estudiantes.grupo = grupos.id_grupo left join cuenta on cuenta.id_cuenta  = estudiantes.id_cuenta where estudiantes.año =añovar() and estudiantes.aprobado is null and (cuenta.estado = true or cuenta.estado is null)  group by grupos.id_grupo, grados.id_grados order by grados.id_grados, grupos.cod_grupo`);
    let name = `cantidadxgrupo${id_cuenta}.pfd`;
    client.release();
    let diseño = `<div><h1><center>Cantidaad de estudiantes por grupo</center></h1>
    <table style='width:100%; border: 1px solid black; border-collapse:collapse;'><tr style='border: 1px solid black; border-collapse:collapse;'>`;
    diseño += `${fields.map((value) => { return (`<th style='border: 1px solid black; border-collapse:collapse;'>${value.name}</th>`) }).join('')}</tr>`;
    diseño += rows.map((value) => { return (`<tr style='border: 1px solid black; border-collapse:collapse;'>${fields.map((fiel) => { return `<td style='border: 1px solid black; border-collapse:collapse;'>${typeof (value[fiel.name]) == 'object' ? new Date(value[fiel.name]).toLocaleDateString() : value[fiel.name]}</td>` }).join('')}</tr>`) }).join('') + '</table></div>';
    pdf.create(diseño, config).toFile(name, (err, resp) => {
      if (err) {
        console.log(err);
        res.json({ error: err })
      }
      else {
        res.download(`${__dirname}/../${name}`)
        setTimeout(() => {
          try {
            fs.unlinkSync(`./${name}`);
            console.log('se elimino el archivo');
          } catch (err) {
            console.log(err);
          }
        }, 3000);
      }
    });
  } catch (err) {
    res.json();
  }
});

router.get('/reportecantidadxasignatura/:id_cuenta', async (req, res) => {
  const { id_cuenta } = req.params;
  const client = await pg.connect();
  const { rows } = await client.query(`Select materias.strmateria as materias, 
  Count(estudiantes.id_estudiante) as "Cantidad estudiantes"
   from materias
   join materia_en_grado on  materia_en_grado.id_materia =materias.id_materia 
   join grados on grados.id_grados = materia_en_grado.id_grado 
  join grupos on grupos.grado = grados.id_grados 
   join estudiantes on estudiantes.grupo = grupos.id_grupo 
   join cuenta on cuenta.id_cuenta  = estudiantes.id_cuenta 
   where estudiantes.año = añovar() and cuenta.estado = true  and materia_en_grado.permiso =true
   group by materias.id_materia 
   order by materias.strmateria 
  `);
  let libro = excel.utils.book_new();
  let name = `cantidadxasignatura${id_cuenta}.xlsx`;
  let data = excel.utils.json_to_sheet(rows);
  excel.utils.book_append_sheet(libro, data, `Conteo`);
  client.release();
  excel.writeFile(libro, name);
  res.download(`${__dirname}/../${name}`);
  setTimeout(() => {
    try {
      fs.unlinkSync(`./${name}`);
      console.log('se elimino el archivo');
    } catch (err) {
      console.log(err);
    }
  }, 3000);
});

router.get('/pdfreportecantidadxasignatura/:id_cuenta', async (req, res) => {
  try {
    config.orientation = 'portait';
    const { id_cuenta } = req.params;
    const client = await pg.connect();
    const { rows, fields } = await client.query(`Select materias.strmateria as materias, 
    Count(estudiantes.id_estudiante) as "Cantidad estudiantes"
     from materias
     join materia_en_grado on  materia_en_grado.id_materia =materias.id_materia 
     join grados on grados.id_grados = materia_en_grado.id_grado 
    join grupos on grupos.grado = grados.id_grados 
     join estudiantes on estudiantes.grupo = grupos.id_grupo 
     join cuenta on cuenta.id_cuenta  = estudiantes.id_cuenta 
     where estudiantes.año = añovar() and cuenta.estado = true  and materia_en_grado.permiso =true
     group by materias.id_materia 
     order by materias.strmateria 
    `);
    let name = `cantidadxgrupo${id_cuenta}.pfd`;
    client.release();
    let diseño = `<div><h1><center>Cantidaad de estudiantes por asignatura</center></h1>
    <table style='width:100%; border: 1px solid black; border-collapse:collapse;'><tr style='border: 1px solid black; border-collapse:collapse;'>`;
    diseño += `${fields.map((value) => { return (`<th style='border: 1px solid black; border-collapse:collapse;'>${value.name}</th>`) }).join('')}</tr>`;
    diseño += rows.map((value) => { return (`<tr style='border: 1px solid black; border-collapse:collapse;'>${fields.map((fiel) => { return `<td style='border: 1px solid black; border-collapse:collapse;'>${typeof (value[fiel.name]) == 'object' ? new Date(value[fiel.name]).toLocaleDateString() : value[fiel.name]}</td>` }).join('')}</tr>`) }).join('') + '</table></div>';
    pdf.create(diseño, config).toFile(name, (err, resp) => {
      if (err) {
        console.log(err);
        res.json({ error: err })
      }
      else {
        res.download(`${__dirname}/../${name}`)
        setTimeout(() => {
          try {
            fs.unlinkSync(`./${name}`);
            console.log('se elimino el archivo');
          } catch (err) {
            console.log(err);
          }
        }, 3000);
      }
    });
  } catch (err) {
    res.json();
  }
});
router.get('/reportecantidadxprofesor/:id_cuenta', async (req, res) => {
  try {
    const { id_cuenta } = req.params;
    const client = await pg.connect();
    const { rows } = await client.query(`select concat(cuenta.nombre,' ',cuenta.apellidos) as profesor,
  count(tabla1.Cantidad)
  from 
  (Select profesores.id_profesor as profe, 
  profesores.id_cuenta as pcuenta, 
    Count(estudiantes.id_estudiante) as cantidad
     from materias
     join materia_en_grado on  materia_en_grado.id_materia =materias.id_materia 
     join grados on grados.id_grados = materia_en_grado.id_grado 
    join grupos on grupos.grado = grados.id_grados 
     join estudiantes on estudiantes.grupo = grupos.id_grupo 
     join cuenta on cuenta.id_cuenta  = estudiantes.id_cuenta 
     join profesores on materias.id_profesor = profesores.id_profesor 
     where estudiantes.año = añovar() and cuenta.estado = true  and materia_en_grado.permiso =true
     group by estudiantes.id_estudiante, profesores.id_profesor)
     tabla1 join cuenta on tabla1.pcuenta=cuenta.id_cuenta
     where cuenta.estado =true
     group by tabla1.profe,concat(cuenta.nombre,' ',cuenta.apellidos)
     order by concat(cuenta.nombre,' ',cuenta.apellidos)
  `);
    let libro = excel.utils.book_new();
    let name = `cantidadxprofesor${id_cuenta}.xlsx`;
    let data = excel.utils.json_to_sheet(rows);
    excel.utils.book_append_sheet(libro, data, `Conteo`);
    client.release();
    excel.writeFile(libro, name);
    res.download(`${__dirname}/../${name}`);
    setTimeout(() => {
      try {
        fs.unlinkSync(`./${name}`);
        console.log('se elimino el archivo');
      } catch (err) {
        console.log(err);
      }
    }, 3000);
  } catch (err) {
    res.json(err);
  }
});
router.get('/pdfreportecantidadxprofesor/:id_cuenta', async (req, res) => {
  try {
    config.orientation = 'portait';
    const { id_cuenta } = req.params;
    const client = await pg.connect();
    const { rows, fields } = await client.query(`select concat(cuenta.nombre,' ',cuenta.apellidos) as profesor,
    count(tabla1.Cantidad)
    from 
    (Select profesores.id_profesor as profe, 
    profesores.id_cuenta as pcuenta, 
      Count(estudiantes.id_estudiante) as cantidad
       from materias
       join materia_en_grado on  materia_en_grado.id_materia =materias.id_materia 
       join grados on grados.id_grados = materia_en_grado.id_grado 
      join grupos on grupos.grado = grados.id_grados 
       join estudiantes on estudiantes.grupo = grupos.id_grupo 
       join cuenta on cuenta.id_cuenta  = estudiantes.id_cuenta 
       join profesores on materias.id_profesor = profesores.id_profesor 
       where estudiantes.año = añovar() and cuenta.estado = true  and materia_en_grado.permiso =true
       group by estudiantes.id_estudiante, profesores.id_profesor)
       tabla1 join cuenta on tabla1.pcuenta=cuenta.id_cuenta
       where cuenta.estado =true
       group by tabla1.profe,concat(cuenta.nombre,' ',cuenta.apellidos)
       order by concat(cuenta.nombre,' ',cuenta.apellidos)
    `);
    let name = `cantidadxprofesor${id_cuenta}.pfd`;
    client.release();
    let diseño = `<div><h1><center>Cantidaad de estudiantes por profesor</center></h1>
    <table style='width:100%; border: 1px solid black; border-collapse:collapse;'><tr style='border: 1px solid black; border-collapse:collapse;'>`;
    diseño += `${fields.map((value) => { return (`<th style='border: 1px solid black; border-collapse:collapse;'>${value.name}</th>`) }).join('')}</tr>`;
    diseño += rows.map((value) => { return (`<tr style='border: 1px solid black; border-collapse:collapse;'>${fields.map((fiel) => { return `<td style='border: 1px solid black; border-collapse:collapse;'>${typeof (value[fiel.name]) == 'object' ? new Date(value[fiel.name]).toLocaleDateString() : value[fiel.name]}</td>` }).join('')}</tr>`) }).join('') + '</table></div>';
    pdf.create(diseño, config).toFile(name, (err, resp) => {
      if (err) {
        console.log(err);
        res.json({ error: err })
      }
      else {
        res.download(`${__dirname}/../${name}`)
        setTimeout(() => {
          try {
            fs.unlinkSync(`./${name}`);
            console.log('se elimino el archivo');
          } catch (err) {
            console.log(err);
          }
        }, 3000);
      }
    });
  } catch (err) {
    res.json();
  }
});
router.get('/reportenotasxalumno/:id_cuenta', async (req, res) => {
  try {
    const { id_cuenta } = req.params;
    const client = await pg.connect();
    const estudiantes = await client.query(`select estudiantes.id_estudiante, concat(cuenta.nombre,' ', cuenta.apellidos) as nombre from estudiantes join cuenta on cuenta.id_cuenta = estudiantes.id_cuenta join grupos on estudiantes.grupo = grupos.id_grupo join grados on grupos.grado =grados.id_grados where estudiantes.año =añovar() order by grados.id_grados, grupos.cod_grupo, cuenta.apellidos, cuenta.nombre;`).then(resp => resp.rows);
    let libro = excel.utils.book_new();
    let name = `notasxestudiantes${id_cuenta}.xlsx`;
    libro = await (async (book) => {
      for (let i = 0; i < estudiantes.length; i++) {
        const { rows } = await client.query(`select materias.strmateria as "Materia", nota_materia(estudiantes.id_estudiante , materias.id_materia ) as "Nota" from materias 
        left join materia_en_grado meg on meg.id_materia = materias.id_materia 
        left join grados on grados.id_grados = meg.id_grado 
        left join grupos on grados.id_grados =grupos.grado 
        left join estudiantes on estudiantes.grupo = grupos.id_grupo where estudiantes.id_estudiante =$1 and meg.permiso=true;`, [estudiantes[i].id_estudiante]);
        let data = excel.utils.json_to_sheet(rows);
        excel.utils.book_append_sheet(book, data, `${estudiantes[i].nombre}`);
      };
      return book;
    })(libro);
    client.release();
    excel.writeFile(libro, name);
    res.download(`${__dirname}/../${name}`);
    setTimeout(() => {
      try {
        fs.unlinkSync(`./${name}`);
        console.log('se elimino el archivo');
      } catch (err) {
        console.log(err);
      }
    }, 3000);
  } catch (err) { res.json(err); }
});

router.get('/pdfreportenotasxalumno/:id_cuenta', async (req, res) => {
  try {
    config.orientation = 'landscape';
    const { id_cuenta } = req.params;
    const client = await pg.connect();
    const grupos = await client.query(`select estudiantes.id_estudiante, concat(cuenta.nombre,' ', cuenta.apellidos) as nombre from estudiantes join cuenta on cuenta.id_cuenta = estudiantes.id_cuenta join grupos on estudiantes.grupo = grupos.id_grupo join grados on grupos.grado =grados.id_grados where estudiantes.año =añovar() order by grados.id_grados, grupos.cod_grupo, cuenta.apellidos, cuenta.nombre;`).then(resp => resp.rows);
    let name = `notasxestudiantes${id_cuenta}.pdf`;
    let diseño = '';
    diseño = await (async (book) => {
      for (let i = 0; i < grupos.length; i++) {
        const { rows, fields } = await client.query(`select materias.strmateria as "Materia", nota_materia(estudiantes.id_estudiante , materias.id_materia ) as "Nota" from materias 
        left join materia_en_grado meg on meg.id_materia = materias.id_materia 
        left join grados on grados.id_grados = meg.id_grado 
        left join grupos on grados.id_grados =grupos.grado 
        left join estudiantes on estudiantes.grupo = grupos.id_grupo where estudiantes.id_estudiante =$1 and meg.permiso=true;`, [grupos[i].id_estudiante]);
        book += `<div><h1><center>${grupos[i].nombre}</center></h1>
      <table style='width:100%; border: 1px solid black; border-collapse:collapse;'><tr style='border: 1px solid black; border-collapse:collapse;'>`;
        book += `${fields.map((value) => { return (`<th style='border: 1px solid black; border-collapse:collapse;'>${value.name}</th>`) }).join('')}</tr>`;
        book += rows.map((value) => { return (`<tr style='border: 1px solid black; border-collapse:collapse;'>${fields.map((fiel) => { return `<td style='border: 1px solid black; border-collapse:collapse;'>${typeof (value[fiel.name]) == 'object' ? new Date(value[fiel.name]).toLocaleDateString() : value[fiel.name]}</td>` }).join('')}</tr>`) }).join('') + '</table></div>';
      };
      return book;
    })(diseño);
    client.release();
    pdf.create(diseño, config).toFile(name, (err, resp) => {
      if (err) {
        console.log(err);
        res.json({ error: err })
      }
      else {
        res.download(`${__dirname}/../${name}`)
        setTimeout(() => {
          try {
            fs.unlinkSync(`./${name}`);
            console.log('se elimino el archivo');
          } catch (err) {
            console.log(err);
          }
        }, 3000);
      }
    });
  } catch (err) {
    res.json();
  }
});
router.get('/reportenotasxmateria/:id_cuenta', async (req, res) => {
  try {
    const { id_cuenta } = req.params;
    const client = await pg.connect();
    const { rows } = await client.query(`select materias.strmateria as "Materia", avg(nota_materia(estudiantes.id_estudiante , materias.id_materia )) as "Nota" 
  from materias 
          left join materia_en_grado meg on meg.id_materia = materias.id_materia 
          left join grados on grados.id_grados = meg.id_grado 
          left join grupos on grados.id_grados =grupos.grado 
          left join estudiantes on estudiantes.grupo = grupos.id_grupo 
          left join cuenta on cuenta.id_cuenta = estudiantes.id_cuenta   
          where meg.permiso =true and estudiantes.año=añovar() and cuenta.estado=true
          group by materias.id_materia
          order by materias.strmateria;
  `);
    let libro = excel.utils.book_new();
    let name = `notasxasignatura${id_cuenta}.xlsx`;
    let data = excel.utils.json_to_sheet(rows);
    excel.utils.book_append_sheet(libro, data, `notas`);
    client.release();
    excel.writeFile(libro, name);
    res.download(`${__dirname}/../${name}`);
    setTimeout(() => {
      try {
        fs.unlinkSync(`./${name}`);
        console.log('se elimino el archivo');
      } catch (err) {
        console.log(err);
      }
    }, 3000);
  } catch (err) {
    res.json(json);
  }
});

router.get('/pdfreportenotasxmateria/:id_cuenta', async (req, res) => {
  try {
    config.orientation = 'portait';
    const { id_cuenta } = req.params;
    const client = await pg.connect();
    const { rows, fields } = await client.query(`select materias.strmateria as "Materia", avg(nota_materia(estudiantes.id_estudiante , materias.id_materia )) as "Nota" 
    from materias 
            left join materia_en_grado meg on meg.id_materia = materias.id_materia 
            left join grados on grados.id_grados = meg.id_grado 
            left join grupos on grados.id_grados =grupos.grado 
            left join estudiantes on estudiantes.grupo = grupos.id_grupo 
            left join cuenta on cuenta.id_cuenta = estudiantes.id_cuenta   
            where meg.permiso =true and estudiantes.año=añovar() and cuenta.estado=true
            group by materias.id_materia
            order by materias.strmateria;`);
    let name = `notasxmateria${id_cuenta}.pfd`;
    client.release();
    let diseño = `<div><h1><center>Nota promedio por materia</center></h1>
    <table style='width:100%; border: 1px solid black; border-collapse:collapse;'><tr style='border: 1px solid black; border-collapse:collapse;'>`;
    diseño += `${fields.map((value) => { return (`<th style='border: 1px solid black; border-collapse:collapse;'>${value.name}</th>`) }).join('')}</tr>`;
    diseño += rows.map((value) => { return (`<tr style='border: 1px solid black; border-collapse:collapse;'>${fields.map((fiel) => { return `<td style='border: 1px solid black; border-collapse:collapse;'>${typeof (value[fiel.name]) == 'object' ? new Date(value[fiel.name]).toLocaleDateString() : value[fiel.name]}</td>` }).join('')}</tr>`) }).join('') + '</table></div>';
    pdf.create(diseño, config).toFile(name, (err, resp) => {
      if (err) {
        console.log(err);
        res.json({ error: err })
      }
      else {
        res.download(`${__dirname}/../${name}`)
        setTimeout(() => {
          try {
            fs.unlinkSync(`./${name}`);
            console.log('se elimino el archivo');
          } catch (err) {
            console.log(err);
          }
        }, 3000);
      }
    });
  } catch (err) {
    res.json();
  }
});
router.get('/reportenotasxgrado/:id_cuenta', async (req, res) => {
  try {
    const { id_cuenta } = req.params;
    const client = await pg.connect();
    const { rows } = await client.query(`select grados.strgrado as grado , avg(estudiantes.nota_prom) as "Nota" 
  from  grados  
          left join grupos on grados.id_grados =grupos.grado 
          left join estudiantes on estudiantes.grupo = grupos.id_grupo 
          left join cuenta on cuenta.id_cuenta =estudiantes.id_cuenta 
          group by grados.id_grados 
          order by grados.id_grados;
  `);
    let libro = excel.utils.book_new();
    let name = `notasxgrado${id_cuenta}.xlsx`;
    let data = excel.utils.json_to_sheet(rows);
    excel.utils.book_append_sheet(libro, data, `notas`);
    client.release();
    excel.writeFile(libro, name);
    res.download(`${__dirname}/../${name}`);
    setTimeout(() => {
      try {
        fs.unlinkSync(`./${name}`);
        console.log('se elimino el archivo');
      } catch (err) {
        console.log(err);
      }
    }, 3000);
  } catch (err) {
    res.json(err);
  }
});
router.get('/pdfreportenotasxgrado/:id_cuenta', async (req, res) => {
  try {
    config.orientation = 'portait';
    const { id_cuenta } = req.params;
    const client = await pg.connect();
    const { rows, fields } = await client.query(`select grados.strgrado as grado , avg(estudiantes.nota_prom) as "Nota" 
    from  grados  
            left join grupos on grados.id_grados =grupos.grado 
            left join estudiantes on estudiantes.grupo = grupos.id_grupo 
            left join cuenta on cuenta.id_cuenta =estudiantes.id_cuenta 
            group by grados.id_grados 
            order by grados.id_grados;`);
    let name = `notasxgrados${id_cuenta}.pfd`;
    client.release();
    let diseño = `<div><h1><center>Nota promedio por grados</center></h1>
    <table style='width:100%; border: 1px solid black; border-collapse:collapse;'><tr style='border: 1px solid black; border-collapse:collapse;'>`;
    diseño += `${fields.map((value) => { return (`<th style='border: 1px solid black; border-collapse:collapse;'>${value.name}</th>`) }).join('')}</tr>`;
    diseño += rows.map((value) => { return (`<tr style='border: 1px solid black; border-collapse:collapse;'>${fields.map((fiel) => { return `<td style='border: 1px solid black; border-collapse:collapse;'>${typeof (value[fiel.name]) == 'object' ? new Date(value[fiel.name]).toLocaleDateString() : value[fiel.name]}</td>` }).join('')}</tr>`) }).join('') + '</table></div>';
    pdf.create(diseño, config).toFile(name, (err, resp) => {
      if (err) {
        console.log(err);
        res.json({ error: err })
      }
      else {
        res.download(`${__dirname}/../${name}`)
        setTimeout(() => {
          try {
            fs.unlinkSync(`./${name}`);
            console.log('se elimino el archivo');
          } catch (err) {
            console.log(err);
          }
        }, 3000);
      }
    });
  } catch (err) {
    res.json();
  }
});
router.get('/reportenotasxgrupo/:id_cuenta', async (req, res) => {
  try {
    const { id_cuenta } = req.params;
    const client = await pg.connect();
    const { rows } = await client.query(`select concat(grados.strgrado,'-',grupos.cod_grupo) as grupo , avg(estudiantes.nota_prom) as "Nota" 
  from  grados  
          left join grupos on grados.id_grados =grupos.grado 
          left join estudiantes on estudiantes.grupo = grupos.id_grupo 
          left join cuenta on cuenta.id_cuenta =estudiantes.id_cuenta 
          group by grados.id_grados , grupos.cod_grupo 
          order by grados.id_grados, grupos.cod_grupo;
  `);
    let libro = excel.utils.book_new();
    let name = `notasxgrupo${id_cuenta}.xlsx`;
    let data = excel.utils.json_to_sheet(rows);
    excel.utils.book_append_sheet(libro, data, `notas`);
    client.release();
    excel.writeFile(libro, name);
    res.download(`${__dirname}/../${name}`);
    setTimeout(() => {
      try {
        fs.unlinkSync(`./${name}`);
        console.log('se elimino el archivo');
      } catch (err) {
        console.log(err);
      }
    }, 3000);
  } catch (err) {
    res.json(err);
  }
});
router.get('/pdfreportenotasxgrupo/:id_cuenta', async (req, res) => {
  try {
    config.orientation = 'portait';
    const { id_cuenta } = req.params;
    const client = await pg.connect();
    const { rows, fields } = await client.query(`select concat(grados.strgrado,'-',grupos.cod_grupo) as grupo , avg(estudiantes.nota_prom) as "Nota" 
    from  grados  
            left join grupos on grados.id_grados =grupos.grado 
            left join estudiantes on estudiantes.grupo = grupos.id_grupo 
            left join cuenta on cuenta.id_cuenta =estudiantes.id_cuenta 
            group by grados.id_grados , grupos.cod_grupo 
            order by grados.id_grados, grupos.cod_grupo;
    `);
    let name = `notasxgrupos${id_cuenta}.pfd`;
    client.release();
    let diseño = `<div><h1><center>Nota promedio por grupo</center></h1>
    <table style='width:100%; border: 1px solid black; border-collapse:collapse;'><tr style='border: 1px solid black; border-collapse:collapse;'>`;
    diseño += `${fields.map((value) => { return (`<th style='border: 1px solid black; border-collapse:collapse;'>${value.name}</th>`) }).join('')}</tr>`;
    diseño += rows.map((value) => { return (`<tr style='border: 1px solid black; border-collapse:collapse;'>${fields.map((fiel) => { return `<td style='border: 1px solid black; border-collapse:collapse;'>${typeof (value[fiel.name]) == 'object' ? new Date(value[fiel.name]).toLocaleDateString() : value[fiel.name]}</td>` }).join('')}</tr>`) }).join('') + '</table></div>';
    pdf.create(diseño, config).toFile(name, (err, resp) => {
      if (err) {
        console.log(err);
        res.json({ error: err })
      }
      else {
        res.download(`${__dirname}/../${name}`)
        setTimeout(() => {
          try {
            fs.unlinkSync(`./${name}`);
            console.log('se elimino el archivo');
          } catch (err) {
            console.log(err);
          }
        }, 3000);
      }
    });
  } catch (err) {
    res.json();
  }
});
//materias
router.get("/adminmaterias", async (req, res) => {
  try {
    const client = await pg.connect();
    const { rows } = await client.query(`SELECT materias.id_materia,materias.codmateria,
    materias.strmateria,
    permisomateria(materias.id_materia ,1) as Primero,
    permisomateria(materias.id_materia ,2) as Segundo,
    permisomateria(materias.id_materia ,3) as Tercero,
    permisomateria(materias.id_materia ,4) as Cuarto,
    permisomateria(materias.id_materia ,5) as Quinto,
    permisomateria(materias.id_materia ,6) as Sexto,
    permisomateria(materias.id_materia ,7) as Septimo,
    permisomateria(materias.id_materia ,8) as Octavo,
    permisomateria(materias.id_materia ,9) as Noveno,
    permisomateria(materias.id_materia ,10) as Decimo,
    permisomateria(materias.id_materia ,11) as Once,
    profesores.id_profesor,
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
  const { codmateria, strmateria, id_profesor, permisos } = req.body;
  try {
    const client = await pg.connect();
    const { rows } = await client.query('INSERT INTO materias(codmateria, strmateria, id_profesor) VALUES($1,$2,$3) returning id_materia', [codmateria, strmateria, id_profesor]);

    let query = 'INSERT INTO materias_en_grado(id_materia,id_grado,permiso) VALUES ';
    for (let i = 0; permisos.length > i; i++) {
      query += '(' + rows.id_materia + ', ' + (i + 1) + ', ' + permisos[i] + ')' + (i != (permisos.length - 1) ? ',' : ';');
    }
    const rows2 = await client.query(query);
    res.json([rows, rows2]);
    client.release();
  } catch (err) {
    res.json(err);
  }
});
router.put("/adminmaterias/:id_materia", async (req, res) => {
  const { codmateria, strmateria, id_profesor, permisos } = req.body;
  const { id_materia } = req.params;
  try {
    const client = await pg.connect();
    const rows = await client.query('UPDATE materias set codmateria=$1 , strmateria=$2, id_profesor=$3 WHERE  id_materia= $4', [codmateria, strmateria, id_profesor, id_materia]);

    let query = '';
    for (let i = 0; permisos.length > i; i++) {
      query += 'UPDATE materias_en_grado set permiso = '+permisos[i] + ' WHERE id_materia=' + id_materia + ' AND id_grado =' + (i + 1) + ';';
    }
    const rows2 = await client.query(query);
    res.json([rows, rows2]);
    client.release();
  } catch (err) {
    res.json(err);
  }
});
router.delete("/adminmaterias/:id_materia", async (req, res) => {
  const { id_materia } = req.params;
  try {
    const client = await pg.connect(); 
    const rows = await client.query('DELETE FROM materias WHERE id_materia= $1', [id_materia]);
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
    const rows = await client.query(`
    UPDATE estudiantes SET nota_prom=notasegplan(id_estudiante) WHERE aprobado is NULL;
    UPDATE estudiantes SET aprobado=true WHERE aprobado is NULL AND nota_prom>3;
    UPDATE estudiantes SET aprobado=false WHERE aprobado is NULL AND nota_prom<3;
    INSERT INTO grupos (año, grado, cod_grupo, id_profesor) 
    SELECT añovar()+1, grado, cod_grupo, id_profesor FROM grupos where año=añovar();
    INSERT INTO estudiantes(nro_matricula, año, grupo, id_cuenta) 
    SELECT estudiantes.nro_matricula,añovar()+1 as año , 
grupocambio (estudiantes.aprobado, grupos.grado, grupos.cod_grupo) as grupo,estudiantes.id_cuenta 
FROM estudiantes 
join grupos on estudiantes.grupo = grupos.id_grupo 
join cuenta on estudiantes.id_cuenta = cuenta.id_cuenta 
where (estudiantes.año=añovar() 
and grupos.año=añovar()) 
AND NOT(grupos.grado=11 AND estudiantes.aprobado=true)
and cuenta.estado =true;
    UPDATE año SET año = (añovar()+1);
    ALTER SEQUENCE sq_matricula RESTART WITH 1;
    `);
    res.json(rows);
    client.release();
  } catch (err) {
    res.json(err);
  }
});

router.get("/cuentas/:id_cuenta", async (req, res) => {
  const { id_cuenta } = req.params;
  try {
    const client = await pg.connect(); 
    const rows = await client.query('SELECT * from cuenta WHERE id_cuenta= $1', [id_cuenta]);
    res.json(rows);
    client.release();
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;