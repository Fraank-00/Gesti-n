import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

import CrearEmpleado from './components/Empleados';
import ListaEmpleados from './components/LIsta'
import Header from './components/Header';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/empleado" element={<CrearEmpleado />} />
        <Route path="/lista" element={<ListaEmpleados />} />
      </Routes>
    </Router>
  );
}

export default App;
