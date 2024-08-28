import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import axios from 'axios';

function ListaEmpleados() {
    const [empleados, setEmpleados] = useState([]);
    const [editableEmpleado, setEditableEmpleado] = useState(null);
    const [editFormData, setEditFormData] = useState({
        nombre: '',
        edad: '',
        pais: '',
        cargo: '',
        años: ''
    });

    useEffect(() => {
        axios.get('http://localhost:3000/empleados')
            .then(response => setEmpleados(response.data))
            .catch(error => console.error('Error al obtener los empleados:', error));
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/empleados/${id}`)
                    .then(() => {
                        setEmpleados(empleados.filter(emp => emp.id !== id));
                        Swal.fire('Eliminado!', 'El empleado ha sido eliminado.', 'success');
                    })
                    .catch(error => console.error('Error al eliminar el empleado:', error));
            }
        });
    };

    const handleEditClick = (empleado) => {
        setEditableEmpleado(empleado.id);
        setEditFormData({
            nombre: empleado.nombre,
            edad: empleado.edad,
            pais: empleado.pais,
            cargo: empleado.cargo,
            años: empleado.años
        });
    };

    const handleSaveClick = (id) => {
        axios.put(`http://localhost:3000/empleados/${id}`, editFormData)
            .then(() => {
                setEmpleados(empleados.map(emp => (emp.id === id ? { id, ...editFormData } : emp)));
                setEditableEmpleado(null);
                Swal.fire('Empleado actualizado!', '', 'success');
            })
            .catch(error => console.error('Error al actualizar el empleado:', error));
    };

    const handleCancelClick = () => {
        setEditableEmpleado(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    return (
        <div className="container">
            <h1 className="my-4">Lista de Empleados</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>País</th>
                        <th>Cargo</th>
                        <th>Años</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.map((empleado, index) => (
                        <tr key={empleado.id}>
                            <td>{index + 1}</td>
                            <td>
                                {editableEmpleado === empleado.id ? (
                                    <Form.Control 
                                        type="text"
                                        name="nombre"
                                        value={editFormData.nombre}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    empleado.nombre
                                )}
                            </td>
                            <td>
                                {editableEmpleado === empleado.id ? (
                                    <Form.Control 
                                        type="text"
                                        name="edad"
                                        value={editFormData.edad}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    empleado.edad
                                )}
                            </td>
                            <td>
                                {editableEmpleado === empleado.id ? (
                                    <Form.Control 
                                        type="text"
                                        name="pais"
                                        value={editFormData.pais}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    empleado.pais
                                )}
                            </td>
                            <td>
                                {editableEmpleado === empleado.id ? (
                                    <Form.Control 
                                        type="text"
                                        name="cargo"
                                        value={editFormData.cargo}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    empleado.cargo
                                )}
                            </td>
                            <td>
                                {editableEmpleado === empleado.id ? (
                                    <Form.Control 
                                        type="text"
                                        name="años"
                                        value={editFormData.años}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    empleado.años
                                )}
                            </td>
                            <td>
                                {editableEmpleado === empleado.id ? (
                                    <>
                                        <Button variant="success" onClick={() => handleSaveClick(empleado.id)}>Guardar</Button>{' '}
                                        <Button variant="secondary" onClick={handleCancelClick}>Cancelar</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button variant="warning" onClick={() => handleEditClick(empleado)}>Editar</Button>{' '}
                                        <Button variant="danger" onClick={() => handleDelete(empleado.id)}>Eliminar</Button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ListaEmpleados;
