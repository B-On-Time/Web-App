<template>
  <div>
    <md-table v-model="users" @md-selected="onSelect">
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        md-selectable="multiple"
        md-auto-select
      >
        <md-table-cell>{{ item.position }}</md-table-cell>
        <md-table-cell>{{ item.name }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "nav-tabs-table",
  data() {
    return {
      selected: [],
      users: [
        {
          name: "Pearl Krabs",
          position: "Cheer",
        },
        {
          name: "Mr. Krabs",
          position: "Greedy Accountant",
        },
        {
          name: "Squidward Tentacles",
          position: "Depressed Cashier",
        }
      ]
    };
  },
  methods: {
    onSelect: function(items) {
      this.selected = items;
    }
  }
};
</script>
