const auth = {
  login: (instance, session, username, password) => {
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
      }
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
    });
  }
}

module.exports = {
  auth
};