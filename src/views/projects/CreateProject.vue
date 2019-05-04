<template>
  <div class="create">
    <h4>Create Project</h4>
    <v-form @submit.prevent = "onSubmit"
      ref="form"
      id="create"
      v-model="valid"
      lazy-validation
      method="post"
      action="/submit"
      >
      <v-text-field
        label="Title"
        id="title"
        :rules="titleRules"
        class="create__title"
        v-model='title'
        required>
      </v-text-field>
      <v-text-field
        type="text"
        label="Create unique Project ID - 6 characters"
        id="projectId"
        :rules="projectIdRules"
        v-model='projectId'

        required>
      </v-text-field>
      <p v-if="projectIdExist" class="create__id-exist ">Please, change ID. This ID already exists.</p>
      <v-textarea
        label="Description"
        id="description"
        class="create__description"
        :rules="titleRules"
        v-model='description'
        multi-line
        required>
      </v-textarea>
      <section class="create__uploads">
        <section>
          <button type="button" raised class="create__upload-btn" @click="onPickFile1">Upload Image 1</button>
          <input
            type="file"
            style="display: none"
            ref="fileInput1"
            accept="image/*"
            multiple
            @change="onFilePicked_1">
          <div class="create__img">
            <img :src="url_1" alt="">
          </div>
        </section>

        <section>
          <button type="button" raised class="create__upload-btn" @click="onPickFile2">Upload Image 2</button>
          <input
            type="file"
            style="display: none"
            ref="fileInput2"
            accept="image/*"
            @change="onFilePicked_2">
          <div class="create__img">
            <img :src="url_2" alt="">
          </div>
        </section>
      </section>
      <section class="create__pickers">
        <v-date-picker v-model="date"
          class="mt-2">
        </v-date-picker>
        <v-time-picker
          v-model="time"
          class="mt-2"
          format="24hr"
          >
        </v-time-picker>
      </section>
      <smeta-form @send-data="sendData" :projectId="projectId"></smeta-form>
      <!-- <h4>Smeta</h4>
      <section class="create__smeta">
        <div class="create__smeta-resource">
          <div class="create__smeta-item create__smeta-item--1">
            <v-text-field
              label="Name"
              v-model="smetaName1"
              class="create__smeta-cell create__smeta-cell--name"
              >
            </v-text-field>
            <v-text-field
              v-model="smetaQuantity1"
              label="Quantity needed"
              class="create__smeta-cell create__smeta-cell--quantity"
              >
            </v-text-field>
            <v-text-field
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
      <!--   </div>
      </section>  -->
      <!-- <final-smeta @send-data="sendData"></final-smeta> -->
      <!-- <button
        color="green"
        :disabled="!valid || projectIdExist"
        type="submit"
        class="btn">
        Create Project
      </button> -->
    </v-form>
    <!-- <p v-if="error">
      Check again, something is wrong!
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
  </div>
</template>
<script>
import SmetaForm from './../../components/dialogs/SmetaForm.vue'
  export default {
    components: {
      "smeta-form": SmetaForm
    },
    data() {
      return {
        valid: false,
        title: '',
        projectId: null,
        description: '',
        url_1: '',
        url_2: '',
        images: [],
        titleRules: [
        v => !!v || 'Enter project title',
        v => (v && v.length >= 6) || 'Title must be at least 6 characters'
        ],
        projectIdRules: [
        v => !!v || 'Enter project ID',
        v => (v && v.length >= 6) || 'ID must be at least 6 numbers'
        ],
        picker: new Date().toISOString().substr(0, 10),
        date: new Date().toISOString().substr(0, 10),
        time: new Date(),
        projectId: '',
        data: {}
        // error: false,
        // success: false
      }
    },
    computed: {
      submittableDateTime () {
        const date = new Date(this.date)
        if(typeof this.time ==='string') {
          let hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        console.log(date)
        return date
      },
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
      sendData(data){
        this.data = data
        console.log(this.data)
      },
      // addResource(n){
      //   this.resources[n] = n
      //   console.log(this.resources[n])
      // },
      multiplication(num, price) {
        return num * price
      },
      onSubmit() {
        const title = this.title
        const projectId = this.projectId
        const description = this.description
        const images = this.images
        const date = this.submittableDateTime
        // const smetaQuantity1 = this.smetaQuantity1
        // const smetaPrice1 = this.smetaPrice1
        // const smetaName1 = this.smetaName1
        // const smetaQuantity2 = this.smetaQuantity2
        // const smetaPrice2 = this.smetaPrice2
        // const smetaName2 = this.smetaName2
        // const smetaQuantity3 = this.smetaQuantity3
        // const smetaPrice3 = this.smetaPrice3
        // const smetaName3 = this.smetaName3
        // const smetaQuantity4 = this.smetaQuantity4
        // const smetaPrice4 = this.smetaPrice4
        // const smetaName4 = this.smetaName4
        // const smetaQuantity5 = this.smetaQuantity5
        // const smetaPrice5 = this.smetaPrice5
        // const smetaName5 = this.smetaName5
        // const smetaName1F = this.smetaName1F
        const data = this.data

        const createData = {
          title,
          projectId,
          description,
          images,
          date,
          // smetaQuantity1,
          // smetaPrice1,
          // smetaName1,
          // smetaQuantity2,
          // smetaPrice2,
          // smetaName2,
          // smetaQuantity3,
          // smetaPrice3,
          // smetaName3,
          // smetaQuantity4,
          // smetaPrice4,
          // smetaName4,
          // smetaQuantity5,
          // smetaPrice5,
          // smetaName5,
          // smetaName1F,
          data
        }
        // if(!this.valid){
        //   return this.$store.state.error = true
        // } else {
        this.$store.dispatch('createProject', createData)
        // }
      },
      onPickFile1(){
        this.$refs.fileInput1.click()
      },
      onPickFile2(){
        this.$refs.fileInput2.click()
      },
      onFilePicked_1(event){
        const file = event.target.files[0]
        // const file_2 = event.target.files[1]
        // this.image_1 = file
        this.images[0] = file
        // this.image2 = file_2
        // let filename = files[0].name
        // if(filename.lastIndexOf('.') <=0 ) {
        //   return alert('please add a valid file!')
        // }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          const result = fileReader.result
          this.url_1 = result
        })
        fileReader.readAsDataURL(file)
        // fileReader.readAsDataURL(file_2)
        // const fileReader2 = new FileReader()
        // fileReader2.addEventListener('load', () => {
        //   this.url_2 = fileReader2.result
        // })
        // console.log(this.urls)
        // this.url_1 = this.urls[0]
        // this.url_2 = this.urls[1]
        // fileReader2.readAsDataURL(files[1])
      },
      onFilePicked_2(event){
        const file = event.target.files[0]
        this.images[1] = file
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          const result = fileReader.result
          this.url_2 = result
        })
        fileReader.readAsDataURL(file)
      }
    },
    created(){
      this.$store.dispatch('loadProjects')
      this.$store.state.success = false
      this.$store.state.error = false
      // this.$store.dispatch('tryAutoSignin')
    }
  };
</script>
