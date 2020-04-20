<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"></div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">

      <div v-for="(team, teamindex) in teams" :key="teamindex">
        <md-card class="card">
        <md-card-header data-background-color="purple">
          <h1 class="md-title"> Team {{ teamindex + 1 }}
            <!-- PROPER BUTTON FOR ADDING NEW EMPLOYEE: -->
            <!-- <md-button v-on:click="addEmployee" class="md-fab md-primary"> -->
            <!-- BELOW SHOULD BE ELSEWHERE. USED FOR TESTING MULTIPLE TABLES -->
              <md-button v-on:click="addTeam" class="md-fab md-primary">
            <md-icon class="add">add</md-icon>
            </md-button>
          </h1>
        </md-card-header>

        <md-card-content>
          <!-- Takes you to that particular employees profile page when clicked on -->
          <md-table
            class="table"
            table-header-color="purple"
            md-card @md-selected="goToProfile"
          >
            <md-table-row slot="md-table-row" v-for="(member, memberindex) in team" :key="teamindex-memberindex" md-selectable="single">
              <md-table-cell
                md-label="ID"
                md-sort-by="id"
                v-model = "member.id"
                md-numeric>{{ member.id }}
              </md-table-cell>

              <md-table-cell
                md-label="Name"
                v-model = "member.name"
                md-sort-by="name">{{ member.name }}
              </md-table-cell>

              <md-table-cell md-label="Status">
                <p class="status" v-if="member.status == 'true'">Clocked In</p>
                <p v-else>Clocked Out</p>
              </md-table-cell>

              <md-table-cell md-label="Job Title" v-model = "member.title" md-sort-by="title">{{ member.title }}</md-table-cell>
            </md-table-row>
          </md-table>
        </md-card-content>
      </md-card>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TableSingle',
    data: () => ({
      selected: {},

      teams:[
        {
          team:[{
            id: "",
            name: "",
            status: "",
            title: "",
          }]
        }
      ],
    }),

    methods: {
      addEmployee: function (event)  {
        this.$router.push("/newUser");
      },

      addTeam: function (event) {
        this.teams.push({
          team:[{
            id: "",
            name: "",
            status: "",
            title: "",
          }]

        })
      },

      goToProfile (member) {
        this.$router.push("/profile");
        // Ties together with Victors part
      }
    }
  }
</script>

<style lang="scss" scoped>
  .table{
    width: 750px;
    margin-left: -21px;
  }

  .card{
    width: 750px;
    margin-left: -120px;
  }

  .add{
    margin-right: 19px;
  }

  .status{
    margin-top: 1px;
    color: purple;
    font-weight: bold;
  }

  .md-fab{
    margin-left: 500px;
  }
</style>
