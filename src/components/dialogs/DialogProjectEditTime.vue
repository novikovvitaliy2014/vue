<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="350px">
      <!-- <template v-slot:activator="{ on }"> -->
        <v-btn slot="activator" color="green" class="edit-button">
          <v-icon>edit</v-icon>
          <span>Edit Time</span>
        </v-btn>
      <!-- </template> -->
      <v-card>
        <v-card-title>
          <span class="headline">Edit Time</span>
        </v-card-title>
        <v-time-picker v-model="editableTime"
          class="dialog__picker mt-2"
          format="24hr">
          <template scope="{save, cancel}" actions>
            <v-btn color="green darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn color="green darken-1" flat @click.native="onSaveEdit">Save</v-btn>
          </template>
        </v-time-picker>
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
        editableTime: null,
        picker: new Date().toISOString().substr(0, 10)
      }
    },
    methods: {
      onSaveEdit() {
        // console.log(this.project.date)
        // const editableTime = this.editableTime
        // console.log(editableTime)
        const newDate = new Date(this.project.date)
        console.log(newDate)
        // const time
        const hours = this.editableTime.match(/^(\d+)/)[1]
        console.log(hours)
        const minutes = this.editableTime.match(/:(\d+)/)[1]
        console.log(minutes)
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        console.log(newDate)
        // const string = newDate.toTimeString()
        // console.log(string)
        this.$store.dispatch("editProject", {
          date: newDate,
          id: this.project.id
        })
        this.dialog = false
      }
    },
    created(){
      this.editableTime = new Date(this.project.date)
      // console.log(oldDate)
      // const hours = oldDate.match(/^(\d+)/)[1]
      // console.log(hours)
      // const minutes = oldDate.match(/:(\d+)/)[1]
      // console.log(minutes)
      // const date = new Date()
      // oldDate.setHours(hours)
      // oldDate.setMinutes(minutes)
      // console.log(date)


      // const time =
       // = oldDate
      // this.editableTime = new Date(this.project.date).toTimeString()

      // this.editableTime === new Date(this.project.date)
      // const test = this.editableTime
      // console.log(test)

    }
  };
</script>
