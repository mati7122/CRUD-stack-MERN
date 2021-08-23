
import useSWR, { mutate } from 'swr';
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import User from "./User";
import Fields from "./Fields";
import AddButton from './AddButton';

//Estilos
import './Style.css';

import Global from "../../Global";

const MySwal = withReactContent(Swal);

const uri = Global.url;

const fetcher = url => axios.get(uri + 'get-data').then(res => res.data.succes)

async function ButtonAdd() {
    const { value: formValues } = await MySwal.fire({
        title: 'Add user',
        confirmButtonText: 'Accept',
        confirmButtonColor: 'green',
        html:
            `
                <input id="swal-input1" class="swal2-input" placeholder="Name"/>
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
        axios.post(uri + 'save', {
            name: formValues[0],
            email: formValues[1],
            number: formValues[2],
            location: formValues[3]
        })
            .then(() => {
                setTimeout(() => { mutate('get-data') }, 500)
                MySwal.fire({
                    toast: true,
                    title: 'SAVED',
                    text: 'Data added successfully',
                    position: 'bottom-end',
                    timer: 2000,
                    timerProgressBar: true,
                    confirmButtonColor: 'green'
                })
            })
            .catch(() => {
                MySwal.fire({
                    toast: true,
                    icon: 'error',
                    title: 'ERROR',
                    text: 'Provide valid data',
                    position: 'bottom-end',
                    timer: 2000,
                    timerProgressBar: true,
                    confirmButtonColor: 'green'
                })
            })
    }

}

function ButtonDelete(id) {
    MySwal.fire({
        title: 'Warning',
        icon: 'info',
        text: 'Are you sure to want to delete this user?',
        showDenyButton: true,
        confirmButtonText: 'Accept', confirmButtonColor: 'green',
        denyButtonText: 'Deny', denyButtonColor: 'red'
    })
        .then(result => {
            if (result.isConfirmed) {
                axios.delete(uri + 'delete/' + id)
                    .then(
                        () => {
                            setTimeout(function () { mutate('get-data') }, 500)
                            MySwal.fire({
                                toast: true,
                                title: 'SUCCESS',
                                text: 'Data deleted successfully',
                                position: 'bottom-end',
                                confirmButtonColor: 'green',
                                timer: 2000
                            })
                        }
                    )
            }
        })
}

const CRUDfunction = () => {
    const { data, error } = useSWR('get-data', fetcher)

    function ButtonUpdateShow(idUpdate, name, email, phone, location) {

        (async () => {

            const { value: formUpdate } = await MySwal.fire({
                title: 'Update',
                html: `
                        <input id="name-update" class="swal2-input" placeholder="Name" value='${name}'/>
                        <input id="email-update" class="swal2-input" placeholder="Email" value='${email}'/>
                        <input id="number-update" class="swal2-input" placeholder="Phone" value='${phone}'/>
                        <input id="location-update" class="swal2-input" placeholder="Location" value='${location}'/>          
                    `,
                confirmButtonText: 'Accept', confirmButtonColor: 'blue',
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

                axios.post(uri + 'update/' + idUpdate, {
                    name: formUpdate[0],
                    email: formUpdate[1],
                    phone: formUpdate[2],
                    location: formUpdate[3]
                })
                    .then(
                        () => {
                            setTimeout(function () { mutate('get-data') }, 500)
                            MySwal.fire({
                                toast: true,
                                title: 'Success',
                                text: 'Data updated',
                                position: 'bottom-end',
                                confirmButtonColor: 'green',
                                timer: 2000,
                                timerProgressBar: true
                            })
                        }

                    )
            }

        })()

    }

    return (
        <div>
            <div className="container">
                <AddButton Button={() => ButtonAdd()}/>
                <div className="containerTable">
                    <Fields/>
                    {error &&
                        <div className="center">
                            <h2>An error has ocurred, try later</h2>
                        </div>
                    }
                    {!data &&
                        <div className="center">
                            <h2>Loading...</h2>
                        </div>
                    }
                    {data && data.length === 0 &&
                        <div className="center">
                            <div>
                                <h2>No data to display :(</h2>
                                <h2>Try add a user</h2>
                            </div>
                        </div>
                    }
                    {data && data.length >= 1 &&
                        <div className="test">
                            {
                                data.map(i => {
                                    return <User _id={i._id} name={i.name} location={i.location} email={i.email} number={i.number} buttonDelete={() => ButtonDelete(i._id)} buttonUpdateShow={() => ButtonUpdateShow(i._id, i.name, i.email, i.number, i.location)} />
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default CRUDfunction;