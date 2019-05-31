<template>
  <section class="create__outlay">
    <h4>Outlay</h4>
    <div class="create__outlay-resource">
      <div class="create__outlay-item create__outlay-item--1">
        <v-text-field
          label="Name"
          v-model="dataOutlay[0].outlayName"
          class="create__outlay-cell create__outlay-cell--name"
          >
        </v-text-field>
        <v-text-field
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
      <v-btn v-if="!res2" class="create__outlay--add" @click="res2 = true">Add Resource 2<v-icon medium>keyboard_arrow_down</v-icon></v-btn>
    </div>

    <div v-if="res2">
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
      <v-btn v-if="!res3" class="create__outlay--add" @click="res3 = true">Add Resource<v-icon medium>keyboard_arrow_down</v-icon></v-btn>
    </div>

    <div v-if="res3">
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
      <v-btn v-if="!res4" class="create__outlay--add" @click="res4 = true">Add Resource<v-icon medium>keyboard_arrow_down</v-icon></v-btn>
    </div>

    <div v-if="res4">
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
          <span>{{multiplication(dataOutlay[3].outlayQuantity, dataOutlay[3].outlayPrice)}}</span>
        </div>
      </div>
      <v-btn v-if="!res5" class="create__outlay--add" @click="res5 = true">Add Resource
        <v-icon medium>keyboard_arrow_down</v-icon></v-btn>
    </div>

    <div v-if="res5">
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
    <button
        color="green"
        @click="sendData"
        :disabled="projectIdExist || valid"
        type="submit"
        class="btn">
        Create Project
      </button>
      <v-alert
        dismissible
        error
        :value="true"
        class="alert__error"
        v-if="error"
        >
        Check again, something is wrong!
      </v-alert>
      <!-- <p v-if="error">

      </p> -->
      <v-alert
        dismissible
        type="success"
        :value="true"
        v-if="success"
        >
        Your project is uploaded to the list of Private Projects!
      </v-alert>
      <router-link to="/private-projects"
         tag="a"
         v-if="success"
         class="create__link-to-projects"
         >
      Private Projects
      </router-link>
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
    computed: {
      error() {
        return this.$store.getters.error
      },
      success() {
        return this.$store.getters.success
      },
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
        const dataOutlay = this.dataOutlay
        this.$emit('send-data', dataOutlay)
      },
      multiplication(num, price) {
        return num * price
      }
     },
    created(){
      this.$store.commit('setError',{status: false})
      this.$store.commit('setSuccess',{status: false})
      // this.$store.state.success = false
      // this.$store.state.error = false

      // this.$store.dispatch('loadProjects')
    }
};
</script>


