<template>
<!-- Как правильно сделать без использования SetTimeout например в таком случае ниже. Без него не работает, т.к. action авторизации во vuex завершается позже.
  async onSignin() {
    try {
      await this.authUser()
      await this.getUserData()
    } cath...

  authUser() {
    this.$store.dispatch('signin')
  }
  getUserData(){
    setTimeout(() => {
      this.$store.dispatch('getUserData')
    }, 1000)
  } -->


  <form @submit="onSubmit">
    <input>
    <app-extra-form></app-extra-form>
    <button type="submit">Send</button>
  </form>



  <section class="create__outlay">
    <h4>Outlay</h4>
    <!-- <p>{{project}}</p> -->
    <div class="create__outlay-resource">
      <div class="create__outlay-item create__outlay-item--1">
        <v-text-field
          label="Name"
          v-model="outlayName1"
          class="create__outlay-cell create__outlay-cell--name"
          >
        </v-text-field>
        <v-text-field
          v-model="outlayQuantity1"
          label="Quantity needed"
          class="create__outlay-cell create__outlay-cell--quantity"
          >
        </v-text-field>
        <v-text-field
          v-model="outlayPrice1"
          label="Price of 1 item"
          class="create__outlay-cell create__outlay-cell--price"
          >
        </v-text-field>
        <div class="create__outlay-cell create__outlay-cell--sum">
          <span>Sum</span>
          <span>{{multiplication(outlayQuantity1, outlayPrice1)}}</span>
        </div>
      </div>
      <v-btn v-if="!res2" class="create__outlay--add" @click="res2 = true">Add Resource 2<v-icon medium>keyboard_arrow_down</v-icon></v-btn>
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
      <v-btn v-if="!res3" class="create__outlay--add" @click="res3 = true">Add Resource 3<v-icon medium>keyboard_arrow_down</v-icon></v-btn>
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
      <v-btn v-if="!res4" class="create__outlay--add" @click="res4 = true">Add Resource 4<v-icon medium>keyboard_arrow_down</v-icon></v-btn>
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
      <v-btn v-if="!res5" class="create__outlay--add" @click="res5 = true">Add Resource 5
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
    <button
      color="green"
      @click="sendData"
      class="btn">
      Send Form
    </button>
      <!-- :disabled="!valid || projectIdExist" -->
  </section>
</template>

<script>
  export default {
    props: {
      project:Object
    },
    data() {
      return {
        // data: {},
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
        // outlayName1F: '',
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
    },
    methods: {
      sendData(){
        this.$emit('send-data', {
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
      if(this.project.data){
        let data = this.project.data
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


