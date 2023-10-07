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
            const response = await axios.get('http://localhost:5000/auth/callback', {
                params: { code: code }
            });
            setUser(response.data[0]);
            setGuilds(response.data[1]);
            isLog(true)
            console.log(response.data[1])
        }
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
    {log && guilds ?    <> 
                <Nav loggedIn={log} name={user.username} pfp={user.avatar} id={user.id} logOut={logOut}/>
                <Main loggedIn={log} name={user.username} servers={guilds} />
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




  