const axios = require('axios');
const instance = axios.create({
  // baseURL: 'https://api.crabrr.com',
  baseURL: 'http://localhost:3030',
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});

const auth = {
  login: (username, password, session) => {
    // console.log('bye');
    instance.post('/auth/login', {
      "username": username,
      "password": password
    })
    .then(async response => {
      var seekCookie = "userinfo=";
      var allRawCookies = document.cookie;
      var decodedCookies = decodeURIComponent(allRawCookies);
      // Split Cookies
      var cookiesAry = decodedCookies.split(';');
      // Find The Correct Cookie
      var match = null;
      cookiesAry.forEach(raw =>
      {
        var loc = raw.indexOf(seekCookie);
        if (loc != -1)
        {
          // Found The Cookie With Our Name
          match = raw;
        }
      });
      if (match != null)
      {
        var tmpVal = match.substring(seekCookie.length, match.length);
        userInfo = JSON.parse(tmpVal)
        session.$store.commit('login', userInfo);
        if (session.$store.getters.isAuthenticated)
        {
          session.$router.push(
          {
            path: "/dashboard"
          });
        }
        else
        {
          console.log("Not Authenticated");
        }
      }
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
    });
  },
}

const clock = {
  userStatusAtTime: (userID, seekTimestamp, session) => {
    instance.post('/clock/status', {
      "userId": userID,
	    "seekTimestamp": seekTimestamp
    })
    .then(async response => {
      console.log(response.data);
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
  },
}

const reporting = {
  multi: (userID, seekTimestamp, session) => {
    instance.post('/clock/status', {
      "userId": userID,
	    "seekTimestamp": seekTimestamp
    })
    .then(async response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
    });
  },
}

module.exports = {
  auth
};