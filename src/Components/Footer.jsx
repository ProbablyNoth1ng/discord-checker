import React from "react";
import '../styles/Footer.scss'

import {discordIcon} from './Nav'



export default function Footer(){
    return (
        <footer className="footer">
            <div className="footer__wrapper container">
                <div className="logo__side">
                    {discordIcon} 
                    <div className="logo__side_text">
                    Checker <span className="beta">Beta</span>

                    </div>
                </div> 
                <p className="footer__rights inter ">© 2023. All rights reserved.</p>
                <p className="footer__powered inter">Powered by Coddie2d</p>
            </div>
        </footer>
    )
}