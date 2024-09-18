import React, {useRef} from "react";

import SideMenu from '../../components/sideMenu/sideMenu'
import MainSection from '../../components/main/mainSection'
import Header from "../../components/header/header";

export default function Home(){
    if(!document.cookie.split("authToken=")[1]){
        window.location.href = "/";
    }
    const mainRef = useRef(null);
    return (
        <div className="home view">
            <Header/>
            <div id="main" ref={mainRef}>
                <SideMenu/>
                <MainSection mainRef={mainRef}/>
            </div>
        </div>
    )
}