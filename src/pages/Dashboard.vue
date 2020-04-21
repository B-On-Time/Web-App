<template>
  <div class="content">
    <div class="md-layout">
      <b-container class="bv-example-row" fluid="md">
        <div>
          <b-row>
            <b-col>
              <h1 class="title">Total Hours This Month: </h1>
            </b-col>
            <b-col>
              <h1 class="title">Total Hours Today: </h1>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h1 class="title">PTO This Month: </h1>
            </b-col>
            <b-col>
              <h1 class="title">UPTO This Month: </h1>
            </b-col>
          </b-row>
        </div>
      </b-container>

      <!-- SHOWS ALL EMPLOYEES CURRENTLY CLOCKED IN -->
      <b-container>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="purple">
            <h1 style="color:black" class="md-title">Employees Clocked In</h1>
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
  // import { SimpleTable } from "@/components/Tables/SimpleTable.vue";

  export default {
    name: 'Dashboard',
    components: {
      SimpleTable: () => import('@/components/Tables/SimpleTable.vue')
    }
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
