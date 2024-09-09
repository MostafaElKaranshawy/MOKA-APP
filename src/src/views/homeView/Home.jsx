import React from "react";

import SideMenu from '../../components/sideMenu/sideMenu'
import MainSection from '../../components/main/mainSection'


export default function Home(){
    if(!document.cookie.split("authToken=")[1]){
        window.location.href = "/";
    }
    return (
        <div className="home view">
            {/* <Header/> */}
            <div id="main">
                <SideMenu/>
                <MainSection/>
            </div>
        </div>
    )
}