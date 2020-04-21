<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row
      slot="md-table-row"
      slot-scope="{ item }"
      md-selectable="multiple"
      md-auto-select
      >
      <md-table-cell v-model="user.id" md-label="">{{ item.id }}</md-table-cell>
      <md-table-cell v-model="user.name" md-label="Name">{{ item.name }}</md-table-cell>
      <md-table-cell v-model="user.position" md-label="Position">{{ item.position }}</md-table-cell>
      <md-table-cell v-model="user.hours" md-label="Hours Worked">{{ item.hours }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      selected: [],
      user: [
        {
          id: '',
          name: '',
          position: '',
          hours: ''
        }]
    }
  }
};
</script>
