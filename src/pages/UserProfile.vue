<template>
<div class="content">
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
export default {
  name: 'TableSingle',
  data: () => ({
    selected: {},

    teams: {
      period_start: '08/14/2020',
      period_end: '08/28/2020',
      reports: [ // 0 or more
        {
          meta: {
            userID: '234',
            fullName: 'Joe Phil',
            totals: {
              work: 32,
              pto: 65,
              upto: 534,
              admin: 44
            }
          },
          detail: [ // 0 or more
            {
              date: '08/27/2020',
              type: 'WORK',
              clockIn: '3:00 PM',
              clockOut: '4:00 PM',
              billableMins: 14,
              breakTotalMins: 57,
              breaks: [ // 0 or more
                {
                  breakStart: '3:30 PM',
                  breakEnd: '3:40 PM',
                  breakMins: 10
                }
              ]

            }
          ]
        },
        {
          meta: {
            userID: '234',
            fullName: 'Joe Phil1',
            totals: {
              work: 321,
              pto: 651,
              upto: 5341,
              admin: 441
            }
          },
          detail: [ // 0 or more
            {
              date: '08/27/2020',
              type: 'WORK',
              clockIn: '3:00 PM',
              clockOut: '4:00 PM',
              billableMins: 141,
              breakTotalMins: 571,
              breaks: [ // 0 or more
                {
                  breakStart: '3:30 PM',
                  breakEnd: '3:40 PM',
                  breakMins: 10
                }
              ]

            }
          ]
        }
      ]
    }
  }),

  methods: {
    addEmployee: function (event) {
      this.$router.push("/newUser");
    },

    addTeam: function (event) {
      this.teams.push({
        team: [{
          id: "",
          name: "",
          status: "",
          title: "",
        }]

      })
    },

    goToProfile(employee) {
      this.$router.push("/profile");
      // Ties together with Victors part
    }
  }
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
