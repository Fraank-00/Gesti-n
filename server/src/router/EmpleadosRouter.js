const { Router } = require('express');
const router = Router();

const {
  getEmpleados,
  Crearempleado,
  Editarempleado,
  Eliminarempleado,
} = require('../controllers/Empleados');

// Ruta para obtener todos los usuarios y crear un nuevo usuario
router.route('/')
  .get(getEmpleados)
  .post(Crearempleado);

// Ruta para editar un usuario existente y eliminar un usuario
router.route('/:id')
  .put(Editarempleado)
  .delete(Eliminarempleado);

module.exports = router;