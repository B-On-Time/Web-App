<template>
  <div>
    <md-table :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row">
        <md-table-cell md-label="Name">Name</md-table-cell>
        <md-table-cell md-label="Work Total">Work Total</md-table-cell>
        <md-table-cell md-label="PTO Total">PTO Total</md-table-cell>
        <md-table-cell md-label="UPTO">UPTO</md-table-cell>
        <md-table-cell md-label="Status">Status</md-table-cell>
      </md-table-row>
      <md-table-row slot="md-table-row" v-for="(user, index) in teams.reports" :key="index">
        <md-table-cell md-label="Name">{{ user.meta.fullName }}</md-table-cell>
        <md-table-cell md-label="Work Total">{{ (user.meta.totals.work/60).toFixed(2) }} hr</md-table-cell>
        <md-table-cell md-label="PTO Total">{{ (user.meta.totals.pto/60).toFixed(2) }} hr</md-table-cell>
        <md-table-cell md-label="UPTO">{{ (user.meta.totals.upto/60).toFixed(2) }} hr</md-table-cell>
        <md-table-cell md-label="Status">Clocked in</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import db from '@/requests.js';

export default {
  name: "SimpleTable",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      }
  },
  computed: {
    teams: function () {
      return this.$store.getters.getTeams;
    },
  },
  methods: {
    reportAll() {
      var dateOffset = (24*60*60*1000) * 30; //30 days
      var endDate = new Date();
      var beginDate = new Date();
      beginDate.setTime(beginDate.getTime() - dateOffset);
      let endDateString = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`
      let beginDateString = `${beginDate.getFullYear()}-${beginDate.getMonth() + 1}-${beginDate.getDate()}`
      db.reporting.reportAll(beginDateString, endDateString, this);
    }
  },
  beforeMount() {
    this.reportAll()
  }
};
</script>
