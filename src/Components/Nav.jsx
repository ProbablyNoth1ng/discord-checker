import React from "react";
import '../styles/Nav.scss'
export let discordIcon = <svg xmlns="http://www.w3.org/2000/svg" style={{fill:"#5865f2",height:"55px", width: "55px"}} viewBox="0 0 147.14 116.36"><defs></defs><g id="图层_2" data-name="图层 2"><g id="Discord_Logos" data-name="Discord Logos"><g id="Discord_Logo_-_Large_-_White" data-name="Discord Logo - Large - White"><path className="cls-1" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/></g></g></g></svg>


let  userPfp = "src/assets/ava.jpg" 

export default function Nav(props){

    

    return (
        
        <nav className="nav">
            <div className="nav__wrapper container">
                <a href="#" className="link">
                    <div className="logo__side">
                        {discordIcon} 
                        <div className="logo__side_text">
                        Checker <span className="beta">Beta</span>

                        </div>
                    </div> 
                </a>
                <div className="profile__side">
                    {props.loggedIn ? 
                        <>
                            <div className="profile">
                                <img src={`https://cdn.discordapp.com/avatars/${props.id}/${props.pfp}.jpg`} alt="User avatar"   className="profile__pfp"/>
                                <p className="profile__username">{props.name}</p>
                            </div>
                            <button className="logout_Button" onClick={props.logOut} style={{backgroundColor:"transparent",border:"none"}}>
                                <div className="logout">
                                    <i style={{color:"cyan"}}  className="fa-solid fa-arrow-right-from-bracket"></i> 
                                </div>
                            </button>
                        </>
                        :
                        <>
                            <div className="login" >
                                <a id="login" href="https://discord.com/api/oauth2/authorize?client_id=1136385289653329921&redirect_uri=https%3A%2F%2Fdiscord-checker.vercel.app%2F&response_type=code&scope=identify%20guilds%20connections%20guilds.members.read" class="link login_link">
                                    <i class="fa-brands fa-discord text-2xl"></i>
                                    <span>Login with Discord</span>
                                </a>
                            </div>
                        </>
                    }   
                </div>
            </div>

        </nav>
    )
}