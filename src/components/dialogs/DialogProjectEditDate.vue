<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="320px"  >
      <!-- <template v-slot:activator="{ on }"> -->
        <v-btn slot="activator" color="green" class="edit-button">
          <v-icon>edit</v-icon>
          <span>Edit Date</span>
        </v-btn>
      <!-- </template> -->
      <v-card>
        <v-card-title>
          <span class="headline">Edit Date</span>
        </v-card-title>
        <v-date-picker v-model="editableDate"
          class="dialog__picker mt-2">
          <template scope="{save, cancel}" actions>
            <v-btn color="green darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn color="green darken-1" flat @click.native="onSaveEdit">Save</v-btn>
          </template>
        </v-date-picker>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: {
      project: Object
    },
    data () {
      return {
        dialog: false,
        editableDate: null
      }
    },
    methods: {
      onSaveEdit() {
        const newDate = new Date(this.project.date)
        const newDay = new Date(this.editableDate).getUTCDate()
        const newMonth = new Date(this.editableDate).getUTCMonth()
        const newYear = new Date(this.editableDate).getUTCFullYear()
        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)
        this.$store.dispatch("editProject", {
          date: newDate,
          id: this.project.id
        })
        this.dialog = false
      }
    },
    created(){
      this.editableData = new Date(this.project.date)
    }
  };
</script>
