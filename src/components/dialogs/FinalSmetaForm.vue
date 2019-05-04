<template>
  <section class="create__smeta">
    <h4>Final Smeta</h4>
    <div class="create__smeta-resource">
      <div class="create__smeta-item create__smeta-item--1">
        <v-text-field
          label="Name"
          v-model="smetaName1F"
          class="create__smeta-cell create__smeta-cell--name"
          >
        </v-text-field>
        <v-text-field
          v-model="smetaQuantity1F"
          label="Quantity needed"
          class="create__smeta-cell create__smeta-cell--quantity"
          >
        </v-text-field>
        <v-text-field
          v-model="smetaPrice1F"
          label="Price of 1 item"
          class="create__smeta-cell create__smeta-cell--price"
          >
        </v-text-field>
        <div class="create__smeta-cell create__smeta-cell--sum">
          <span>Sum</span>
          <span>{{multiplication(smetaQuantity1F, smetaPrice1F)}}</span>
        </div>
      </div>
      <div>
        <div>
          <v-text-field
            label="Name of Supplier or Worker"
            v-model="smetaNameSupplier1"
            class="create__smeta-cell"
            >
          </v-text-field>
          <v-text-field
            label="Contacts of Supplier or Worker"
            v-model="smetaContactSupplier1"
            class="create__smeta-cell"
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
      <v-btn v-if="!res2" class="create__smeta--add" @click="res2 = true">Add Resource
        <v-icon medium>keyboard_arrow_down</v-icon></v-btn>
    </div>
    <div class="create__smeta-resource" v-if="res2">
      <div class="create__smeta-item create__smeta-item--2">
        <v-text-field
          label="Name"
          v-model="smetaName2F"
          class="create__smeta-cell create__smeta-cell--name"
          >
        </v-text-field>
        <v-text-field
          v-model="smetaQuantity2F"
          label="Quantity needed"
          class="create__smeta-cell create__smeta-cell--quantity"
          >
        </v-text-field>
        <v-text-field
          v-model="smetaPrice2F"
          label="Price of 1 item"
          class="create__smeta-cell create__smeta-cell--price"
          >
        </v-text-field>
        <div class="create__smeta-cell create__smeta-cell--sum">
          <span>Sum</span>
          <span>{{multiplication(smetaQuantity1F, smetaPrice1F)}}</span>
        </div>
      </div>
      <div>
        <div>
          <v-text-field
            label="Name of Supplier or Worker"
            v-model="smetaNameSupplier2"
            class="create__smeta-cell"
            >
          </v-text-field>
          <v-text-field
            label="Contacts of Supplier or Worker"
            v-model="smetaContactSupplier2"
            class="create__smeta-cell"
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
    <v-btn @click="sendData">finish</v-btn>
  </section>
</template>
<script>
  export default {
    props: {
      project: Object
    },
    data() {
      return {
        msgFileMax1: "",
        msgFileMax2: "",
        res2: false,
        res3: false,
        res4: false,
        res5: false,

        smetaName1F: '',
        smetaQuantity1F: '',
        smetaPrice1F: '',
        smetaNameSupplier1: '',
        smetaContactSupplier1: '',

        smetaName2F: '',
        smetaQuantity2F: '',
        smetaPrice2F: '',
        smetaNameSupplier2: '',
        smetaContactSupplier2: '',
        url_F1: '',
        url_F2: '',
        images: []
      }
    },
    computed: {
    },
    methods: {
      sendData(){
        this.$emit('send-data', {
          smetaName1F: this.smetaName1F,
          smetaQuantity1F: this.smetaQuantity1F,
          smetaPrice1F: this.smetaPrice1F,
          smetaNameSupplier1: this.smetaNameSupplier1,
          smetaContactSupplier1: this.smetaContactSupplier1,

          smetaName2F: this.smetaName2F,
          smetaQuantity2F: this.smetaQuantity2F,
          smetaPrice2F: this.smetaPrice2F,
          smetaNameSupplier2: this.smetaNameSupplier2,
          smetaContactSupplier2: this.smetaContactSupplier2,

          images: this.images
        })
        this.$emit('send-base-urls', {
          url_F1: this.url_F1,
          url_F2: this.url_F2,
        })
      },
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
        this.smetaName1F = data.smetaName1F ? data.smetaName1F : ""
        this.smetaQuantity1F = data.smetaQuantity1F ? data.smetaQuantity1F : ""
        this.smetaPrice1F = data.smetaPrice1F ? data.smetaPrice1F : ""
        this.smetaNameSupplier1 = data.smetaNameSupplier1 ? data.smetaNameSupplier1 : ""
        this.smetaContactSupplier1 = data.smetaContactSupplier1 ? data.smetaContactSupplier1 : ""

        this.smetaName2F = data.smetaName2F ? data.smetaName2F : ""
        this.smetaQuantity2F = data.smetaQuantity2F ? data.smetaQuantity2F : ""
        this.smetaPrice2F = data.smetaPrice2F ? data.smetaPrice2F : ""
        this.smetaNameSupplier2 = data.smetaNameSupplier2 ? data.smetaNameSupplier2 : ""
        this.smetaContactSupplier2 = data.smetaContactSupplier2 ? data.smetaContactSupplier2 : ""

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

<style lang="sass" scoped>
</style>
