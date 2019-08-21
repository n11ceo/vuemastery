<template>
  <div>
  <h1 class="text-center">Dashboard</h1>
    <v-data-table 
    :headers="headers" 
    :items="employees" 
    :items-per-page="5" 
    multi-sort
    class="elevation-1"
    @click:row="selectRow"
    ></v-data-table>

    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar">
        You have selected {{employeeNameAndTitle}}
        <v-btn color="primary" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      employeeNameAndTitle: '',  
      snackbar: false,
      headers: [
        {
          text: "Name",
          align: "left",
          value: "name"
        },
        { text: "Title", value: "title" },
        { text: "Salary", value: "salary" },
      ],
      employees: []
    };
  },
  methods: {
      selectRow(event) {
          this.snackbar = true
          this.employeeNameAndTitle = event.name + ", " + event.title
      }
  },
  created() {
    axios.get('http://localhost:3000/employees')
    .then(response => (
      this.employees = response.data
    ))
  }
};
</script>

<style scoped>
</style>