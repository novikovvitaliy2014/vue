<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="350px">
        <v-btn slot="activator" color="green" class="edit-button">
          <v-icon>edit</v-icon>
          <span>edit</span>
        </v-btn>
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
              @change="onFiles(0)">
          </section>
          <p>{{ msgFileMax_1 }}</p>
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
              @change="onFiles(1)">
          </section>
          <p>{{ msgFileMax_2 }}</p>
          <v-img
             :src="editedUrl_2"
             aspect-ratio="1.618"
             alt="project-view"
             >
          </v-img>
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
  export default {
    props: {
      project: Object
    },
    data () {
      return {
        msgFileMax_1: "",
        msgFileMax_2: "",
        messages: [],
        baseUrls: [],
        editedImages: [],
        dialog: false,
        editedTitle: this.project.title,
        editedDescription: this.project.description,
        editedUrl_1: '',
        editedUrl_2: '',
        editedUrls: []
        // dataOutlay: {},
        // dataoutlayFinal: {}
      }
    },
    methods: {
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
          // dataOutlay: this.dataOutlay,
          // dataFinal: this.dataoutlayFinal,
          editedImages: this.editedImages,
          id: this.project.id
        })
        this.dialog = false
        this.$emit("imageUrl", {
          url_1: this.editedUrl_1,
          url_2: this.editedUrl_2,
        })
      },
      async onSaveEdit() {
        try {
          await this.checkField()
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
      onFilesChange(image) {
        const file = event.target.files[0]
        if (file) {
          if (file.size < 205000) {
            this.editedImages[image] = file
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
              const result = fileReader.result
              this.editedUrls[image] = result
            })
            fileReader.readAsDataURL(file)
            this.messages[image] = ""
          } else {
            this.messages[image] = "Maximum file size is 200Kb, please upload another file"
          }
        } else {
          this.messages[image] = "New file is not uploaded"
        }
      },
       async onFiles(image) {
        try {
          await this.onFilesChange(image)
          console.log("change")
          await setTimeout(() => {
            this.urlsShow()
            this.messagesShow()
          }, 1000)
        } catch (e) {
          console.log(e)
        }
      },
      urlsShow() {
        this.editedUrl_1 = this.editedUrls[0]
        this.editedUrl_2 = this.editedUrls[1]
      },
      messagesShow() {
        this.msgFileMax_1 = this.messages[0]
        this.msgFileMax_2 = this.messages[1]
      },
      // onFilePicked_1(event){
      //   const file = event.target.files[0]
      //   if(file){
      //     if(file.size < 205000){
      //       this.editedImages[0] = file
      //       const fileReader = new FileReader()
      //       fileReader.addEventListener('load', () => {
      //         const result = fileReader.result
      //         this.editedUrl_1 = result
      //       })
      //       fileReader.readAsDataURL(file)
      //       this.msgFileMax_1 = ""
      //     } else {
      //       this.msgFileMax_1 = "Maximum file size is 200Kb, please upload another file"
      //     }
      //   } else {
      //       this.msgFileMax_1 = "New file is not uploaded"
      //   }
      // },
      // onFilePicked_2(event){
      //   const file = event.target.files[0]
      //   if(file){
      //     if(file.size < 205000){
      //       this.editedImages[1] = file
      //       const fileReader = new FileReader()
      //       fileReader.addEventListener('load', () => {
      //         const result = fileReader.result
      //         this.editedUrl_2 = result
      //       })
      //       fileReader.readAsDataURL(file)
      //       this.msgFileMax_2 = ""
      //     } else {
      //       this.msgFileMax_2 = "Maximum file size is 200Kb, please upload another file"
      //     }
      //   } else {
      //       this.msgFileMax_2 = "New file is not uploaded"
      //   }
      // }
    },
    created(){
      let pro = this.project.projectImages
      if(pro){
        if (pro[0]){
          this.editedUrl_1 = pro[0].imageUrl
        }
        if (pro[1]){
          this.editedUrl_2 = pro[1].imageUrl
        }
      }
    }
  };
</script>
