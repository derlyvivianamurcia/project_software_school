const { Router } = require('express');
const router = Router();
const pg = require('./../db/db').pool;

const groupsController = require('../controller/controllerGroup');

//router.get('/grupos', groupsController.listGrupos);
//router.get('/grupos/:id', groupsController.getGrupo);
router.post('/grupos', groupsController.addGrupo);
//router.put('/grupos/:id', groupsController.updateGrupo);
//router.delete('/grupos/:id', groupsController.deleteGrupo);

module.exports = router;