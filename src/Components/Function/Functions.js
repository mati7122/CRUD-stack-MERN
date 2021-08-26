// import { fetcher } from './CRUD';
import { mutate } from 'swr';
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Global from "../../Global";

const uri = Global.url;

const MySwal = withReactContent(Swal);

async function Add() { //Add user data to CRUD
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

export {
    Add
}