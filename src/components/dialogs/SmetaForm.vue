<template>
  <section class="create__smeta">
    <h4>Smeta</h4>
    <div class="create__smeta-resource">
      <div class="create__smeta-item create__smeta-item--1">
        <v-text-field
          label="Name"
          v-model="smetaName1"
          class="create__smeta-cell create__smeta-cell--name"
          >
        </v-text-field>
        <v-text-field
          :rules="donRules"
          v-model="smetaQuantity1"
          label="Quantity needed"
          class="create__smeta-cell create__smeta-cell--quantity"
          >
        </v-text-field>
        <v-text-field
          type="number"
          v-model="smetaPrice1"
          label="Price of 1 item"
          class="create__smeta-cell create__smeta-cell--price"
          >
        </v-text-field>
        <div class="create__smeta-cell create__smeta-cell--sum">
          <span>Sum</span>
          <span>{{multiplication(smetaQuantity1, smetaPrice1)}}</span>
        </div>
      </div>
      <v-btn v-if="!res2" class="create__smeta--add" @click="res2 = true">Add Resource<v-icon medium>keyboard_arrow_down</v-icon></v-btn>
    </div>

    <div v-if="res2">
      <div class="create__smeta-item create__smeta-item--2">
        <v-text-field
          label="Name"
          v-model="smetaName2"
          class="create__smeta-cell create__smeta-cell--name"
          >
        </v-text-field>
        <v-text-field
          v-model="smetaQuantity2"
          label="Quantity needed"
          class="create__smeta-cell create__smeta-cell--quantity"
          >
        </v-text-field>
        <v-text-field
          v-model="smetaPrice2"
          label="Price of 1 item"
          class="create__smeta-cell create__smeta-cell--price"
          >
        </v-text-field>
        <div class="create__smeta-cell create__smeta-cell--sum">
          <span>Sum</span>
          <span>{{multiplication(smetaQuantity2, smetaPrice2)}}</span>
        </div>
      </div>
      <v-btn v-if="!res3" class="create__smeta--add" @click="res3 = true">Add Resource<v-icon medium>keyboard_arrow_down</v-icon></v-btn>
    </div>

    <div v-if="res3">
      <div class="create__smeta-item create__smeta-item--3">
        <v-text-field
          label="Name"
          v-model="smetaName3"
          class="create__smeta-cell create__smeta-cell--name"
          >
        </v-text-field>
        <v-text-field
          v-model="smetaQuantity3"
          label="Quantity needed"
          class="create__smeta-cell create__smeta-cell--quantity"
          >
        </v-text-field>
        <v-text-field
          v-model="smetaPrice3"
          label="Price of 1 item"
          class="create__smeta-cell create__smeta-cell--price"
          >
        </v-text-field>
        <div class="create__smeta-cell create__smeta-cell--sum">
          <span>Sum</span>
          <span>{{multiplication(smetaQuantity3, smetaPrice3)}}</span>
        </div>
      </div>
      <v-btn v-if="!res4" class="create__smeta--add" @click="res4 = true">Add Resource<v-icon medium>keyboard_arrow_down</v-icon></v-btn>
    </div>

    <div v-if="res4">
      <div class="create__smeta-item create__smeta-item--4">
        <v-text-field
          label="Name"
          v-model="smetaName4"
          class="create__smeta-cell create__smeta-cell--name"
          >
        </v-text-field>
        <v-text-field
          v-model="smetaQuantity4"
          label="Quantity needed"
          class="create__smeta-cell create__smeta-cell--quantity"
          >
        </v-text-field>
        <v-text-field
          v-model="smetaPrice4"
          label="Price of 1 item"
          class="create__smeta-cell create__smeta-cell--price"
          >
        </v-text-field>
        <div class="create__smeta-cell create__smeta-cell--sum">
          <span>Sum</span>
          <span>{{multiplication(smetaQuantity4, smetaPrice4)}}</span>
        </div>
      </div>
      <v-btn v-if="!res5" class="create__smeta--add" @click="res5 = true">Add Resource
        <v-icon medium>keyboard_arrow_down</v-icon></v-btn>
    </div>

    <div v-if="res5">
      <div class="create__smeta-item create__smeta-item--5">
        <v-text-field
          label="Name"
          v-model="smetaName5"
          class="create__smeta-cell create__smeta-cell--name"
          >
        </v-text-field>
        <v-text-field
          v-model="smetaQuantity5"
          label="Quantity needed"
          class="create__smeta-cell create__smeta-cell--quantity"
          >
        </v-text-field>
        <v-text-field
          v-model="smetaPrice5"
          label="Price of 1 item"
          class="create__smeta-cell create__smeta-cell--price"
          >
        </v-text-field>
        <div class="create__smeta-cell create__smeta-cell--sum">
          <span>Sum</span>
          <span>{{multiplication(smetaQuantity5, smetaPrice5)}}</span>
        </div>
      </div>
      <!-- <v-btn class="create__smeta--add" @click="res5 = !res5">Add/Hide Resource</v-btn> -->
    </div>
    <button
        color="green"
        @click="sendData"
        :disabled="projectIdExist"
        type="submit"
        class="btn">
        Create Project
      </button>
      <!-- :disabled="!valid || projectIdExist" -->
  </section>
