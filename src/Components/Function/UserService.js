import React, { createContext, useEffect, useState } from 'react';
import Global from '../Global';
import axios from 'axios';

const url = Global.url;
export const DataContext = createContext();

export const UserService = ({ children }) => {

    const [items, setData] = useState([]);

    useEffect(() => {
        getAll()
        console.log(getAll())
    }, [])

    function getAll(){
        axios.get(url + 'get-data')
            .then(res => setData(res.data.succes));
        return(items)
    }

    var itemsClone = items.map(i => {
        return (
            <div>
                <span>{i.name}</span>
                <span>{i.email}</span>
            </div>
        );
    })

    return (
        <DataContext.Provider value={itemsClone}>
            {children}
        </DataContext.Provider>
    );
}

export default UserService;