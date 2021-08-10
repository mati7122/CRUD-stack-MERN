import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import Global from '../../Global';

import './Style.css';

const url = Global.url;

class CRUD extends React.Component {

    state = {
        items: [],
        status: null
    }

    componentWillMount() {
        document.title = 'CRUD MERN';
        this.getAll();
    }

    getAll() {
        axios.get(url + 'get-data')
            .then(res => {
                this.setState({
                    items: res.data.succes
                });
            })
    }

    ButtonAdd() { //METODO FINALIZADO CHECK

        (async () => {

            const { value: formValues } = await Swal.fire({
                title: 'Agregar usuario',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: 'green',
                html:
                    `
                    <input id="swal-input1" class="swal2-input" placeholder="Nombre"/>
                    <input id="swal-input2" class="swal2-input" placeholder="Email"/>
                    <input id="swal-input3" class="swal2-input" placeholder="Phone"/>
                    <input id="swal-input4" class="swal2-input" placeholder="Location"/>
                    `,
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('swal-input1').value,
                        document.getElementById('swal-input2').value,
                        document.getElementById('swal-input3').value,
                        document.getElementById('swal-input4').value
                    ]
                }
            })

            if (formValues) {
                axios.post(url + 'save',
                    {
                        name: formValues[0],
                        email: formValues[1],
                        number: formValues[2],
                        location: formValues[3]
                    }
                )
                document.location.reload()
            }

        })()
    }

    ButtonDelete = (id) => { //METODO FINALIZADO CHECK
        Swal.fire({
            title: 'Advertencia',
            icon: 'info',
            text: 'Estás seguro que deseas borrar a este usuario?',
            showDenyButton: true,
            confirmButtonText: 'Confirmar', confirmButtonColor: 'green',
            denyButtonText: 'Denegar', denyButtonColor: 'red'
        })
            .then(result => {
                if (result.isConfirmed) {
                    axios.delete(url + 'delete/' + id)
                    document.location.reload()
                }
            })
    }

    ButtonUpdate = (idUpdate) => {
        (async () => {
            const { value: formUpdate } = await Swal.fire({
                title: 'Actualizar',
                html: `
                    <input id="name-update" class="swal2-input" placeholder="Nombre"/>
                    <input id="email-update" class="swal2-input" placeholder="Email"/>
                    <input id="number-update" class="swal2-input" placeholder="Phone"/>
                    <input id="location-update" class="swal2-input" placeholder="Location"/>          
                `,
                confirmButtonText: 'aceptar', confirmButtonColor: 'blue',
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('name-update').value,
                        document.getElementById('email-update').value,
                        document.getElementById('number-update').value,
                        document.getElementById('location-update').value
                    ]
                }
            })

            if (formUpdate) {
                axios.post(url + 'update/' + idUpdate, {
                    name: formUpdate[0],
                    email: formUpdate[1],
                    number: formUpdate[2],
                    location: formUpdate[3]
                })
                document.location.reload()
            }
        })()
    }

    render() {

        return (
            <div className="containerALL">
                <div className="containerCRUD">
                    <div className="containerAddButton">
                        <input id='addButton' type="button" value="Añadir usuario" onClick={() => this.ButtonAdd()} />
                    </div>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Ubicación</th>
                            <th>Email</th>
                            <th>Télefono</th>
                        </tr>
                        {this.state.items.map(i => {
                            return (
                                <tr className="containerCRUD__data">
                                    <td>{i._id}</td>
                                    <td>{i.name}</td>
                                    <td>{i.location}</td>
                                    <td>{i.email}</td>
                                    <td>{i.number}</td >
                                    <td>
                                        <button id="deleteButton" className="buttons" onClick={() => this.ButtonDelete(i._id)}>
                                            {/* <img src={Trash} style={{ width: '20px', padding: '0' }} /> */}
                                        </button>
                                    </td>
                                    <td>
                                        <button id="updateButton" className="buttons" onClick={() => this.ButtonUpdate(i._id)}>
                                            {/* <img src={Update} style={{ width: '20px', padding: '0' }}/> */}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                    </table>
                </div>
            </div>

        );
    }
}

export default CRUD;