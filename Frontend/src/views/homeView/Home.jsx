import React, {useContext, useRef} from "react";

import SideMenu from '../../components/sideMenu/sideMenu'
import MainSection from '../../components/main/mainSection'
import Header from "../../components/header/header";
import { DarkMode } from "../../darkModeContext";

export default function Home(){
    if(!document.cookie.split("authToken=")[1]){
        window.location.href = "/";
    }
    const {darkMode} = useContext(DarkMode);
    const mainRef = useRef(null);
    return (
        <div className="home view">
            <Header/>
            <div id="main" className={`${darkMode && "dark-mode"}`} ref={mainRef}>
                <SideMenu/>
                <MainSection mainRef={mainRef}/>
            </div>
        </div>
    )
}