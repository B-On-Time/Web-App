<template>
<div class="content">
  {{teams}}
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"></div>
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">

      <div v-for="(team, teamindex) in teams" :key="teamindex">
        <md-card class="card">
          <md-card-header data-background-color="purple">
            <!-- header for multiple teams implementation -->
            <!-- <h1 class="md-title"> Team {{ teamindex + 1 }} -->
            <!-- Header for single team implementation -->
            <h1 class="md-title"> {{ team.name }}
              <!-- PROPER BUTTON FOR ADDING NEW EMPLOYEE: -->
              <md-button v-on:click="addEmployee" class="md-fab md-primary">
                <!-- BUTTON BELOW IS STRICTLY USED FOR TESTING MULTIPLE TABLES -->
                <!-- <md-button v-on:click="addTeam" class="md-fab md-primary"> -->
                <md-icon class="add">add</md-icon>
              </md-button>
            </h1>
          </md-card-header>

          <md-card-content>
            <!-- Takes you to that particular employees profile page when clicked on -->
            <md-table class="table" table-header-color="purple" md-card @md-selected="goToProfile">
              <md-table-row slot="md-table-row" md-selectable="single">
                <md-table-cell md-label="Name">
                  Name
                </md-table-cell>
                <md-table-cell md-label="Status">
                  Status
                </md-table-cell>
                <md-table-cell md-label="Status">
                  billableMins
                </md-table-cell>
                <md-table-cell md-label="Status">
                  billableMins
                </md-table-cell>
              </md-table-row>
              <md-table-row slot="md-table-row" v-for="(employee, employeeindex) in team.employees" :key="employeeindex+10" md-selectable="single">
                <md-table-cell md-label="ID" md-sort-by="id" v-model="employee.id">{{ employee.id }}
                </md-table-cell>

                <md-table-cell md-label="Name" v-model="employee.name" md-sort-by="name">{{ employee.name }}
                </md-table-cell>

                <md-table-cell md-label="Status">
                  <p class="status" v-if="employee.status == 'true'">Clocked In</p>
                  <p v-else>Clocked Out</p>
                </md-table-cell>

                <md-table-cell md-label="Job Title" v-model="employee.title" md-sort-by="title">{{ employee.title }}</md-table-cell>
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
import db from '@/requests.js';

export default {
  name: 'TableSingle',
  data: () => ({
    selected: {},
  }),
  computed: {
    teams: function () {
      return this.$store.getters.getTeams;
    },
  },
  methods: {
    addEmployee: function (event) {
      this.$router.push("/newUser");
    },
    reportAll() {
      var dateOffset = (24*60*60*1000) * 30; //30 days
      var endDate = new Date();
      var beginDate = new Date();
      beginDate.setTime(beginDate.getTime() - dateOffset);
      let endDateString = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`
      let beginDateString = `${beginDate.getFullYear()}-${beginDate.getMonth() + 1}-${beginDate.getDate()}`
      db.reporting.reportAll(beginDateString, endDateString, this);
    },

    goToProfile(employee) {
      this.$router.push("/profile");
      // Ties together with Victors part
    }
  },
  beforeMount() {
    this.reportAll()
  },
}
</script>

<style lang="scss" scoped>
.table {
  width: 750px;
  margin-left: -21px;
}

.card {
  width: 750px;
  margin-left: -120px;
}

.add {
  margin-right: 19px;
}

.status {
  margin-top: 1px;
  color: purple;
  font-weight: bold;
}

.md-fab {
  margin-left: 500px;
}
</style>
