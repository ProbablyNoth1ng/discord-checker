const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = 5000;

const CLIENT_ID = process.env.Client_Id;
const CLIENT_SECRET = process.env.Client_Secret;
const REDIRECT_URI = process.env.Redirect_URI;

console.log(REDIRECT_URI)
app.use(cors());

app.get('/auth/login', (req, res) => {
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify`;
    res.redirect(discordAuthUrl);
});

app.get('/auth/callback', async (req, res) => {
    const code = req.query.code;
    try {    
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
        }))
        
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/x-www-form-urlencoded'
          };

     
        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                authorization: `Bearer ${tokenResponse.data.access_token}`,
                ...headers
            },
        });
        console.log('token -- ->' + tokenResponse.data.access_token)
            
        const access_token = tokenResponse.data.access_token;
            const guildsResponse = await axios.get('https://discord.com/api/users/@me/guilds', {
                headers: {
                    authorization: `Bearer ${access_token}`,
                },
            });

            console.log(guildsResponse)
            // console.log(`--x`+[userResponse.data,guildsResponse.data])
            res.json( [userResponse.data,guildsResponse.data]);

    } catch (error) {
        console.error("Error in /auth/callback:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Authentication failed', details: error.response ? error.response.data : null });
    }
    // console.log("Code:", code);
    // console.log("Redirect URI:", REDIRECT_URI);
    // console.log("Client ID:", CLIENT_ID);
    // console.log("Client Secret:", CLIENT_SECRET);

    // function hasPermission(userPermissions, permissionFlag) {
    //     return (userPermissions & permissionFlag) === permissionFlag;
    //   }
      
    // const userPermissions = 104156737
        
    //     if (hasPermission(userPermissions, permissions.CREATE_INSTANT_INVITE)) {
    //     // Create an invite
    //     axios.post('YOUR_DISCORD_ENDPOINT_TO_CREATE_INVITE', {
    //         /* your parameters here */
    //     })
    //     .then(response => {
    //         const inviteLink = response.data.invite;
    //         console.log(`Invite link: ${inviteLink}`);
    //     })
    //     .catch(error => {
    //         console.error('Error creating invite:', error);
    //     });
    //     }
        


}); 

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});