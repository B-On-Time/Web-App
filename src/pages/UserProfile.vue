<template>
<div class="content">
  <b-row>
    <b-col cols="12">
      <md-button style="margin-top: 25px; text-align: center; left: 45%; right: 55%" class="md-primary" v-on:click="addEmployee">Add New Employee</md-button>
    </b-col>
  </b-row>

      <b-row style="margin-top: 50px; text-align: center; left: 50%; right: 50%">
        <b-col cols="12">
          <!-- BUTTON BELOW IS STRICTLY USED FOR TESTING MULTIPLE TABLES -->
          <!-- <md-button v-on:click="addTeam" class="md-fab md-primary"> -->
          <div v-for="(report, teamindex) in teams.reports" :key="teamindex">
            <md-card class="card">
              <md-card-header data-background-color="purple">
                <!-- header for multiple teams implementation -->
                <!-- <h1 class="md-title"> Team {{ teamindex + 1 }} -->
                <!-- Header for single team implementation -->
                <h1 style="color:black" class="md-title"> {{ report.meta.fullName }}</h1>
              </md-card-header>

              <md-card-content>
                <!-- Takes you to that particular employees profile page when clicked on -->
                <md-table class="table" table-header-color="purple" md-card @md-selected="goToProfile">
                  <md-table-row slot="md-table-row" md-selectable="single">
                    <md-table-cell md-label="Date">
                      Date
                    </md-table-cell>
                    <md-table-cell md-label="Clock In">
                      Clock In
                    </md-table-cell>
                    <md-table-cell md-label="Clock Out">
                      Clock Out
                    </md-table-cell>
                    <md-table-cell md-label="Work">
                      Work Time
                    </md-table-cell>
                    <md-table-cell md-label="Break">
                      Break Time
                    </md-table-cell>
                  </md-table-row>
                  <md-table-row slot="md-table-row" v-for="(timesheet, timesheetindex) in report.detail" :key="timesheetindex+10" md-selectable="single">
                    <md-table-cell md-label="Date">
                      {{ timesheet.date }}
                    </md-table-cell>
                    <md-table-cell md-label="Clock In">
                      {{ timesheet.clockIn }}
                    </md-table-cell>
                    <md-table-cell md-label="Clock Out">
                      {{ timesheet.clockOut }}
                    </md-table-cell>
                    <md-table-cell md-label="Work">
                      {{ (timesheet.billableMins/60).toFixed(2) }} hr
                    </md-table-cell>
                    <md-table-cell md-label="Break">
                      <!-- {{ timesheet.breakTotalMins }} -->
                    </md-table-cell>
                  </md-table-row>
                </md-table>
              </md-card-content>
            </md-card>
          </div>
        </b-col>
      </b-row>
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
      var dateOffset = (24 * 60 * 60 * 1000) * 30; //30 days
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
.header {
  font-size: 50px;
  color: white;
  letter-spacing: -3px;
}

.table {
  width: 750px;
  margin-left: -21px;
}

.header {
  font-size: 50px;
  color: white;
  letter-spacing: -3px;
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

<style>
.vmdtp_text {
  overflow: visible !important;
}
</style>
