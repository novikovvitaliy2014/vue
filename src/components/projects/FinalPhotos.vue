<template>
  <div>

    <section class="outlay__photos">
      <div class="outlay__photo">
        <v-img class="outlay-photo outlay-photo--1"
           :src="Url_F1"
           aspect-ratio="1.618"
           alt="final-photo-1"
           v-if="Url_F1"
           >
        </v-img>
      </div>
      <div class="outlay__photo">
        <v-img class="outlay-photo outlay-photo--2"
           :src="Url_F2"
           aspect-ratio="1.618"
           alt="final-photo-2"
           v-if="Url_F2"
           >
        </v-img>
      </div>
      <div class="outlay__photo">
        <v-img class="outlay-photo outlay-photo--3"
           :src="Url_F3"
           aspect-ratio="1.618"
           alt="final-photo-3"
           v-if="Url_F3"
           >
        </v-img>
      </div>
      <div class="outlay__photo">
        <v-img class="outlay-photo outlay-photo--4"
           :src="Url_F4"
           aspect-ratio="1.618"
           alt="final-photo-4"
           v-if="Url_F4"
           >
        </v-img>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      id: String,
      photosBase: Array
    },
    // data() {
    //   return {
    //   }
    // },
    computed: {
      urls(){
        const array = []
        const img = this.dataPhotos
        const base = this.photosBase
        for(let i = 0; i < 4; i++) {
          if(base.length > 0 && base[i] != undefined && base[i] != ""){
            array[i] =  base[i]
          } else if (img.length > 0 && img[i] != undefined && img[i] != "") {
            array[i] = img[i].imageUrl
          } else {
            array[i] = " "
          }
        }
        return array
      },
      project() {
        return this.$store.getters.project(this.id)
        console.log(this.$store.getters.project(this.id))
      },
      dataPhotos(){
        return this.project.dataPhotos
      },
      Url_F1(){
        return this.urls[0]
      },
      Url_F2(){
        return this.urls[1]
      },
      Url_F3(){
        return this.urls[2]
      },
      Url_F4(){
        return this.urls[3]
      }
    },
    // methods: {
    // },
    // created(){
    // }
  };
</script>
