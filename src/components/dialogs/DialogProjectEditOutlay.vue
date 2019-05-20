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
            <div class="create__outlay-resource--base create__outlay-resource--show">
              <div class="create__outlay-item create__outlay-item--1">
                <v-text-field
                  label="Name"
                  v-model="dataOutlay[0].outlayName"
                  class="create__outlay-cell create__outlay-cell--name"
                  >
                </v-text-field>
                <v-text-field
                  :rules="donRules"
                  v-model="dataOutlay[0].outlayQuantity"
                  label="Quantity needed"
                  class="create__outlay-cell create__outlay-cell--quantity"
                  >
                </v-text-field>
                <v-text-field
                  type="number"
                  v-model="dataOutlay[0].outlayPrice"
                  label="Price of 1 item"
                  class="create__outlay-cell create__outlay-cell--price"
                  >
                </v-text-field>
                <div class="create__outlay-cell create__outlay-cell--sum">
                  <span>Sum</span>
                  <span>{{multiplication(dataOutlay[0].outlayQuantity, dataOutlay[0].outlayPrice)}}</span>
                </div>
              </div>
              <v-btn v-if="btnShow" class="create__outlay--add" @click="showNextResource">Add Resource 2<v-icon medium>keyboard_arrow_down</v-icon>
              </v-btn>
            </div>

            <div class="create__outlay-resource--base">
              <div class="create__outlay-item create__outlay-item--2">
                <v-text-field
                  label="Name"
                  v-model="dataOutlay[1].outlayName"
                  class="create__outlay-cell create__outlay-cell--name"
                  >
                </v-text-field>
                <v-text-field
                  v-model="dataOutlay[1].outlayQuantity"
                  label="Quantity needed"
                  class="create__outlay-cell create__outlay-cell--quantity"
                  >
                </v-text-field>
                <v-text-field
                  v-model="dataOutlay[1].outlayPrice"
                  label="Price of 1 item"
                  class="create__outlay-cell create__outlay-cell--price"
                  >
                </v-text-field>
                <div class="create__outlay-cell create__outlay-cell--sum">
                  <span>Sum</span>
                  <span>{{multiplication(dataOutlay[1].outlayQuantity, dataOutlay[1].outlayPrice)}}</span>
                </div>
              </div>
              <v-btn class="create__outlay--add" @click="showNextResource">Add Resource 3<v-icon medium>keyboard_arrow_down</v-icon></v-btn>
            </div>

            <div class="create__outlay-resource--base">
              <div class="create__outlay-item create__outlay-item--3">
                <v-text-field
                  label="Name"
                  v-model="dataOutlay[2].outlayName"
                  class="create__outlay-cell create__outlay-cell--name"
                  >
                </v-text-field>
                <v-text-field
                  v-model="dataOutlay[2].outlayQuantity"
                  label="Quantity needed"
                  class="create__outlay-cell create__outlay-cell--quantity"
                  >
                </v-text-field>
                <v-text-field
                  v-model="dataOutlay[2].outlayPrice"
                  label="Price of 1 item"
                  class="create__outlay-cell create__outlay-cell--price"
                  >
                </v-text-field>
                <div class="create__outlay-cell create__outlay-cell--sum">
                  <span>Sum</span>
                  <span>{{multiplication(dataOutlay[2].outlayQuantity, dataOutlay[2].outlayPrice)}}</span>
                </div>
              </div>
              <v-btn  class="create__outlay--add" @click="showNextResource">Add Resource 4<v-icon medium>keyboard_arrow_down</v-icon></v-btn>
            </div>

            <div class="create__outlay-resource--base">
              <div class="create__outlay-item create__outlay-item--4">
                <v-text-field
                  label="Name"
                  v-model="dataOutlay[3].outlayName"
                  class="create__outlay-cell create__outlay-cell--name"
                  >
                </v-text-field>
                <v-text-field
                  v-model="dataOutlay[3].outlayQuantity"
                  label="Quantity needed"
                  class="create__outlay-cell create__outlay-cell--quantity"
                  >
                </v-text-field>
                <v-text-field
                  v-model="dataOutlay[3].outlayPrice"
                  label="Price of 1 item"
                  class="create__outlay-cell create__outlay-cell--price"
                  >
                </v-text-field>
                <div class="create__outlay-cell create__outlay-cell--sum">
                  <span>Sum</span>
                  <span>{{multiplication(dataOutlay[3].outlayQuantity , dataOutlay[3].outlayPrice )}}</span>
                </div>
              </div>
              <v-btn class="create__outlay--add" @click="showNextResource">Add Resource 5
                <v-icon medium>keyboard_arrow_down</v-icon></v-btn>
            </div>

            <div class="create__outlay-resource--base">
              <div class="create__outlay-item create__outlay-item--5">
                <v-text-field
                  label="Name"
                  v-model="dataOutlay[4].outlayName"
                  class="create__outlay-cell create__outlay-cell--name"
                  >
                </v-text-field>
                <v-text-field
                  v-model="dataOutlay[4].outlayQuantity"
                  label="Quantity needed"
                  class="create__outlay-cell create__outlay-cell--quantity"
                  >
                </v-text-field>
                <v-text-field
                  v-model="dataOutlay[4].outlayPrice"
                  label="Price of 1 item"
                  class="create__outlay-cell create__outlay-cell--price"
                  >
                </v-text-field>
                <div class="create__outlay-cell create__outlay-cell--sum">
                  <span>Sum</span>
                  <span>{{multiplication(dataOutlay[4].outlayQuantity, dataOutlay[4].outlayPrice)}}</span>
                </div>
              </div>
              <!-- <v-btn class="create__outlay--add" @click="res5 = !res5">Add/Hide Resource</v-btn> -->
            </div>
          <!-- </div> -->
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
        btnShow: true,
        dialog: false,
        res2: false,
        res3: false,
        res4: false,
        res5: false,
        dataOutlay: [
          {
            outlayQuantity: '',
            outlayPrice: '',
            outlayName: ''
          },
          {
            outlayQuantity: '',
            outlayPrice: '',
            outlayName: ''
          },
          {
            outlayQuantity: '',
            outlayPrice: '',
            outlayName: ''
          },
          {
            outlayQuantity: '',
            outlayPrice: '',
            outlayName: ''
          },
          {
            outlayQuantity: '',
            outlayPrice: '',
            outlayName: ''
          }
        ],
        donRules: [
          v => !!v || 'Enter project title',
          v => (v && v.length >= 6) || 'Title must be at least 6 characters'
        ],
      }
    },
    // computed: {
    // },
    methods: {
      showNextResource(event) {
        const target = event.target
        const resource = target.parentNode.parentNode.nextSibling
        resource.classList.toggle('create__outlay-resource--show')
        target.parentNode.style.display = 'none'
      },
      saveOutlay(){
        // const dataOutlay = {
        //   outlayName1: this.outlayName1,
        //   outlayQuantity1: this.outlayQuantity1,
        //   outlayPrice1: this.outlayPrice1,
        //   outlayQuantity2: this.outlayQuantity2,
        //   outlayPrice2: this.outlayPrice2,
        //   outlayName2: this.outlayName2,
        //   outlayQuantity3: this.outlayQuantity3,
        //   outlayPrice3: this.outlayPrice3,
        //   outlayName3: this.outlayName3,
        //   outlayQuantity4: this.outlayQuantity4,
        //   outlayPrice4: this.outlayPrice4,
        //   outlayName4: this.outlayName4,
        //   outlayQuantity5: this.outlayQuantity5,
        //   outlayPrice5: this.outlayPrice5,
        //   outlayName5: this.outlayName5
        // }
        this.$store.dispatch("editProject", {
          dataOutlay: this.dataOutlay,
          id: this.project.id
        })
        this.dialog = false
      },
      multiplication(num, price) {
        return num * price
      }
     },
    created(){
      let data = this.project.dataOutlay
      if (data) {
        for (let i = 0; i < 5; i++) {
          if (data[i]) {
            if (data[i].outlayName) {
              this.dataOutlay[i].outlayName = data[i].outlayName
            }
            if (data[i].outlayQuantity) {
              this.dataOutlay[i].outlayQuantity = data[i].outlayQuantity
            }
            if (data[i].outlayPrice) {
              this.dataOutlay[i].outlayPrice = data[i].outlayPrice
            }
          }
        }
      }
      // if(this.project.dataOutlay){
      //   let data = this.project.dataOutlay
      //   this.outlayName1 = data.outlayName1 ? data.outlayName1 : ""
      //   this.outlayQuantity1 = data.outlayQuantity1 ? data.outlayQuantity1 : ""
      //   this.outlayPrice1 = data.outlayPrice1 ? data.outlayPrice1 : ""
      //   this.outlayName2 = data.outlayName2 ? data.outlayName2 : ""
      //   this.outlayQuantity2 = data.outlayQuantity2 ? data.outlayQuantity2 : ""
      //   this.outlayPrice2 = data.outlayPrice2 ? data.outlayPrice2 : ""
      //   this.outlayName3 = data.outlayName3 ? data.outlayName3 : ""
      //   this.outlayQuantity3 = data.outlayQuantity3 ? data.outlayQuantity3 : ""
      //   this.outlayPrice3 = data.outlayNPrice3 ? data.outlayPrice3 : ""
      //   this.outlayName4 = data.outlayName4 ? data.outlayName4 : ""
      //   this.outlayQuantity4 = data.outlayQuantity4 ? data.outlayQuantity4 : ""
      //   this.outlayPrice4 = data.outlayPrice4 ? data.outlayPrice4 : ""
      //   this.outlayName5 = data.outlayName5 ? data.outlayName5 : ""
      //   this.outlayQuantity5 = data.outlayQuantity5 ? data.outlayQuantity5 : ""
      //   this.outlayPrice5 = data.outlayPrice5 ? data.outlayPrice5 : ""
      // }
      // this.$store.dispatch('loadProjects')
    }
};
</script>
