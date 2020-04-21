<template>
  <div class="content">
    <div class="md-layout">
      <b-container class="bv-example-row" fluid="md">
        <div>
          <b-row>
            <b-col>
              <h1 class="title">Total Hours This Month: {{(totalTimes.totalMonth/60).toFixed(2)}}</h1>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h1 class="title">PTO This Month: {{(totalTimes.totalPTOMonth/60).toFixed(2)}}</h1>
            </b-col>
            <b-col>
              <h1 class="title">UPTO This Month: {{(totalTimes.totalUPTOMonth/60).toFixed(2)}}</h1>
            </b-col>
          </b-row>
        </div>
      </b-container>

      <!-- SHOWS ALL EMPLOYEES CURRENTLY CLOCKED IN -->
      <b-container>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="purple">
            <h4 class="title">Employees Clocked In</h4>
          </md-card-header>

          <md-card-content>
            <SimpleTable table-header-color="purple"></SimpleTable>
          </md-card-content>
        </md-card>
      </div>
      </b-container>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    components: {
      SimpleTable: () => import('@/components/Tables/SimpleTable.vue')
    },
    computed: {
      totalTimes: function () {
        let teams = this.$store.getters.getTeams;
        let ret = {};
        ret.totalMonth = 0;
        ret.totalPTOMonth = 0;
        ret.totalUPTOMonth = 0;
        if (teams.reports == undefined) return ret;
        teams.reports.forEach(element => {
          ret.totalMonth += element.meta.totals.work
          ret.totalPTOMonth += element.meta.totals.pto
          ret.totalUPTOMonth += element.meta.totals.upto
        });
        return ret;
      }
    },
  }
</script>

<style>
  .title{
    font-size: 22px;
    color: white;
    padding: 5px;
    margin-left: 20px;
  }

  .card{
    background-color: #411f50;
    border-color: #411f50;
    position: fixed;
    margin-left: 300px;
  }

  .hours{
    position: fixed;
    margin-left: 300px;
  }
</style>
