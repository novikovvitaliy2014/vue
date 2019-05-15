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
          <span class="headline">Edit Project</span>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Title"
            v-model="editedTitle">
          </v-text-field>
          <v-text-field label="Description"
            v-model="editedDescription">
          </v-text-field>
          <section>
            <v-btn raised class="green" @click="onPickFile1">Upload New Image 1</v-btn>
            <input
              type="file"
              style="display: none"
              ref="fileInput_1"
              accept="image/*"
              @change="onFilePicked_1">
          </section>
          <p>{{ msgFileMax1 }}</p>
          <v-img
             :src="editedUrl_1"
             aspect-ratio="1.618"
             alt="current-view"
             >
          </v-img>
          <section>
            <v-btn raised class="green" @click="onPickFile2">Upload New Image 2</v-btn>
            <input
              type="file"
              style="display: none"
              ref="fileInput_2"
              accept="image/*"
              @change="onFilePicked_2">
          </section>
          <p>{{ msgFileMax2 }}</p>
          <v-img
             :src="editedUrl_2"
             aspect-ratio="1.618"
             alt="project-view"
             >
          </v-img>
          <!-- <outlay-form-edit @send-data="takeDataoutlay" :project="project"></outlay-form-edit> -->

          <!-- <final-outlay-form @send-data="takeDataoutlayFinal" @send-base-urls="takeBaseUrls" :project="project" ></final-outlay-form> -->
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="green darken-1" flat @click="onSaveEdit" ref="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import FinalOutlayForm from './FinalOutlayForm.vue'
import OutlayFormEdit from './OutlayFormEdit.vue'
  export default {
    components: {
      "final-outlay-form": FinalOutlayForm,
      "outlay-form-edit": OutlayFormEdit
    },
    props: {
      project: Object
    },
    data () {
      return {
        msgFileMax1: "",
        msgFileMax2: "",
        baseUrls: [],
        editedImages: [],
        dialog: false,
        editedTitle: this.project.title,
        editedDescription: this.project.description,
        editedUrl_1: '',
        editedUrl_2: '',
        // dataOutlay: {},
        // dataoutlayFinal: {}
      }
    },
    computed: {
    },
    // mounted () {
    //    this.$on('send-data', (data) => {
    //      this.dataoutlayFinal = data.dataFinal
    //     this.baseUrls[0] = data.url_F1
    //     this.baseUrls[1] = data.url_F2
    //    })
    //    console.log(this.dataoutlayFinal)
    // },
    methods: {
      // takeDataOutlay(data){
      //   this.dataOutlay = data
      //   console.log(this.dataOutlay)
      // },
      // takeDataoutlayFinal(data){
      //   this.dataoutlayFinal = data
      //   // this.baseUrls = data.baseUrls
      //   // this.baseUrls[1] = data.url_F2
      //   console.log(this.dataoutlayFinal)
      //   // console.log(this.baseUrls)
      // },
      // takeBaseUrls(data){
      //   this.baseUrls[0] = data.url_F1
      //   this.baseUrls[1] = data.url_F2
      //   console.log(this.baseUrls)
      // },
      checkField(){
        if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '' ){
          return
        }
        this.dialog = false
      },
      editProject(){
        this.$store.dispatch("editProject", {
          title: this.editedTitle,
          description: this.editedDescription,
          dataOutlay: this.dataOutlay,
          dataFinal: this.dataoutlayFinal,
          editedImages: this.editedImages,
          id: this.project.id
        })
        this.dialog = false
        // this.editedUrls[0] = this.edited
        this.$emit("imageUrl", {
          url_1: this.editedUrl_1,
          url_2: this.editedUrl_2,
          // editedUrls: this.editedUrls,
          // urlBase1: this.dataoutlayFinal.url_F1,
          // urlBase2: this.dataoutlayFinal.url_F2,
          // baseUrls: this.baseUrls
        })
        // console.log(this.baseUrls)
        // this.$emit("imagesFinal", { url_F1:this.editedUrl_1, url_F2:this.editedUrl_2 })
        // this.$store.dispatch("editProjectImage", {
        //   image: this.editedImage,
        //   id: this.project.id
        // })
      },
      // takeFinalData(){
      //   this.$parent.$refs.finish.click()
      // },
      async onSaveEdit() {
        try {
          // await this.takeFinalData()
          await this.checkField()
          // await this.editUser();
          await this.editProject()
        } catch (e) {
            alert("Error" + e)
        }
      },
      onPickFile1(){
        this.$refs.fileInput_1.click()
      },
      onPickFile2(){
        this.$refs.fileInput_2.click()
      },
      onFilePicked_1(event){
        const file = event.target.files[0]
        if(file){
          if(file.size < 205000){
            this.editedImages[0] = file
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
              const result = fileReader.result
              this.editedUrl_1 = result
            })
            fileReader.readAsDataURL(file)
            this.msgFileMax1 = ""
          } else {
            this.msgFileMax1 = "Maximum file size is 200Kb, please upload another file"
          }
        } else {
            this.msgFileMax1 = "New file is not uploaded"
        }
      },
      onFilePicked_2(event){
        const file = event.target.files[0]
        if(file){
          if(file.size < 205000){
            this.editedImages[1] = file
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
              const result = fileReader.result
              this.editedUrl_2 = result
            })
            fileReader.readAsDataURL(file)
            this.msgFileMax2 = ""
          } else {
            this.msgFileMax2 = "Maximum file size is 200Kb, please upload another file"
          }
        } else {
            this.msgFileMax2 = "New file is not uploaded"
        }
      }
    },
    created(){
      console.log(this.project)
      // let pro = this.project.projectImages
      // this.editedUrl_1 = pro ? pro[0] : ""
      // this.editedUrl_2 = pro ? pro[1] : ""
      let pro = this.project.projectImages
      if(pro){
        if (pro[0]){
          this.editedUrl_1 = pro[0].imageUrl
        }
        if (pro[1]){
          this.editedUrl_2 = pro[1].imageUrl
        }
      }
      // this.editedUrl_1 = this.editedUrls[0]
      // this.editedUrl_2 = this.editedUrls[1]
      // if (this.project.projectImages){
      //   this.editedUrls = []
      //   let pro = this.project.projectImages
      //   for (let i=0; i<pro.length; i++){
      //     this.editedUrls.push(pro[i])
      //   }
      // }
      // console.log(this.editedUrls)
    }
  };
</script>
