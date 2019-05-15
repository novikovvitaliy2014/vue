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


          <!-- <final-outlay-form></final-outlay-form> -->
          <section class="create__outlay">
            <h4>Final outlay</h4>
            <div class="create__outlay-resource">
              <div class="create__outlay-item create__outlay-item--1">
                <v-text-field
                  label="Name"
                  v-model="outlayName1F"
                  class="create__outlay-cell create__outlay-cell--name"
                  >
                </v-text-field>
                <v-text-field
                  v-model="outlayQuantity1F"
                  label="Quantity needed"
                  class="create__outlay-cell create__outlay-cell--quantity"
                  >
                </v-text-field>
                <v-text-field
                  v-model="outlayPrice1F"
                  label="Price of 1 item"
                  class="create__outlay-cell create__outlay-cell--price"
                  >
                </v-text-field>
                <div class="create__outlay-cell create__outlay-cell--sum">
                  <span>Sum</span>
                  <span>{{multiplication(outlayQuantity1F, outlayPrice1F)}}</span>
                </div>
              </div>
              <div>
                <div>
                  <v-text-field
                    label="Name of Supplier or Worker"
                    v-model="outlayNameSupplier1"
                    class="create__outlay-cell"
                    >
                  </v-text-field>
                  <v-text-field
                    label="Contacts of Supplier or Worker"
                    v-model="outlayContactSupplier1"
                    class="create__outlay-cell"
                    >
                  </v-text-field>
                </div>
                <section>
                  <button type="button" raised class="create__upload-btn" @click="onPickFile1">Upload Photo Check</button>
                  <input
                    type="file"
                    style="display: none"
                    ref="fileInput1"
                    accept="image/*"
                    @change="onFilePicked_1">
                  <p>{{ msgFileMax1 }}</p>
                  <div class="create__img">
                    <img :src="url_F1" alt="">
                  </div>
                </section>
              </div>
              <v-btn v-if="!res2" class="create__outlay--add" @click="res2 = true">Add Resource
                <v-icon medium>keyboard_arrow_down</v-icon></v-btn>
            </div>
            <div class="create__outlay-resource" v-if="res2">
              <div class="create__outlay-item create__outlay-item--2">
                <v-text-field
                  label="Name"
                  v-model="outlayName2F"
                  class="create__outlay-cell create__outlay-cell--name"
                  >
                </v-text-field>
                <v-text-field
                  v-model="outlayQuantity2F"
                  label="Quantity needed"
                  class="create__outlay-cell create__outlay-cell--quantity"
                  >
                </v-text-field>
                <v-text-field
                  v-model="outlayPrice2F"
                  label="Price of 1 item"
                  class="create__outlay-cell create__outlay-cell--price"
                  >
                </v-text-field>
                <div class="create__outlay-cell create__outlay-cell--sum">
                  <span>Sum</span>
                  <span>{{multiplication(outlayQuantity2F, outlayPrice2F)}}</span>
                </div>
              </div>
              <div>
                <div>
                  <v-text-field
                    label="Name of Supplier or Worker"
                    v-model="outlayNameSupplier2"
                    class="create__outlay-cell"
                    >
                  </v-text-field>
                  <v-text-field
                    label="Contacts of Supplier or Worker"
                    v-model="outlayContactSupplier2"
                    class="create__outlay-cell"
                    >
                  </v-text-field>
                </div>
                <section>
                  <button type="button" raised class="create__upload-btn" @click="onPickFile2">Upload Photo Check</button>
                  <input
                    type="file"
                    style="display: none"
                    ref="fileInput2"
                    accept="image/*"
                    @change="onFilePicked_2">
                  <p>{{ msgFileMax2 }}</p>
                  <div class="create__img">
                    <img :src="url_F2" alt="">
                  </div>
                </section>
              </div>
            </div>
            <!-- <button @click="saveFinaloutlay"
                    class="btn"
                    >
                    Save Final outlay
            </button> -->
          </section>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="green darken-1" flat @click="saveFinalOutlay">Save</v-btn>
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
        res2: false,
        res3: false,
        res4: false,
        res5: false,

        outlayName1F: '',
        outlayQuantity1F: '',
        outlayPrice1F: '',
        outlayNameSupplier1: '',
        outlayContactSupplier1: '',

        outlayName2F: '',
        outlayQuantity2F: '',
        outlayPrice2F: '',
        outlayNameSupplier2: '',
        outlayContactSupplier2: '',
        url_F1: '',
        url_F2: '',
        images: [],
        dataFinal: {},
        baseUrls: []
      }
    },
    computed: {
    },
    methods: {
      // checkField(){
      //   if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '' ){
      //     return
      //   }
      //   this.dialog = false
      // },
      saveFinalOutlay(){
        const dataFinal = {
          outlayName1F: this.outlayName1F,
          outlayQuantity1F: this.outlayQuantity1F,
          outlayPrice1F: this.outlayPrice1F,
          outlayNameSupplier1: this.outlayNameSupplier1,
          outlayContactSupplier1: this.outlayContactSupplier1,

          outlayName2F: this.outlayName2F,
          outlayQuantity2F: this.outlayQuantity2F,
          outlayPrice2F: this.outlayPrice2F,
          outlayNameSupplier2: this.outlayNameSupplier2,
          outlayContactSupplier2: this.outlayContactSupplier2,

          images: this.images
        }
        this.$store.dispatch("editProject", {
          dataFinal,
          id: this.project.id
        })
        this.dialog = false
        // this.editedUrls[0] = this.edited
        this.baseUrls[0] = this.url_F1,
        this.baseUrls[1] = this.url_F2,
        this.$emit("imageUrlFinal", {
          baseUrls: this.baseUrls
        })
        console.log(this.baseUrls)
      },
      // takeFinalData(){
      //   this.$parent.$refs.finish.click()
      // },
      // async saveFinaloutlay() {
      //   try {
      //     // await this.takeFinalData()
      //     await this.checkField()
      //     // await this.editUser();
      //     await this.editProject()
      //   } catch (e) {
      //       alert("Error" + e)
      //   }
      // },
      // sendData(){
      //   this.$emit('send-data', {
      //     outlayName1F: this.outlayName1F,
      //     outlayQuantity1F: this.outlayQuantity1F,
      //     outlayPrice1F: this.outlayPrice1F,
      //     outlayNameSupplier1: this.outlayNameSupplier1,
      //     outlayContactSupplier1: this.outlayContactSupplier1,

      //     outlayName2F: this.outlayName2F,
      //     outlayQuantity2F: this.outlayQuantity2F,
      //     outlayPrice2F: this.outlayPrice2F,
      //     outlayNameSupplier2: this.outlayNameSupplier2,
      //     outlayContactSupplier2: this.outlayContactSupplier2,

      //     images: this.images
      //   })
      //   this.$emit('send-base-urls', {
      //     url_F1: this.url_F1,
      //     url_F2: this.url_F2,
      //   })
      // },
      multiplication(num, price) {
        return num * price
      },
      onPickFile1(){
        this.$refs.fileInput1.click()
      },
      onPickFile2(){
        this.$refs.fileInput2.click()
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
      }
    },
    created(){
      if(this.project.dataFinal){
        let data = this.project.dataFinal
        this.outlayName1F = data.outlayName1F ? data.outlayName1F : ""
        this.outlayQuantity1F = data.outlayQuantity1F ? data.outlayQuantity1F : ""
        this.outlayPrice1F = data.outlayPrice1F ? data.outlayPrice1F : ""
        this.outlayNameSupplier1 = data.outlayNameSupplier1 ? data.outlayNameSupplier1 : ""
        this.outlayContactSupplier1 = data.outlayContactSupplier1 ? data.outlayContactSupplier1 : ""

        this.outlayName2F = data.outlayName2F ? data.outlayName2F : ""
        this.outlayQuantity2F = data.outlayQuantity2F ? data.outlayQuantity2F : ""
        this.outlayPrice2F = data.outlayPrice2F ? data.outlayPrice2F : ""
        this.outlayNameSupplier2 = data.outlayNameSupplier2 ? data.outlayNameSupplier2 : ""
        this.outlayContactSupplier2 = data.outlayContactSupplier2 ? data.outlayContactSupplier2 : ""

        let img = this.project.dataFinal.images
        if(img){
          if(img[0]) {
            this.url_F1 = img[0].imageUrl
          }
          if(img[1]) {
            this.url_F2 = img[1].imageUrl
          }
        }
      }
    }
  };
</script>
