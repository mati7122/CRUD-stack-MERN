
import React, { useState, useContext } from 'react';
import { DataContext } from '../UserService';

function Data() {

    const { itemsClone } = useContext(DataContext);

    return (
        <div>
            {itemsClone}
        </div>
    )
}

export default Data;