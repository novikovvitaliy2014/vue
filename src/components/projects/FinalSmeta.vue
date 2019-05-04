<template>
  <div class="smeta" v-if="dataFinal">
    <h2>{{$t('final-outlay')}}</h2>
    <div class="smeta__row smeta__row--head"
         v-html="$t('table-head-final')">
      <!-- <span>Resource</span>
      <span>Quantity</span>
      <span>Price of 1 item, $</span>
      <span>Sum, $</span> -->
    </div>
    <section class="smeta__group">
      <div class="smeta__row">
        <span>{{ dataFinal.smetaName1F }}</span>
        <span>{{ dataFinal.smetaQuantity1F }}</span>
        <span>{{ dataFinal.smetaPrice1F }}</span>
        <span>{{multiplication(dataFinal.smetaQuantity1F, dataFinal.smetaPrice1F)}}</span>
      </div>
      <div class="smeta__row smeta__row--btn">
        <button @click="showContacts(1)">{{$t('proof')}}</button>
      </div>
      <transition name="slide-fade">
        <div class="smeta-proof"
             v-if="showContact1"
             >
          <div class="smeta-proof__contacts">
            <h5>{{ dataFinal.smetaNameSupplier1 }}</h5>
            <span>{{ dataFinal.smetaContactSupplier1}}</span>
          </div>
          <img class="smeta-proof__bill"
               :src="editedUrl_F1"
               alt="check 1">
          <!-- <v-img class="smeta-proof__bill"
                 :src="editedUrl_F1"
                 width="50"
                 >
          </v-img> -->
        </div>
        <!-- v-if="dataFinal.image0" -->
      </transition>
    </section>

    <section class="smeta__group">
      <div class="smeta__row">
        <span>{{ dataFinal.smetaName2F }}</span>
        <span>{{ dataFinal.smetaQuantity2F }}</span>
        <span>{{ dataFinal.smetaPrice2F }}</span>
        <span>{{multiplication(dataFinal.smetaQuantity2F, dataFinal.smetaPrice2F)}}</span>
      </div>
      <div class="smeta__row smeta__row--btn">
        <button @click="showContacts(2)">{{$t('proof')}}</button>
      </div>
      <transition name="slide-fade">
        <div class="smeta-proof"
             v-if="showContact2"
             >
          <div class="smeta-proof__contacts">
            <h5>{{ dataFinal.smetaNameSupplier2 }}</h5>
            <span>{{ dataFinal.smetaContactSupplier2}}</span>
          </div>
          <img class="smeta-proof__bill"
               :src="editedUrl_F2"
               alt="check 2">
        </div>
      </transition>
    </section>
    <section class="smeta__group">
      <div class="smeta__row">
        <span>{{$t('work')}}</span>
        <span>10</span>
        <span>6</span>
        <span>60</span>
      </div>

      <div class="smeta__row smeta__row--btn">
        <button @click="showContacts(3)">{{$t('proof')}}</button>
      </div>

      <transition name="slide-fade">
        <div class="smeta-proof"
             v-if="showContact3"
             >
          <div class="smeta-proof__contacts">
            <h5>Multi Service </h5>
            <span>38 050 456 78 99</span>
          </div>
          <img class="smeta-proof__bill"
               :src="editedUrl_F3"

               alt="check 3">
        </div>
      </transition>
    </section>

    <div class="smeta__row">
      <span>{{$t('work-org')}}</span>
      <span>1</span>
      <span></span>
      <span>20</span>
    </div>

    <div class="smeta__row smeta__row--sum">
      <span>{{$t('sum')}}</span>
      <span></span>
      <span></span>
      <span>270</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      id: String,
      imagesBase: Array
    },
    data() {
      return {
        // urls: [],
        showContact1: false,
        showContact2: false,
        showContact3: false,
        // editedUrl_F1: '',
        // editedUrl_F2: '',
        // editedUrl_F1: '',

      }
    },
    computed: {
      project() {
        return this.$store.getters.project(this.id)
      },
      dataFinal(){
        return this.project.dataFinal
      },
      editedUrl_F1(){
        let img = this.dataFinal.images
        if (this.imagesBase[0]) {
          return this.imagesBase[0]
        } else if(img) {
          if(img[0]) {
            return img[0].imageUrl
          }
        }
        return ""
      },
      editedUrl_F2(){
        let img = this.dataFinal.images
        if (this.imagesBase[1]) {
          return this.imagesBase[1]
        } else if(img) {
          if(img[1]) {
            return img[1].imageUrl
          }
        }
        return ""
      },
    },
    methods: {
      multiplication(num, price) {
        return num * price
      },
      showContacts(n){
        if(n===1){
          this.showContact1 = !this.showContact1
        } else if (n===2){
          this.showContact2 = !this.showContact2
        } else if (n===3){
          this.showContact3 = !this.showContact3
        }
      }
    },
    created(){
      this.$store.dispatch('loadProjects')
    }
  };
</script>
