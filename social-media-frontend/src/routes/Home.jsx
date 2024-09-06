import React from "react";

import Header from '../header/header'
import SideMenu from '../sideMenu/sideMenu'
import MainSection from '../main/mainSection'


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