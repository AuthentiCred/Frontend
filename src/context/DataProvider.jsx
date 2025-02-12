import { number } from "prop-types";
import React, { createContext, useState } from "react";
export const DataContext = createContext();

const DataProvider = ({ children }) => {

    const [account, setAccount] = useState({
        id : '',
        name : '',
        email : '',
    });
    return (
        <DataContext.Provider value={{
            account,
            setAccount,
        }}>
            {children}
        </DataContext.Provider>
    )

}

export default DataProvider;