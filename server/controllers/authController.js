import axios from 'axios'; 

module.exports = {
    handleCallback: (req, res) => {
        // Create a payload to send to Auth0. Include the "auth code" we received (req.query.code).
        const payload = {
             client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
             client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
             code: req.query.code,
             grant_type: 'authorization_code',
             redirect_uri: `http://${req.headers.host}/auth/callback`
        }
        // Trade above payload for an access token (i.e. get token)
        function tradeCodeForAccessToken() {
            return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload).catch(error => {
                console.log('--- error getting access token ---', error); 
            })
        }
        // Use access token we just got to get user info
        function tradeAccessTokenForUserInfo(accessTokenResponse) {
            const accessToken = accessTokenResponse.data.access_token;
            return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo/?access_token=${accessToken}`);
        }
        // User info >>> session and database.
        function storeUserInfoInDatabse(userInfo) {
            const userData = userInfo.data;
            return req.app.get('db').find_user_by_auth0_id(userData.sub).then(users => {
                if (users.length) { // Users exist
                    const user = users[0]; 
                    req.session.user = user;
                    req.redirect('/'); // Take them to home page
                } else {
                    const newUserData = [userData.sub, userData.email, userData.name, userData.picture];
                    return req.app.get('db').create_user(newUserData).then(newUsers => {
                        const newUser = newUsers[0]; 
                        req.session.user = newUser; 
                        res.redirect('/'); 
                    })
                }
            })
        }

        tradeCodeForAccessToken()
        .then(accessToken => tradeAccessTokenForUserInfo(accessToken))
        .then(userInfo => storeUserInfoInDatabse(userInfo))
        .catch(error => {
            console.log('Server error: ' + error); 
            res.status(500).send('A server-side error occured'); 
        })
    }, 
    getProfile: (req, res) => {
        res.json({ user: req.session.user });
    }, 
    logout: (req, res) => {
        req.session.destroy();
        res.send();
    }, 
    //Update auth0_id and profile_name? 
    getSecureData: (req, res) => {
        res.json({ someSecureData: req.session.user.auth0_id + ' unique id for ' + req.session.user.profile_name});
    }
}