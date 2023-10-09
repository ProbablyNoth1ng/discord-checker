import { useState,useEffect } from "react";
import React from "react";
import "../styles/Main.scss"

export default function Main(props) {
    let arr = []    
    const [reversed, setReversed] = useState(false);
    const [servers, setServers] = useState(props.servers ? props.servers : null);
    const [sortedGuilds, setSortedGuilds] = useState([]);

    let log = props.loggedIn ? true : false;
    
   

    if(!log || !props.servers) { 
        for(let i = 0; i < 13; i++){
            arr.push( <div className="community_card">
            <div src="#" alt="" className="community_pfp" />
            <h3 className="community_name">Name of community</h3>
        </div>) 
        
        }} 
    useEffect(() => {
        if (props.servers) {
            const sorted = [...props.servers].sort((a, b) => {
                if (reversed) {
                    return b.name.localeCompare(a.name);
                } else {
                    return a.name.localeCompare(b.name);
                }
            });
            setSortedGuilds(sorted);
        }
    }, [reversed, props.servers]);

    return (
        <main className="main">
            <h2 className="main__greeting inter"><span style={{color:'purple',paddingLeft:'10px'}}>{log ?  ( ` Welcome Back! ${props.name}`)  : 'Login to observe your communities'}</span> </h2>
            <div className="main__community">
                <div className="sort container">
                    <p className="inter " style={{fontSize:'25px'}}>Your communities</p>
                  
                    <div className="sort__right_side">
                        <p className="inter amount_projects_available" style={{fontSize:'20px'}}>{log ? props.servers.length : ''} Projects available </p>
                        <button className="sort__pop_up" onClick={() => setReversed(!reversed)}> {reversed ? <i className="fa-solid fa-arrow-down-z-a"></i> : <i className="fa-solid fa-arrow-down-a-z"></i>} </button>
                        
                    </div>
                </div>
               <div className="main__community_cards container ">
               {log && props.servers.length == 0 ? <h1 className="inter without_guilds">You don't have any servers(:</h1> : ''} 
        {Array.isArray(sortedGuilds) && sortedGuilds.map(guild => (
            <div key={guild.id} className="community_card">
                {guild.icon && 
                    <img 
                        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} 
                        alt={`${guild.name} Icon`} 
                        className="community_pfp"
                    />
                }
                <h3 className="community_name">{guild.name}</h3>
            </div> 
                            ))} 
                        {arr}
                </div>
            </div>
        </main>
    )
}




