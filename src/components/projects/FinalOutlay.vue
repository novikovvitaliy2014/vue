<template>
  <div class="outlay">
    <div class="outlay__row outlay__row--head"
         v-html="$t('table-head-final')">
      <!-- <span>Resource</span>
      <span>Quantity</span>
      <span>Price of 1 item, $</span>
      <span>Sum, $</span> -->
    </div>
    <section class="outlay__group">
      <div class="outlay__row">
        <span>{{ dataFinal[0].outlayName }}</span>
        <span>{{ dataFinal[0].outlayQuantity }}</span>
        <span>{{ dataFinal[0].outlayPrice }}</span>
        <span>{{multiplication(dataFinal[0].outlayQuantity, dataFinal[0].outlayPrice)}}</span>
      </div>
      <div class="outlay__row outlay__row--btn">
        <button @click="showContacts">{{$t('proof')}}</button>
      </div>
      <!-- <transition name="slide-fade"> -->
      <div class="outlay-proof"
           >
        <div class="outlay-proof__contacts">
          <p v-if="!dataFinal[0].outlayNameSupplier">{{$t('name-provided')}}no</p>
          <h5>{{ dataFinal[0].outlayNameSupplier }}</h5>
          <p v-if="!dataFinal[0].outlayContactSupplier">{{$t('contacts-provided')}}no</p>
          <span>{{ dataFinal[0].outlayContactSupplier}}</span>
        </div>
        <p v-if="!editedUrl_F1">{{$t('check-provided')}}no</p>
        <img class="outlay-proof__check"
             :src="editedUrl_F1"
             alt="check 1"
             v-if="editedUrl_F1">
      </div>
        <!-- v-if="dataFinal.image0" -->
      <!-- </transition> -->
    </section>

    <section class="outlay__group">
      <div class="outlay__row">
        <span>{{ dataFinal[1].outlayName }}</span>
        <span>{{ dataFinal[1].outlayQuantity }}</span>
        <span>{{ dataFinal[1].outlayPrice }}</span>
        <span>{{multiplication(dataFinal[1].outlayQuantity, dataFinal[1].outlayPrice)}}</span>
      </div>
      <div class="outlay__row outlay__row--btn">
        <button @click="showContacts">{{$t('proof')}}</button>
      </div>
      <!-- <transition name="slide-fade"> -->
      <div class="outlay-proof"
           >
        <div class="outlay-proof__contacts">
          <p v-if="!dataFinal[1].outlayNameSupplier">{{$t('name-provided')}}no</p>
          <h5>{{ dataFinal[1].outlayNameSupplier }}</h5>
          <p v-if="!dataFinal[1].outlayContactSupplier">{{$t('contacts-provided')}}no</p>
          <span>{{ dataFinal[1].outlayContactSupplier }}</span>
        </div>
        <p v-if="!editedUrl_F2">{{$t('check-provided')}}no</p>
        <img class="outlay-proof__check"
             :src="editedUrl_F2"
             alt="check 2"
             v-if="editedUrl_F2">
      </div>
      <!-- </transition> -->
    </section>

    <section class="outlay__group">
      <div class="outlay__row">
        <span>{{ dataFinal[2].outlayName }}</span>
        <span>{{ dataFinal[2].outlayQuantity }}</span>
        <span>{{ dataFinal[2].outlayPrice }}</span>
        <span>{{multiplication(dataFinal[2].outlayQuantity, dataFinal[2].outlayPrice)}}</span>
      </div>
      <div class="outlay__row outlay__row--btn">
        <button @click="showContacts">{{$t('proof')}}</button>
      </div>
      <!-- <transition name="slide-fade"> -->
      <div class="outlay-proof"
           >
        <div class="outlay-proof__contacts">
          <p v-if="!dataFinal[2].outlayNameSupplier">{{$t('name-provided')}}no</p>
          <h5>{{ dataFinal[2].outlayNameSupplier }}</h5>
          <p v-if="!dataFinal[2].outlayContactSupplier">{{$t('contacts-provided')}}no</p>
          <span>{{ dataFinal[2].outlayContactSupplier }}</span>
        </div>
        <p v-if="!editedUrl_F3">{{$t('check-provided')}}no</p>
        <img class="outlay-proof__check"
             :src="editedUrl_F3"
             alt="check 3"
             v-if="editedUrl_F3">
      </div>
      <!-- </transition> -->
    </section>

    <section class="outlay__group">
      <div class="outlay__row">
        <span>{{ dataFinal[3].outlayName }}</span>
        <span>{{ dataFinal[3].outlayQuantity }}</span>
        <span>{{ dataFinal[3].outlayPrice }}</span>
        <span>{{multiplication(dataFinal[3].outlayQuantity, dataFinal[3].outlayPrice)}}</span>
      </div>
      <div class="outlay__row outlay__row--btn">
        <button @click="showContacts">{{$t('proof')}}</button>
      </div>
      <!-- <transition name="slide-fade"> -->
      <div class="outlay-proof"
           >
        <div class="outlay-proof__contacts">
          <p v-if="!dataFinal[3].outlayNameSupplier">{{$t('name-provided')}}no</p>
          <h5>{{ dataFinal[3].outlayNameSupplier }}</h5>
          <p v-if="!dataFinal[3].outlayContactSupplier">{{$t('contacts-provided')}}no</p>
          <span>{{ dataFinal[3].outlayContactSupplier }}</span>
        </div>
        <p v-if="!editedUrl_F4">{{$t('check-provided')}}no</p>
        <img class="outlay-proof__check"
             :src="editedUrl_F4"
             alt="check 4"
             v-if="editedUrl_F4">
      </div>
      <!-- </transition> -->
    </section>

    <section class="outlay__group">
      <div class="outlay__row">
        <span>{{ dataFinal[4].outlayName }}</span>
        <span>{{ dataFinal[4].outlayQuantity }}</span>
        <span>{{ dataFinal[4].outlayPrice }}</span>
        <span>{{multiplication(dataFinal[4].outlayQuantity, dataFinal[4].outlayPrice )}}</span>
      </div>
      <div class="outlay__row outlay__row--btn">
        <button @click="showContacts">{{$t('proof')}}</button>
      </div>
      <!-- <transition name="slide-fade"> -->
      <div class="outlay-proof"
           >
        <div class="outlay-proof__contacts">
          <p v-if="!dataFinal[4].outlayNameSupplier">{{$t('name-provided')}}no</p>
          <h5>{{ dataFinal[4].outlayNameSupplier }}</h5>
          <p v-if="!dataFinal[4].outlayContactSupplier">{{$t('contacts-provided')}}no</p>
          <span>{{ dataFinal[4].outlayContactSupplier }}</span>
        </div>
        <p v-if="!editedUrl_F5">{{$t('check-provided')}}no</p>
        <img class="outlay-proof__check"
             :src="editedUrl_F5"
             alt="check 5"
             v-if="editedUrl_F5 != '' ">
      </div>
        <!-- v-if="dataFinal.image0" -->
      <!-- </transition> -->
    </section>
    <div class="outlay__row outlay__row--sum">
      <span>{{$t('sum')}}</span>
      <span></span>
      <span></span>
      <span>{{ sum }}</span>
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
        dataFinal: [
          {
            outlayName: '',
            outlayQuantity: '',
            outlayPrice: '',
            outlayNameSupplier: '',
            outlayContactSupplier: ''
          },
          {
            outlayName: '',
            outlayQuantity: '',
            outlayPrice: '',
            outlayNameSupplier: '',
            outlayContactSupplier: ''
          },
          {
            outlayName: '',
            outlayQuantity: '',
            outlayPrice: '',
            outlayNameSupplier: '',
            outlayContactSupplier: ''
          },
          {
            outlayName: '',
            outlayQuantity: '',
            outlayPrice: '',
            outlayNameSupplier: '',
            outlayContactSupplier: ''
          },
          {
            outlayName: '',
            outlayQuantity: '',
            outlayPrice: '',
            outlayNameSupplier: '',
            outlayContactSupplier: ''
          }
        ],
      }
    },
    computed: {
      project() {
        return this.$store.getters.project(this.id)
      },
      // dataFinal(){
      //   return this.project.dataFinal
      // },
      urls(){
        const array = []
        const img = this.project.dataFinalImages
        console.log(img)
        const base = this.imagesBase
        console.log(base)
        for(let i = 0; i < 5; i++) {
          if(base.length > 0 && base[i] != undefined && base[i] != ""){
            array[i] =  base[i]
          } else if (img && img[i] != undefined && img[i] != "") {
            array[i] = img[i].imageUrl
          } else {
            array[i] = ""
          }
        }
        return array
      },
      editedUrl_F1(){
        return this.urls[0]
      },
      editedUrl_F2(){
        return this.urls[1]
      },
      editedUrl_F3(){
        return this.urls[2]
      },
      editedUrl_F4(){
        return this.urls[3]
      },
      editedUrl_F5(){
        return this.urls[4]
      },
      sum(){
        let data = this.dataFinal
        let sum = data[0].outlayQuantity * data[0].outlayPrice +
        data[1].outlayQuantity * data[1].outlayPrice +
        data[2].outlayQuantity * data[2].outlayPrice +
        data[3].outlayQuantity * data[3].outlayPrice +
        data[4].outlayQuantity * data[4].outlayPrice
        return sum
      }

    },
    methods: {
      multiplication(num, price) {
        return num * price
      },
      showContacts(event){
        let target = event.target
        let contacts = target.parentNode.nextSibling
        contacts.classList.toggle('outlay-proof--show')
      }
    },
    created(){
      this.$store.dispatch('loadProjects')
      console.log(this.dataFinal)
      let data = this.project.dataFinal
      if (data) {
        for (let i = 0; i < 5; i++) {
          if (data[i]) {
            if (data[i].outlayName) {
              this.dataFinal[i].outlayName = data[i].outlayName
            }
            if (data[i].outlayQuantity) {
              this.dataFinal[i].outlayQuantity = data[i].outlayQuantity
            }
            if (data[i].outlayPrice) {
              this.dataFinal[i].outlayPrice = data[i].outlayPrice
            }
            if (data[i].outlayNameSupplier) {
              this.dataFinal[i].outlayNameSupplier = data[i].outlayNameSupplier
            }
            if (data[i].outlayContactSupplier) {
              this.dataFinal[i].outlayContactSupplier = data[i].outlayContactSupplier
            }
          }
        }
      }
      // let data = this.project.dataFinal
      // if (!data) {
      //   for (let i = 0; i < 5; i++) {
      //     this.dataFinal[i].outlayName = ''
      //     this.dataFinal[i].outlayQuantity = ''
      //     this.dataFinal[i].outlayPrice = ''
      //     this.dataFinal[i].outlayNameSupplier = ''
      //     this.dataFinal[i].outlayContactSupplier = ''
      //   }
      // }


    }
  };
</script>
