import React, { useEffect, useState } from "react";
import useSWR from 'swr';
import axios from "axios";

//buttons functions
import { ButtonAdd, ButtonDelete, ButtonUpdateShow } from "./functionsCRUD";

import '../Class/Style.css';

import Global from "../../Global";

const uri = Global.url;

const fetcher = url => axios.get(uri + 'get-data').then(res => res.data.succes)

const CRUDfunction = () => {

    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)
    const [location, setLocation] = useState(null)

    function ButtonUpdateLoad(idUpdate) {
        axios.get(uri + 'get-one/' + idUpdate)
            .then(res => {
                setName(res.data.item.name)
                setEmail(res.data.item.email)
                setPhone(res.data.item.number)
                setLocation(res.data.item.location)
            })
    }

    const { data, error } = useSWR('get-data', fetcher, { refreshInterval: 1000 })

    useEffect(() => {
        console.log('Hola desde effect');
    }, [])

    return (
        <div className="containerALL">
            <div className="containerCRUD">
                <div className="containerAddButton">
                    <input id='addButton' type="button" value="Añadir usuario" onClick={() => ButtonAdd()} />
                </div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Ubicación</th>
                        <th>Email</th>
                        <th>Télefono</th>
                    </tr>
                    {error &&
                        <h1>Error</h1>}
                    {!data &&
                        <h1>Cargando...</h1>
                    }
                    {data &&

                        data.map(i => {
                            return (
                                <tr className="containerCRUD__data" onMouseOver={() => ButtonUpdateLoad(i._id)}>
                                    <td>{i._id}</td>
                                    <td>{i.name}</td>
                                    <td>{i.location}</td>
                                    <td>{i.email}</td>
                                    <td>{i.number}</td>
                                    <td>
                                        <button id="deleteButton" className="buttons" onClick={() => ButtonDelete(i._id)} />
                                    </td>
                                    <td>
                                        <button id="updateButton" className="buttons"  onClick={() => ButtonUpdateShow(i._id, name, email, phone, location)} />
                                    </td>                     
                                </tr>
                            );
                        })
                    }
                    {/* {items.length >= 1 &&
                        items.map(i => {
                            return (
                                <tr className="containerCRUD__data">
                                    <td>{i._id}</td>
                                    <td>{i.name}</td>
                                    <td>{i.location}</td>
                                    <td>{i.email}</td>
                                    <td>{i.number}</td>
                                    <td>
                                        <button id="deleteButton" className="buttons" />
                                    </td>
                                    <td>
                                        <button id="updateButton" className="buttons" />
                                    </td>
                                </tr>

                            );
                        })
                    } */}
                </table>
            </div>
        </div>
    );
}

export default CRUDfunction;