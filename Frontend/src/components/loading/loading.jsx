import React, {useContext} from "react";
import "./loading.css";
import { DarkMode } from "../../darkModeContext";
export default function Loading(){
    const {darkMode} = useContext(DarkMode);
    return (
        <div className={`loading-component ${darkMode && 'dark-mode'}`}>
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
        </div>
    )
}