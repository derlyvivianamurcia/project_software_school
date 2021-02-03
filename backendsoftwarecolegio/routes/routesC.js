const express = require('express');
const router = express.Router();
const {cnn_mysql}=require('../db/db.js');

// Objeto de Guia
router.get("/",(req,res)=>{
  res.json([]);
});



router.get("/materias", async(req,res) =>{
  const [rows]=await cnn_mysql.execute(`SELECT * FROM materias`); 
  if(rows[0]){res.json(rows);
  }
  else{
    res.json({});
  }  
});


module.exports= router;