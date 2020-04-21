<template>
<div>
  <b-container class="container">
    <b-row class="page">
      <b-col>
        <br />
        <br />
        <br />
        <h4 style="font-weight: bold; color:black">
          Name: {{firstName}} {{lastName}} <br />
          Employee ID: {{ userId }}</h4>
          <p style="font-weight: bold; color:black">Please select a date and time: </p>
        <div>
          <VueMaterialDateTimePicker class="picker" v-model="dateAndTime" :is-date-only="false" />
        </div>
        <h4>
          <md-button style="margin:3px" id="clkIn" class="md-dense md-raised md-primary" v-on:click="addIn">Clock In</md-button>
          <md-button style="margin:3px" id="clkOut" class="md-dense md-raised md-primary" v-on:click="addOut">Clock out</md-button>
        </h4>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h1 style="color:black; font-size: 32px" class="header">Timesheet</h1>
        <ul>
          <div class="time-entries" style="background:black">
            <div class="list-group">
              <a class="list-group-item" v-for="i in users" :key="i.id">
                <div v-for="(report, i) in self.reports" :key="i">
                  <div v-for="detail in report.detail" :key="detail.clockIn" class="row">
                    <div class="col-sm-3 user-details">
                      <img src="../assets/business.png" class="avatar img-circle img-responsive" />
                      <p class="text-center">
                      </p>
                    </div>

                    <div class="col-sm-7 comment-section">
                      <p>
                        Clock in time: {{ detail.clockIn }}
                      </p>
                      <p>
                        Clock out time: {{ detail.clockOut }}
                      </p>
                      <p>
                        Total worked: {{ detail.billableMins }} Minutes
                      </p>

                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </ul>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
import VueMaterialDateTimePicker from "vue-material-date-time-picker/src/components/VueMaterialDateTimePicker.vue";
import db from '@/requests.js';

var dateAndTime;

function diff(start, end) {
  start = start.split(":");
  end = end.split(":");
  var startDate = new Date(0, 0, 0, start[0], start[1], 0);
  var endDate = new Date(0, 0, 0, end[0], end[1], 0);
  var diff = endDate.getTime() - startDate.getTime();
  var hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  var minutes = Math.floor(diff / 1000 / 60);

  return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;
}
export default {
  name: "Demo",
  components: {
    VueMaterialDateTimePicker
  },
  computed: {
    self: function () { return this.$store.getters.getSelf },
    firstName: function () { return this.$store.getters.getFirstName },
    lastName: function () { return this.$store.getters.getLastName },    
    userId: function () { return this.$store.getters.getUserId },    
  },
  data: function () {
    return {
      users: [{
        clockin: '',
        clockout: '',
        total: '',
        id: 0
      }],
      dateAndTime: null
    }
  },
  methods: {
    addIn: function () {
      if (this.dateAndTime == null) {
        alert("Please, select a time first")
        return
      }
      this.users[this.users.length - 1].clockin = this.dateAndTime
      let request = this.getDate(this.dateAndTime)
      db.clock.clockIn(request.eventDate, request.entryTime, this);
      //console.log(this.dateAndTime)
    },
    addOut: function () {
      let request = this.getDate(this.dateAndTime)
      db.clock.clockOut(request.eventDate, request.entryTime, this);
      //console.log(this.dateAndTime)
    },
    deleteEntry: function (someEntry) {
      let index = this.users.indexOf(someEntry)
      this.users.splice(index, 1)
    },
    getReport() {
      var dateOffset = (24 * 60 * 60 * 1000) * 30; //30 days
      var endDate = new Date();
      var beginDate = new Date();
      beginDate.setTime(beginDate.getTime() - dateOffset);
      let endDateString = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`
      let beginDateString = `${beginDate.getFullYear()}-${beginDate.getMonth() + 1}-${beginDate.getDate()}`
      db.reporting.reportSelf(beginDateString, endDateString, this);
    },
    getDate(d) {
      let request = {};

      var ymd = d.toISOString().split('T')[0]
      request.eventDate = ymd

      var h = d.getHours();
      var hours = (h+24)%24; 
      var mid='am';
      if(hours==0)
      {
          hours=12;
      }
      else if(hours>12)
      {
          hours=hours%12;
          mid='pm';
      }
      if(hours<10)
      {
          hours='0'+hours
      }
      var m = d.getMinutes()
      if(m < 10)
      {
          m = '0'+m
      }
      var hmid = hours + ':' + m + " " + mid
      request.entryTime = hmid

      return request;
  }
  },
  beforeMount() {
    this.getReport()
  },
  disabledDatesAndTime: {
    to: new Date()
  },
};
</script>

<style lang="css" scoped>
main {
  width: 525px;
  margin: 0 auto;
}

section {
  margin-bottom: 16px;
}

h1 {
  font-weight: 600;
  text-align: center;
}

h3 {
  font-weight: 500;
}

code {
  display: inline-block;
  margin: 16px 0;
  padding: 6px;
  background-color: darkgray;
  border-radius: 4px;
}

h1 {
  color: white;
}

div {
  color: black;
}

.picker {
  width: 90%;
}

.container {
  margin-top: 5%;
  /* padding: 25%; */
  background: linear-gradient(to left, #8f25aa 15%, #a843ba 95%);
  box-shadow: 1px 2px 3px 3px #72358b;
  opacity: 0.9;
  width: 860px;
}

.time-entries {
  margin-right: 1%;
  /* position:absolute;/ */
  top: 0;
  right: 0;
  width: 500px;
  background: black;
}

.page {
  margin-top: 2%;
}

.header {
  font-size: 45px;
}
</style>

<style>

.vmdtp_text {
  overflow: inherit;
}

</style>