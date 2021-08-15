import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import Global from '../../Global';

const url = Global.url;

const MySwal = withReactContent(Swal);

export function ButtonAdd() {
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
        }
    })()
}

export function ButtonDelete(id) {
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
            }
        })
}

export function ButtonUpdateShow(idUpdate, name, email, phone, location) {

    (async () => {
        const { value: formUpdate } = await MySwal.fire({
            title: 'Actualizar',
            html: `
                    <input id="name-update" class="swal2-input" placeholder="Nombre" value='${name}'/>
                    <input id="email-update" class="swal2-input" placeholder="Email" value='${email}'/>
                    <input id="number-update" class="swal2-input" placeholder="Phone" value='${phone}'/>
                    <input id="location-update" class="swal2-input" placeholder="Location" value='${location}'/>          
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
                phone: formUpdate[2],
                location: formUpdate[3]
            })

            axios.post(url + 'update/' + idUpdate, {
                name: name,
                email: email,
                number: phone,
                location: location
            })
        }

    })()

}