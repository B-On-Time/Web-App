<template>
<b-container fluid class="px-0">
  <b-row class="mx-auto centered">
    <b-col cols="12" class="px-0">
      <form class="card">
        <md-card>
          <md-card-header v-if="success" data-background-color="purple">
            <h4 class="title">ACCOUNT CREATED!!</h4>
          </md-card-header>
          <div v-else>
            <md-card-header data-background-color="purple">
              <h4 class="title">Create Profile</h4>
            </md-card-header>

            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>First Name</label>
                    <md-input v-model="newUser.firstname" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>Middle Name</label>
                    <md-input v-model="newUser.middlename" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>Last Name</label>
                    <md-input v-model="newUser.lastname" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>Email</label>
                    <md-input v-model="newUser.email" type="email"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>Password</label>
                    <md-input v-model="newUser.password" type="password"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100 text-left">
                  <md-button v-on:click="createUser()" class="md-dense md-raised md-primary" type="submit">Add New User</md-button>
                </div>
              </div>
            </md-card-content>
          </div>
        </md-card>
      </form>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import db from '@/requests.js';

export default {
  name: "AddUser",
  data() {
    return {
      pageStatus: {
        waitingOnAPI: false
      },
      success: false,
      newUser: {
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        password: ""
      },
    };
  },

  methods: {
    createUser() {
      if (
        this.newUser.firstname == '' ||
        this.newUser.middlename == '' ||
        this.newUser.lastname == '' ||
        this.newUser.email == '' ||
        this.newUser.password == ''
      ) return;
      this.success = true
      db.users.createUser(this.newUser.firstname, this.newUser.middlename, this.newUser.lastname, this.newUser.email, this.newUser.password);
    }
  }
};
</script>

<style>
.card {
  margin-top: 75px;
  width: 450px;
}

.container-fluid {
  width: 800px;
  height: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -320px;
  margin-left: -640px;
}

.form-container {
  width: inherit;
  height: inherit;
}

.centered {
  width: 300px;
}
</style>
