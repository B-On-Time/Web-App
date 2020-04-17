<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row
      slot="md-table-row"
      slot-scope="{ item }"
      md-selectable="multiple"
      md-auto-select
      >
        <md-table-cell md-label="">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Position">{{ item.position }}</md-table-cell>
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
      users: [
        {
          id: 1,
          name: "Dakota Rice",
          position: "Assistant",
        },
        {
          id: 2,
          name: "Minerva Hooper",
          position: "Intern",
        },
        {
          id: 3,
          name: "Sage Rodriguez",
          position: "Engineer",
        },
        {
          id: 4,
          name: "Philip Chaney",
          position: "Writer",
        }
      ]
    };
  }
};
</script>
