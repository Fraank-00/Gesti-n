const Empleados = require('../model/EmpleadosModel'); // Asegúrate de que la ruta es correcta

const empleadosControllers = {};

// Obtener todos los empleados
empleadosControllers.getEmpleados = async (req, res) => {
    try {
        const empleados = await Empleados.findAll(); // Sequelize usa findAll() para obtener todos los registros
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo empleado
empleadosControllers.Crearempleado = async (req, res) => {
    const { nombre, edad, pais, cargo, años } = req.body;
  
    try {
        const nuevoEmpleado = await Empleados.create({ nombre, edad, pais, cargo, años });
        res.json({ mensaje: 'Empleado creado', empleado: nuevoEmpleado });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Editar un empleado existente
empleadosControllers.Editarempleado = async (req, res) => {
    const { id } = req.params;
    const { nombre, edad, pais, cargo, años } = req.body;

    try {
        const empleadoActualizado = await Empleados.update(
            { nombre, edad, pais, cargo, años },
            { where: { id } }
        );

        if (!empleadoActualizado[0]) { // Sequelize devuelve un array donde el primer elemento es el número de filas afectadas
            return res.status(404).json({ mensaje: 'El empleado no se pudo actualizar' });
        }

        res.json({ mensaje: 'Empleado actualizado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un empleado existente
empleadosControllers.Eliminarempleado = async (req, res) => {
    const { id } = req.params;

    try {
        const empleadoEliminado = await Empleados.destroy({ where: { id } });

        if (!empleadoEliminado) { // Si no se eliminó ninguna fila
            return res.status(404).json({ mensaje: 'El empleado no se pudo encontrar o eliminar' });
        }

        res.json({ mensaje: 'Empleado eliminado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = empleadosControllers;
