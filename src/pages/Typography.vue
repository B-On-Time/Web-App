<template>
  <div>
   <b-container class="container">
      <b-row class="page">
        <b-col>
          <br />
           <h4 style="font-weight: bold; color:black">
            Name: {{firstName}} {{lastName}} <br />
            Employee ID: 555-10</h4>
            <p style="font-weight: bold; color:black">Please select a date and time: </p>
          <div>
            <VueMaterialDateTimePicker class="picker" v-model="dateAndTime" :is-date-only="false" />
          </div>
          <h4>
            <md-button style="margin:3px" id="clkIn" class="md-dense md-raised md-primary" v-on:click="addIn">Clock In</md-button>
            <md-button style="margin:3px" id="clkOut" class="md-dense md-raised md-primary" v-on:click="addOut" disabled>Clock out</md-button>
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
                  <div class="row">
                    <div class="col-sm-3 user-details">
                      <img src="../assets/business.png" class="avatar img-circle img-responsive" />
                      <p class="text-center">
                      </p>
                    </div>

                    <div class="col-sm-7 comment-section">
                      <p>
                        Clock in time: {{i.clockin}}
                      </p>
                      <p>
                        Clock out time:  {{i.clockout}}
                      </p>
                      <p>
                        Total worked:  {{i.total}}
                      </p>
                      <p>
                        ID: {{i.id}}
                      </p>

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
    data: function () {
        return {
        users: [{
          clockin: '',
          clockout: '',
          total: '',
          id: 0
        }],
        firstName: 'John',
        lastName: 'Doe',
        dateAndTime: null,
        timeOnly: null,
      }
    },
  methods: {
    addIn: function() {
      if (this.dateAndTime == null)
      {
        alert("Please, select a time first")
        return
      }
      document.getElementById("clkIn").disabled = true
      document.getElementById("clkOut").disabled = false
      this.users[this.users.length - 1].clockin = this.dateAndTime
    },
    addOut: function() {

      if (!document.getElementById("clkIn").disabled)
      {
        alert("No clock in time has been added!")
        return
      }
      if (this.dateAndTime == null)
      {
        alert("Please, select a time first")
        return
      }
      var newID = this.users[this.users.length - 1].id + 1
      this.users[this.users.length - 1].clockout = this.dateAndTime
      var strIn = String(this.users[this.users.length - 1].clockin).substring(16, 21)
      var strOut = String(this.dateAndTime).substr(16, 5)
      var sum = diff(strIn, strOut)
      this.users[this.users.length - 1].total = sum

      document.getElementById("clkIn").disabled = false
      document.getElementById("clkOut").disabled = true
      this.clockout = this.dateAndTime

      this.users.push({clockin: '', clockout: '', total: 0, id: newID})
    },
    deleteEntry: function(someEntry) {
      let index = this.users.indexOf(someEntry)
      this.users.splice(index, 1)
    },
  },
    disabledDatesAndTime: {
      to: new Date()
    },
};
</script>

<style lang="css" scoped>
vmdtp_text {
  overflow: visible !important;
}

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
  background: linear-gradient(to left , #8f25aa 15%, #a843ba 95%);
  box-shadow: 1px 2px 3px 3px #72358b;
  opacity: 0.9;
  width: 860px;
}
.time-entries
{
  margin-right: 1%;
  /* position:absolute;/ */
  top:0; right:0;
  width: 500px;
  background: black;
}
.page {
  margin-top: 2%;
}

.header{
  font-size: 45px;
}
</style>
