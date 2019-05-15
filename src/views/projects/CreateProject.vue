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
      <outlay-form @send-data="sendData" :projectId="projectId"></outlay-form>
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
import OutlayForm from './../../components/dialogs/OutlayForm.vue'
  export default {
    components: {
      "outlay-form": OutlayForm
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
        dataOutlay: {}
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
      multiplication(num, price) {
        return num * price
      },
      onSubmit() {
        const title = this.title
        const projectId = this.projectId
        const description = this.description
        const images = this.images
        const date = this.submittableDateTime
        const dataOutlay = this.dataOutlay
        const createData = {
          title,
          projectId,
          description,
          images,
          date,
          dataOutlay
        }
        // this.createAndResize(createData)
        this.$store.dispatch('createProject', createData)
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