</template>

<script>
  export default {
    props: ["projectId"],

    data() {
      return {
        // data: {},
        res2: false,
        res3: false,
        res4: false,
        res5: false,
        smetaQuantity1: '',
        smetaPrice1: '',
        smetaName1: '',
        smetaQuantity2: '',
        smetaPrice2: '',
        smetaName2: '',
        smetaQuantity3: '',
        smetaPrice3: '',
        smetaName3: '',
        smetaQuantity4: '',
        smetaPrice4: '',
        smetaName4: '',
        smetaQuantity5: '',
        smetaPrice5: '',
        smetaName5: '',
        smetaName1F: '',
        // valid: false,
        // title: '',
        // projectId: null,
        // description: '',
        // images: [],
        // titleRules: [
        // v => !!v || 'Enter project title',
        // v => (v && v.length >= 6) || 'Title must be at least 6 characters'
        // ],
        // projectIdRules: [
        // v => !!v || 'Enter project ID',
        // v => (v && v.length >= 6) || 'ID must be at least 6 numbers'
        // ],
        // picker: new Date().toISOString().substr(0, 10),
        // date: new Date().toISOString().substr(0, 10),
        // time: new Date(),
        // projectId: '',

        // error: false,
        // success: false
      }
    },
    computed: {
      // error() {
      //   return this.$store.getters.error
      // },
      // success() {
      //   return this.$store.getters.success
      // },
      projects(){
        return this.$store.getters.projects
      },
      projectIdExist(){
        if(this.projectId){
          return this.projects.find((project) =>{
            return project.projectId === this.projectId
          })
        }
      }
    },
    methods: {
      sendData(){
        this.$emit('send-data', {
          smetaName1: this.smetaName1,
          smetaQuantity1: this.smetaQuantity1,
          smetaPrice1: this.smetaPrice1,
          smetaName1: this.smetaName1,
          smetaQuantity2: this.smetaQuantity2,
          smetaPrice2: this.smetaPrice2,
          smetaName2: this.smetaName2,
          smetaQuantity3: this.smetaQuantity3,
          smetaPrice3: this.smetaPrice3,
          smetaName3: this.smetaName3,
          smetaQuantity4: this.smetaQuantity4,
          smetaPrice4: this.smetaPrice4,
          smetaName4: this.smetaName4,
          smetaQuantity5: this.smetaQuantity5,
          smetaPrice5: this.smetaPrice5,
          smetaName5: this.smetaName5
          // images: this.images
        })
      },
      // sendData(data){
      //   this.data = data
      // },
      multiplication(num, price) {
        return num * price
      }
     },
    created(){
      // this.$store.dispatch('loadProjects')
    }
};
</script>


