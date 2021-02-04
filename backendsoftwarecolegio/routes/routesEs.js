const { Router } = require('express');
const router = Router();

const studentsController = require('../controller/controllerStudents');

router.get('/estudiantes', studentsController.listStudents);
router.get('/estudiantes/:id', studentsController.getStudent);
router.post('/estudiantes', studentsController.addStudent);
router.put('/estudiantes/:id', studentsController.updateStudent);
router.delete('/estudiantes/:id', studentsController.deleteStudent);

module.exports = router;