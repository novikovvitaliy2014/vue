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
          <span class="headline">Edit Final Photos</span>
        </v-card-title>
        <v-card-text>
          <div>
            <section>
              <button type="button" raised class="create__upload-btn" @click="onPickFile1">Upload Photo 1</button>
              <input
                type="file"
                style="display: none"
                ref="fileInput1"
                accept="image/*"
                @change="onFilePicked_1">
              <p>{{ msgFileMax1 }}</p>
              <div class="create__img">
                <v-img
                   :src="url_F1"
                   aspect-ratio="1.618"
                   alt="final-photo-1"
                   >
                </v-img>
              </div>
            </section>

            <section>
              <button type="button" raised class="create__upload-btn" @click="onPickFile2">Upload Photo 2</button>
              <input
                type="file"
                style="display: none"
                ref="fileInput2"
                accept="image/*"
                @change="onFilePicked_2">
              <p>{{ msgFileMax2 }}</p>
              <div class="create__img">
                <v-img
                   :src="url_F2"
                   aspect-ratio="1.618"
                   alt="final-photo-1"
                   >
                </v-img>
              </div>
            </section>

            <section>
              <button type="button" raised class="create__upload-btn" @click="onPickFile3">Upload Photo 3</button>
              <input
                type="file"
                style="display: none"
                ref="fileInput3"
                accept="image/*"
                @change="onFilePicked_3">
              <p>{{ msgFileMax3 }}</p>
              <div class="create__img">
                <v-img
                   :src="url_F3"
                   aspect-ratio="1.618"
                   alt="final-photo-1"
                   >
                </v-img>
              </div>
            </section>

            <section>
              <button type="button" raised class="create__upload-btn" @click="onPickFile4">Upload Photo 4</button>
              <input
                type="file"
                style="display: none"
                ref="fileInput4"
                accept="image/*"
                @change="onFilePicked_4">
              <p>{{ msgFileMax4 }}</p>
              <div class="create__img">
                <v-img
                   :src="url_F4"
                   aspect-ratio="1.618"
                   alt="final-photo-1"
                   >
                </v-img>
              </div>
            </section>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="green darken-1" flat @click="saveFinalPhotos">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
// import FinaloutlayForm from './FinaloutlayForm.vue'
  export default {
    components: {
      // "final-outlay-form": FinaloutlayForm,
    },
    props: {
      project: Object
    },
    data () {
      return {
        dialog: false,
        msgFileMax1: "",
        msgFileMax2: "",
        msgFileMax3: "",
        msgFileMax4: "",
        url_F1: '',
        url_F2: '',
        url_F3: '',
        url_F4: '',
        images: [],
        // dataPhotos: {},
        baseUrls: []
      }
    },
    computed: {
    },
    methods: {
      updateUrlsOnBase(){
        // this.baseUrls[0] = this.url_F1,
        // this.baseUrls[1] = this.url_F2,
        // this.baseUrls[2] = this.url_F3,
        // this.baseUrls[3] = this.url_F4
      },
      emitBaseUrls(){
        // this.baseUrls[0] = this.url_F1,
        // this.baseUrls[1] = this.url_F2,
        // this.baseUrls[2] = this.url_F3,
        // this.baseUrls[3] = this.url_F4
        setTimeout(() => {
          this.$emit("photoBaseUrl", {
            baseUrls_1: this.url_F1,
            baseUrls_2: this.url_F2,
            baseUrls_3: this.url_F3,
            baseUrls_4: this.url_F4,
          })
        }, 1000)
        // console.log()
      },
      async saveFinalPhotos(){
        try {
          // await this.updateUrlsOnBase()
          console.log("updateUrls")
          this.emitBaseUrls()
          console.log("emit Urls")
          this.$store.dispatch("editProject", {
            dataPhotos: this.images,
            id: this.project.id
          })
          this.dialog = false
        } catch (e) {
            console.log(e)
        }

      },
      onPickFile1(){
        this.$refs.fileInput1.click()
      },
      onPickFile2(){
        this.$refs.fileInput2.click()
      },
      onPickFile3(){
        this.$refs.fileInput3.click()
      },
      onPickFile4(){
        this.$refs.fileInput4.click()
      },
      onFilePicked_1(event){
        const file = event.target.files[0]
        if(file){
          if(file.size < 205000){
            this.images[0] = file
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
              const result = fileReader.result
              this.url_F1 = result
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
            this.images[1] = file
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
              const result = fileReader.result
              this.url_F2 = result
            })
            fileReader.readAsDataURL(file)
            this.msgFileMax2 = ""
          } else {
            this.msgFileMax2 = "Maximum file size is 200Kb, please upload another file"
          }
        } else {
            this.msgFileMax2 = "New file is not uploaded"
        }
      },
      onFilePicked_3(event){
        const file = event.target.files[0]
        if(file){
          if(file.size < 205000){
            this.images[2] = file
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
              const result = fileReader.result
              this.url_F3 = result
            })
            fileReader.readAsDataURL(file)
            this.msgFileMax3 = ""
          } else {
            this.msgFileMax3 = "Maximum file size is 200Kb, please upload another file"
          }
        } else {
            this.msgFileMax3 = "New file is not uploaded"
        }
      },
      onFilePicked_4(event){
        const file = event.target.files[0]
        if(file){
          if(file.size < 205000){
            this.images[3] = file
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
              const result = fileReader.result
              this.url_F4 = result
            })
            fileReader.readAsDataURL(file)
            this.msgFileMax4 = ""
          } else {
            this.msgFileMax4 = "Maximum file size is 200Kb, please upload another file"
          }
        } else {
            this.msgFileMax4 = "New file is not uploaded"
        }
      }

    },
    created(){
      let img = this.project.dataPhotos

      if(img){
        if(img[0]) {
          this.url_F1 = img[0].imageUrl
        }
        if(img[1]) {
          this.url_F2 = img[1].imageUrl
        }
        if(img[2]) {
          this.url_F3 = img[2].imageUrl
        }
        if(img[3]) {
          this.url_F4 = img[3].imageUrl
        }
      }

    }
  };
</script>
