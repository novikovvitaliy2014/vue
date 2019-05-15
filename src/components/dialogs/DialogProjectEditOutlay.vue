<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="350px">
      <!-- <template v-slot:activator="{ on }"> -->
        <v-btn slot="activator" color="green" class="edit-button">
          <v-icon>edit</v-icon>
          <span>edit</span>
        </v-btn>
      <!-- </template> -->
      <v-card>
        <v-card-title>
          <span class="headline">Edit Outlay</span>
        </v-card-title>

        <v-card-text>
          <section class="create__outlay">
            <h4>Outlay</h4>
            <div class="create__outlay-resource">
              <div class="create__outlay-item create__outlay-item--1">
                <v-text-field
                  label="Name"
                  v-model="outlayName1"
                  class="create__outlay-cell create__outlay-cell--name"
                  >
                </v-text-field>
                <v-text-field
                  :rules="donRules"
                  v-model="outlayQuantity1"
                  label="Quantity needed"
                  class="create__outlay-cell create__outlay-cell--quantity"
                  >
                </v-text-field>
                <v-text-field
                  type="number"
                  v-model="outlayPrice1"
                  label="Price of 1 item"
                  class="create__outlay-cell create__outlay-cell--price"
                  >
                </v-text-field>
                <div class="create__outlay-cell create__outlay-cell--sum">
                  <span>Sum</span>
                  <span>{{multiplication(outlayQuantity1, outlayPrice1)}}</span>
                </div>
                <v-btn v-if="!res2" class="create__outlay--add" @click="res2 = true">Add Resource<v-icon medium>keyboard_arrow_down</v-icon></v-btn>
              </div>

              <div v-if="res2">
                <div class="create__outlay-item create__outlay-item--2">
                  <v-text-field
                    label="Name"
                    v-model="outlayName2"
                    class="create__outlay-cell create__outlay-cell--name"
                    >
                  </v-text-field>
                  <v-text-field
                    v-model="outlayQuantity2"
                    label="Quantity needed"
                    class="create__outlay-cell create__outlay-cell--quantity"
                    >
                  </v-text-field>
                  <v-text-field
                    v-model="outlayPrice2"
                    label="Price of 1 item"
                    class="create__outlay-cell create__outlay-cell--price"
                    >
                  </v-text-field>
                  <div class="create__outlay-cell create__outlay-cell--sum">
                    <span>Sum</span>
                    <span>{{multiplication(outlayQuantity2, outlayPrice2)}}</span>
                  </div>
                </div>
                <v-btn v-if="!res3" class="create__outlay--add" @click="res3 = true">Add Resource<v-icon medium>keyboard_arrow_down</v-icon></v-btn>
              </div>

              <div v-if="res3">
                <div class="create__outlay-item create__outlay-item--3">
                  <v-text-field
                    label="Name"
                    v-model="outlayName3"
                    class="create__outlay-cell create__outlay-cell--name"
                    >
                  </v-text-field>
                  <v-text-field
                    v-model="outlayQuantity3"
                    label="Quantity needed"
                    class="create__outlay-cell create__outlay-cell--quantity"
                    >
                  </v-text-field>
                  <v-text-field
                    v-model="outlayPrice3"
                    label="Price of 1 item"
                    class="create__outlay-cell create__outlay-cell--price"
                    >
                  </v-text-field>
                  <div class="create__outlay-cell create__outlay-cell--sum">
                    <span>Sum</span>
                    <span>{{multiplication(outlayQuantity3, outlayPrice3)}}</span>
                  </div>
                </div>
                <v-btn v-if="!res4" class="create__outlay--add" @click="res4 = true">Add Resource<v-icon medium>keyboard_arrow_down</v-icon></v-btn>
              </div>

              <div v-if="res4">
                <div class="create__outlay-item create__outlay-item--4">
                  <v-text-field
                    label="Name"
                    v-model="outlayName4"
                    class="create__outlay-cell create__outlay-cell--name"
                    >
                  </v-text-field>
                  <v-text-field
                    v-model="outlayQuantity4"
                    label="Quantity needed"
                    class="create__outlay-cell create__outlay-cell--quantity"
                    >
                  </v-text-field>
                  <v-text-field
                    v-model="outlayPrice4"
                    label="Price of 1 item"
                    class="create__outlay-cell create__outlay-cell--price"
                    >
                  </v-text-field>
                  <div class="create__outlay-cell create__outlay-cell--sum">
                    <span>Sum</span>
                    <span>{{multiplication(outlayQuantity4, outlayPrice4)}}</span>
                  </div>
                </div>
                <v-btn v-if="!res5" class="create__outlay--add" @click="res5 = true">Add Resource
                  <v-icon medium>keyboard_arrow_down</v-icon></v-btn>
              </div>

              <div v-if="res5">
                <div class="create__outlay-item create__outlay-item--5">
                  <v-text-field
                    label="Name"
                    v-model="outlayName5"
                    class="create__outlay-cell create__outlay-cell--name"
                    >
                  </v-text-field>
                  <v-text-field
                    v-model="outlayQuantity5"
                    label="Quantity needed"
                    class="create__outlay-cell create__outlay-cell--quantity"
                    >
                  </v-text-field>
                  <v-text-field
                    v-model="outlayPrice5"
                    label="Price of 1 item"
                    class="create__outlay-cell create__outlay-cell--price"
                    >
                  </v-text-field>
                  <div class="create__outlay-cell create__outlay-cell--sum">
                    <span>Sum</span>
                    <span>{{multiplication(outlayQuantity5, outlayPrice5)}}</span>
                  </div>
                </div>
                <!-- <v-btn class="create__outlay--add" @click="res5 = !res5">Add/Hide Resource</v-btn> -->
              </div>
            </div>
            <!-- <button
                color="green"
                @click="sendData"
                :disabled="projectIdExist"
                type="submit"
                class="btn">
                Create Project
              </button> -->
              <!-- :disabled="!valid || projectIdExist" -->
          </section>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="green darken-1" flat @click="saveOutlay">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: {
      project:Object
    },
    data() {
      return {
        dialog: false,
        res2: false,
        res3: false,
        res4: false,
        res5: false,
        outlayQuantity1: '',
        outlayPrice1: '',
        outlayName1: '',
        outlayQuantity2: '',
        outlayPrice2: '',
        outlayName2: '',
        outlayQuantity3: '',
        outlayPrice3: '',
        outlayName3: '',
        outlayQuantity4: '',
        outlayPrice4: '',
        outlayName4: '',
        outlayQuantity5: '',
        outlayPrice5: '',
        outlayName5: '',
        donRules: [
          v => !!v || 'Enter project title',
          v => (v && v.length >= 6) || 'Title must be at least 6 characters'
        ],
      }
    },
    computed: {
    },
    methods: {
      saveOutlay(){
        const dataOutlay = {
          outlayName1: this.outlayName1,
          outlayQuantity1: this.outlayQuantity1,
          outlayPrice1: this.outlayPrice1,
          outlayQuantity2: this.outlayQuantity2,
          outlayPrice2: this.outlayPrice2,
          outlayName2: this.outlayName2,
          outlayQuantity3: this.outlayQuantity3,
          outlayPrice3: this.outlayPrice3,
          outlayName3: this.outlayName3,
          outlayQuantity4: this.outlayQuantity4,
          outlayPrice4: this.outlayPrice4,
          outlayName4: this.outlayName4,
          outlayQuantity5: this.outlayQuantity5,
          outlayPrice5: this.outlayPrice5,
          outlayName5: this.outlayName5
        }
        this.$store.dispatch("editProject", {
          dataOutlay,
          id: this.project.id
        })
        this.dialog = false
      },
      multiplication(num, price) {
        return num * price
      }
     },
    created(){
      if(this.project.dataOutlay){
        let data = this.project.dataOutlay
        this.outlayName1 = data.outlayName1 ? data.outlayName1 : ""
        this.outlayQuantity1 = data.outlayQuantity1 ? data.outlayQuantity1 : ""
        this.outlayPrice1 = data.outlayPrice1 ? data.outlayPrice1 : ""
        this.outlayName2 = data.outlayName2 ? data.outlayName2 : ""
        this.outlayQuantity2 = data.outlayQuantity2 ? data.outlayQuantity2 : ""
        this.outlayPrice2 = data.outlayPrice2 ? data.outlayPrice2 : ""
        this.outlayName3 = data.outlayName3 ? data.outlayName3 : ""
        this.outlayQuantity3 = data.outlayQuantity3 ? data.outlayQuantity3 : ""
        this.outlayPrice3 = data.outlayNPrice3 ? data.outlayPrice3 : ""
        this.outlayName4 = data.outlayName4 ? data.outlayName4 : ""
        this.outlayQuantity4 = data.outlayQuantity4 ? data.outlayQuantity4 : ""
        this.outlayPrice4 = data.outlayPrice4 ? data.outlayPrice4 : ""
        this.outlayName5 = data.outlayName5 ? data.outlayName5 : ""
        this.outlayQuantity5 = data.outlayQuantity5 ? data.outlayQuantity5 : ""
        this.outlayPrice5 = data.outlayPrice5 ? data.outlayPrice5 : ""
      }
      // this.$store.dispatch('loadProjects')
    }
};
</script>
