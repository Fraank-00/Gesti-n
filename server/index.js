const express = require('express');
const cors = require('cors');
const { sequelize } = require('./DB');
const Empleados = require('./src/model/EmpleadosModel')
const empleadosRoutes = require('./src/router/EmpleadosRouter');


const app = express();

// Middleware para manejar JSON
app.use(express.json());
app.use(cors()); 
// Ruta de ejemplo
app.get('/', (req, res) => {
    res.send("Tareas"); //
});

// Usar las rutas de empleados
app.use('/empleados', empleadosRoutes);

// Sincronización de modelos y inicio del servidor
sequelize.sync({ force: false }) // Sincroniza los modelos de Sequelize con la base de datos.
  .then(() => {
    console.log('Tablas sincronizadas');
    app.listen(3000, () => {
      console.log('El servidor está corriendo en el puerto 3000'); 
    });
  })
  .catch(err => console.error('Error al sincronizar modelos:', err)); 

