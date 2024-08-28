import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const CrearEmpleado = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    pais: '',
    cargo: '',
    años: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/empleados', formData);

      Swal.fire({
        title: 'Empleado Creado',
        text: 'El empleado ha sido creado exitosamente.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/lista');
      });
    } catch (error) {
      console.error('Error al crear el empleado:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al crear el empleado.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="text-center my-4">Crear Nuevo Empleado</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombre" className="form-group">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="edad" className="form-group mt-3">
              <Form.Label>Edad:</Form.Label>
              <Form.Control
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="pais" className="form-group mt-3">
              <Form.Label>País:</Form.Label>
              <Form.Control
                type="text"
                name="pais"
                value={formData.pais}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="cargo" className="form-group mt-3">
              <Form.Label>Cargo:</Form.Label>
              <Form.Control
                type="text"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="años" className="form-group mt-3">
              <Form.Label>Años:</Form.Label>
              <Form.Control
                type="number"
                name="años"
                value={formData.años}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 btn-block">
              Crear Empleado
            </Button>

          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CrearEmpleado;

