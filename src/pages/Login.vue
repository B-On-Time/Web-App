<template>
  <div class="bg-gradiant">
    <b-container fluid class="px-0">
      <b-row class="form-container mx-0">
        <b-col cols="6" class="px-0">
          <img fluid class="front" src="../assets/bimg.png" />
        </b-col>
        <b-col cols="6" class="px-0">
          <b-row>
            <h1 class="login mx-auto">Login</h1>
          </b-row>
          <b-row class="mx-auto centered">
            <md-field>
              <label>Username</label>
              <md-input v-model="input.username"></md-input>
            </md-field>
            <md-field>
              <label>Password</label>
              <md-input v-model="input.password"></md-input>
            </md-field>
          </b-row>
          <b-row class="mx-auto centered">
            <b-button
              class="b1 mx-auto"
              block
              variant="light"
              type="submit"
              size="sm"
              v-on:click="login()"
            >
              Sign In
            </b-button>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      input: {
        username: "",
        password: ""
      },
      mockAccount: {
        username: "user",
        password: "pass"
      }
    };
  },
  computed: {
    messageClass() {
      return {
        "md-invalid": this.username
      };
    }
  },

  methods: {
    login() {
      if (this.input.username != "" && this.input.password != "") {
        if (
          this.input.username == this.mockAccount.username &&
          this.input.password == this.mockAccount.password
        ) {
          this.$emit("authenticated", true);
          this.$router.push("/dashboard");
        } else {
          console.log("The username and/or password you entered is incorrect.");
        }
      } else {
        console.log("Please enter a username and/or password.");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
input {
  margin: 8px 0;
  width: 250px;
  opacity: 0.7;
}

button {
  border-radius: 5px;
  border: 1px solid black;
  color: #1a0b21;
  background-color: #9d8cab;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  width: 305px;
  opacity: 0.8;
}

.centered {
  width: 300px;
}

.container-fluid {
  background-color: #1a0b21;
  box-shadow: 1px 5px 25px 1px black;
  width: 800px;
  height: 450px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -225px;
  margin-left: -400px;
  border-radius: 25px;
}

.form-container {
  width: inherit;
  height: inherit;
}

.front {
  width: 100%;
  height: 100%;
  opacity: 0.8;
  border-radius: 23px 0px 0px 23px;
}

.input2 {
  margin-top: 1px;
}

.login {
  font-family: "Helvetica";
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 70px;
  letter-spacing: -5px;
  text-shadow: 1px 1px 0.2px white;
  opacity: 0.7;
  margin-top: 45px;
}

.bg-gradiant {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    45deg,
    #8860d0,
    #9a75c9,
    #5c9cb5,
    #5680e9,
    #9664ed,
    #8860d0
  );
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-size: 300% 300%;
  animation: change 35s ease-in-out infinite;
}

@keyframes change {
  0% {
    background-position: 0 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}
</style>
