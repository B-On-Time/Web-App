<template>
  <b-container fluid class="px-0">
    <b-row class="mx-auto centered">
      <b-col cols="12" class="px-0">
        <form class="card">
          <md-card>
            <md-card-header data-background-color="purple">
              <h4 style="color:black; font-size: 28px" class="md-title">Create Profile</h4>
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
                    <label>Last Name</label>
                    <md-input v-model="newUser.lastname" type="email"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>Team</label>
                    <md-input v-model="newUser.team" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>Position</label>
                    <md-input v-model="newUser.position" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100 text-left">
                  <md-button v-on:click="createUser()"  class="md-dense md-raised md-primary" type="submit">Add New User</md-button>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
      name: "AddUser",
      data() {
        return {
            pageStatus: {
                waitingOnAPI: false
            },
            newUser: {
                firstname: "",
                lastname: "",
                team: "",
                position: "",
            },
         };
       },

       methods: {
           // createUser() {
           //     this.pageStatus.waitingOnAPI = true;
           //     instance.post//(get page info)
           //         .then(async (response) => {
           //             this.pageStatus.waitingOnAPI = false;
           //             this.$store.commit('addUser', {user: response.data.result})
           //         });
           // }
       }
   };
 </script>

<style>
  .card{
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
