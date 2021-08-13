import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Global from '../../Global';

import './Style.css';

const MySwal = withReactContent(Swal)
const url = Global.url;

class CRUD extends React.Component {

    state = {
        items: [],
        status: null,
        name: null,
        email: null,
        phone: null,
        location: null
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

            const { value: formValues } = await MySwal.fire({
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

        MySwal.fire({
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

    ButtonUpdateLoad = (idUpdate) => { //METODO FINALIZADO CHECK
        axios.get(url + 'get-one/' + idUpdate)
            .then(res => {
                this.setState({
                    name: res.data.item.name,
                    email: res.data.item.email,
                    phone: res.data.item.number,
                    location: res.data.item.location
                })
            })
    }

    ButtonUpdateShow = (idUpdate) => { //METODO FINALIZADO CHECK

        (async () => {
            const { value: formUpdate } = await MySwal.fire({
                title: 'Actualizar',
                html: `
                        <input id="name-update" class="swal2-input" placeholder="Nombre" value='${this.state.name}'/>
                        <input id="email-update" class="swal2-input" placeholder="Email" value='${this.state.email}'/>
                        <input id="number-update" class="swal2-input" placeholder="Phone" value='${this.state.phone}'/>
                        <input id="location-update" class="swal2-input" placeholder="Location" value='${this.state.location}'/>          
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

                this.setState({
                    name: formUpdate[0],
                    email: formUpdate[1],
                    number: formUpdate[2],
                    location: formUpdate[3]
                })

                axios.post(url + 'update/' + idUpdate, {
                    name: this.state.name,
                    email: this.state.email,
                    number: this.state.phone,
                    location: this.state.location
                })
                document.location.reload();
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
                                        </button>
                                    </td>
                                    <td>
                                        <button id="updateButton" className="buttons" onMouseOver={() => this.ButtonUpdateLoad(i._id)} onClick={() => this.ButtonUpdateShow(i._id)}>
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