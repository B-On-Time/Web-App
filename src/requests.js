const axios = require('axios');
const instance = axios.create({
  baseURL: 'https://api.crabrr.com',
  // baseURL: 'http://localhost:3030',
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
        cookiesAry.forEach(raw => {
          var loc = raw.indexOf(seekCookie);
          if (loc != -1) {
            // Found The Cookie With Our Name
            match = raw;
          }
        });
        if (match != null) {
          var tmpVal = match.substring(seekCookie.length, match.length);
          userInfo = JSON.parse(tmpVal)
          session.$store.commit('login', userInfo);
          if (session.$store.getters.isAuthenticated) {
            session.$router.push(
              {
                path: "/dashboard"
              });
          }
          else {
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
  clockIn: (date, time) => {
    instance.post('/clock/in', {
      "eventDate": date,
      "entryTime": time,
      "punchType": "WORK",
      "notes": ""
    })
      .then(async response => {
        session.$store.commit('setTeams', response.data.result);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  clockOut: (date, time) => {
    instance.post('/clock/out', {
      "eventDate": date,
      "entryTime": time,
      "punchType": "WORK",
      "notes": ""
    })
      .then(async response => {
        session.$store.commit('setTeams', response.data.result);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

const reporting = {
  reportAll: (startDate, endDate, session) => {
    instance.post('/report/all', {
      "startDate": startDate,
      "endDate": endDate
    })
      .then(async response => {
        session.$store.commit('setTeams', response.data.result);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  reportSelf(startDate, endDate, session) {
    instance.post('/report/all', {
      "startDate": startDate,
      "endDate": endDate
    })
      .then(async response => {
        session.$store.commit('setSelf', response.data.result);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

const users = {
  createUser: (firstName, middleName, lastName, email, password) => {
    instance.post('/user', {
      "firstName": firstName,
      "middleName": middleName,
      "lastName": lastName,
      "email": email,
      "password": password
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
  auth,
  reporting,
  users,
  clock
};