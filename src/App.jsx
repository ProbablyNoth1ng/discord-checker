import React, {useState, useEffect } from 'react'


import axios from 'axios'
import './styles/App.scss'



import Nav from './Components/Nav'
import Main from './Components/Main'
import Footer from './Components/Footer'



export default function App() {
  
  const [user, setUser] = useState(null);
  const [guilds, setGuilds] = useState(null);
  
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const [log,isLog] = useState(false)
 

  useEffect(() => {
    async function fetchGuilds() {
        if (code) {
            const response = await axios.get('https://server-for-discord-checker.vercel.app/auth/callback', {
                params: { code: code }
            });
            setUser(response.data[0]);
            setGuilds(response.data[1]);
            isLog(true)
            console.log(response.data[1])
                
   
        }
        // const requestTest =  axios.get('https://server-for-discord-checker.vercel.app/');
        // console.log(requestTest)
    }

    fetchGuilds();
}, [code]);


  
  function logOut(){
    isLog(false)
  }

  user ? window.history.replaceState(null, null, '/')  : '';


  
  user ? console.log(guilds[0].name) : ''
  // user ? console.log(guilds.sort()) : '';
  return (
    <div className="App">
    {log  ?    <> 
                <Nav loggedIn={log} name={user.username ? user.username : user.global_name  } pfp={user.avatar} id={user.id} logOut={logOut}/>
                <Main loggedIn={log} name={user.username ? user.username : user.global_name } servers={guilds} />
                <Footer /> 
               </>
        :  
             <>  
                <Nav loggedIn={log} />
                 <Main loggedIn={log}/> 
                 <Footer /> 
            </>
    }
    </div>    
  )
}




  