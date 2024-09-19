import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const DarkMode = createContext();

export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') == 'true'? true : false;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', `${darkMode}`);
    }, [darkMode]);
    return (
    <DarkMode.Provider value={{darkMode, setDarkMode}}>
        {children}
    </DarkMode.Provider>
)};