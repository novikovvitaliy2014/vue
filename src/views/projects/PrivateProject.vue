<template>
  <div class="private-project">
    <h1>Private Pro</h1>
    <section>
      <v-card v-if="project">
        <v-card-title>
          <h3 class="private-project__title">{{ project.title }}</h3>
        </v-card-title>
        <template  v-if="userIsCreator">
          <div class="private-project__edit-icons">
            <app-dialog-edit-project :project="project" @imageUrl="urlUpdate">
            </app-dialog-edit-project>
            <v-btn class="delete-icon" @click="deleteProject" color="green">
              <v-icon >fas fa-trash-alt</v-icon>
              <span>Delete</span>
            </v-btn>
          </div>
        </template>

        <v-card-text class="private-project__desc">
          {{ project.description }}
        </v-card-text>

        <template  v-if="userIsCreator">
          <div class="private-project__edit-date">
            <app-dialog-edit-date :project="project">
            </app-dialog-edit-date>
            <app-dialog-edit-time :project="project">
            </app-dialog-edit-time>
          </div>
        </template>
        <v-card-text class="private-project__date">
          {{ project.date | date }}
        </v-card-text>
        <section class="private-project__pre-photos">
          <div class="private-project__pre-photo">
            <h4>Current View</h4>
            <v-img class="outlay-photo outlay-photo--1"
               :src="currentImage"
               aspect-ratio="1.618"
               alt="final-photo-1"
               v-if="currentImage"
               >
            </v-img>
          </div>
          <div class="private-project__pre-photo">
            <h4>Project View</h4>
            <v-img class="outlay-photo outlay-photo--1"
               :src="projectImage"
               aspect-ratio="1.618"
               alt="final-photo-1"
               v-if="projectImage"
               >
            </v-img>
          </div>
        </section>


        <h2>{{$t('preliminary')}}</h2>
        <div class="private-project__edit-icons" v-if="userIsCreator">
          <app-dialog-edit-project-outlay :project="project">
          </app-dialog-edit-project-outlay>
          <v-btn class="delete-icon" @click="deleteOutlay" color="green">
            <v-icon >fas fa-trash-alt</v-icon>
            <span>Delete</span>
          </v-btn>
        </div>
        <section class="private-project__outlay" v-if="project.dataOutlay">
          <!-- v-if="project.dataOutlay" -->
          <div class="outlay__row outlay__row--head"
               v-html="$t('table-head-final')">
          </div>

          <div class="outlay__row" v-if="project.dataOutlay[0].outlayName">
            <span>{{ dataOutlay[0].outlayName }}</span>
            <span>{{ dataOutlay[0].outlayQuantity }}</span>
            <span>{{ dataOutlay[0].outlayPrice }}</span>
            <span>{{multiplication(dataOutlay[0].outlayQuantity, dataOutlay[0].outlayPrice)}}</span>
          </div>
          <div class="outlay__row" v-if="project.dataOutlay[1].outlayName">
            <span>{{ dataOutlay[1].outlayName }}</span>
            <span>{{ dataOutlay[1].outlayQuantity }}</span>
            <span>{{ dataOutlay[1].outlayPrice }}</span>
            <span>{{multiplication(dataOutlay[1].outlayQuantity, dataOutlay[1].outlayPrice)}}</span>
          </div>
          <div class="outlay__row" v-if="project.dataOutlay[2].outlayName">
            <span>{{ dataOutlay[2].outlayName }}</span>
            <span>{{ dataOutlay[2].outlayQuantity }}</span>
            <span>{{ dataOutlay[2].outlayPrice }}</span>
            <span>{{multiplication(dataOutlay[2].outlayQuantity, dataOutlay[2].outlayPrice)}}</span>
          </div>
          <div class="outlay__row" v-if="project.dataOutlay[3].outlayName">
            <span>{{ dataOutlay[3].outlayName }}</span>
            <span>{{ dataOutlay[3].outlayQuantity }}</span>
            <span>{{ dataOutlay[3].outlayPrice }}</span>
            <span>{{multiplication(dataOutlay[3].outlayQuantity, dataOutlay[3].outlayPrice)}}</span>
          </div>
          <div class="outlay__row" v-if="project.dataOutlay[4].outlayName">
            <span>{{ dataOutlay[4].outlayName }}</span>
            <span>{{ dataOutlay[4].outlayQuantity }}</span>
            <span>{{ dataOutlay[4].outlayPrice }}</span>
            <span>{{multiplication(dataOutlay[4].outlayQuantity, dataOutlay[4].outlayPrice)}}</span>
          </div>
          <div class="outlay__row outlay__row--sum">
            <span>{{$t('sum')}}</span>
            <span></span>
            <span></span>
            <span>{{sum}}</span>
          </div>
        </section>

        <donate-contacts-form :id="id"></donate-contacts-form>
        <project-donors :id="id" :sum="sum"></project-donors>

        <h2>{{$t('final-outlay')}}</h2>
        <p v-if="!project.dataFinal && userIsCreator" class="outlay__message">Dear project creator, you can add or edit final outlay after project realization. Push the button "EDIT" </p>
        <p v-if="!project.dataFinal && !userIsCreator" class="outlay__message">Final outlay could be published here by project creator after project realization. </p>
        <div class="private-project__edit-icons" v-if="userIsCreator">
          <app-dialog-edit-project-final :project="project" @imageUrlFinal="urlUpdateFinal">
          </app-dialog-edit-project-final>
          <v-btn class="delete-icon" @click="deleteFinalOutlay" color="green">
            <v-icon >fas fa-trash-alt</v-icon>
            <span>Delete</span>
          </v-btn>
        </div>
        <final-outlay :id="id" :imagesBase="imagesBase"></final-outlay>
        <!-- v-if="project.dataFinal" -->

        <h2>{{$t('photos')}}</h2>
        <p v-if="!project.dataPhotos && userIsCreator" class="outlay__message">Dear project creator, you can add or edit final photos of realized project here. Push the button "EDIT" </p>
        <p v-if="!project.dataPhotos && !userIsCreator" class="outlay__message">Final photos of realized project could be published here by project creator after project realization. </p>
        <div class="private-project__edit-icons" v-if="userIsCreator">
          <app-dialog-edit-project-photos :project="project" @photoBaseUrl="photoBaseUrl">
          </app-dialog-edit-project-photos>
          <v-btn class="delete-icon" @click="deletePhotos" color="green">
            <v-icon >fas fa-trash-alt</v-icon>
            <span>Delete</span>
          </v-btn>
        </div>

        <final-photos v-if="project.dataPhotos" :id="id" :photosBase="photosBase"></final-photos>

      </v-card>
    </section>
  </div>
</template>
<script>
import DialogProjectEdit from './../../components/dialogs/DialogProjectEdit.vue'
import DialogProjectEditOutlay from './../../components/dialogs/DialogProjectEditOutlay.vue'
import DialogProjectEditFinal from './../../components/dialogs/DialogProjectEditFinal.vue'
import DialogProjectEditPhotos from './../../components/dialogs/DialogProjectEditPhotos.vue'
import DialogProjectEditDate from './../../components/dialogs/DialogProjectEditDate.vue'
import DialogProjectEditTime from './../../components/dialogs/DialogProjectEditTime.vue'
import FinalOutlay from './../../components/projects/FinalOutlay.vue'
import FinalPhotos from './../../components/projects/FinalPhotos.vue'
import donateContactsForm from '../../components/projects/donateContactsForm.vue'
import ProjectDonors from '../../views/donorsPage/ProjectDonors.vue'
export default {
  props: ['id'],
  data() {
    return {
      // urls: [],
      // finaloutlay: true,
      imagesBase: [],
      photosBase: [],
      // images: [],
      // currentImage: "",
      // projectImage: "",
      // editedUrl_F1: this.project.currentImage.imageUrl,
      // project: {}
    }
  },
  components: {
    "final-outlay": FinalOutlay,
    "final-photos": FinalPhotos,
    "app-dialog-edit-project": DialogProjectEdit,
    "app-dialog-edit-project-outlay": DialogProjectEditOutlay,
    "app-dialog-edit-project-final": DialogProjectEditFinal,
    "app-dialog-edit-project-photos": DialogProjectEditPhotos,
    "app-dialog-edit-date": DialogProjectEditDate,
    "app-dialog-edit-time": DialogProjectEditTime,
    "project-donors": ProjectDonors,
    "donate-contacts-form": donateContactsForm
  },
  computed: {
    project() {
      return this.$store.getters.project(this.id)
      console.log(this.$store.getters.project(this.id))
    },
    dataOutlay(){
      return this.project.dataOutlay
    },
    // auth() {
    //   return this.$store.getters.userId !== null && this.$store.getters.userId !== undefined
    // },
    userIsCreator(){
      if(this.project){
        return this.$store.getters.userId === this.project.creatorId
      }
      return false
    },
    sum(){
      let dataOutlay = this.project.dataOutlay
      let sum = null
      if(dataOutlay) {
        for( let i = 0; i < 5; i++) {
          let multi = dataOutlay[i].outlayQuantity * dataOutlay[i].outlayPrice
          if(isNaN(multi)){
            multi = null
          }
          sum = sum + multi
        }
      }
      return sum
    },
    currentImage(){
      let pro = this.project.projectImages
      if(pro){
        if (pro[0]){
          return pro[0].imageUrl
        } else {
          return ''
        }
      }
    },
    projectImage(){
      let pro = this.project.projectImages
      if(pro){
        if (pro[1]){
          return pro[1].imageUrl
        } else {
          return ''
        }
      }
    }
  },
  methods: {
    multiplication(num, price) {
      if(!isNaN(num) && !isNaN(price)){
        return num * price
      }
      return 'error'

    },
    urlUpdate(payload){
      this.currentImage = payload.url_1
      this.projectImage = payload.url_2
    },
    urlUpdateFinal(payload){
      this.imagesBase = payload.baseUrls
    },
    photoBaseUrl(payload){
      const base = []
      base[0] = payload.baseUrls_1
      base[1] = payload.baseUrls_2
      base[2] = payload.baseUrls_3
      base[3] = payload.baseUrls_4
      this.photosBase = base
      // console.log(this.photosBase)
    },
    deleteProject() {
      this.$store.dispatch("deleteProject", this.project)
    },
    deleteOutlay() {
      this.$store.dispatch("deleteOutlay", this.project)
      this.project.dataOutlay = undefined
    },
    deleteFinalOutlay() {
      this.$store.dispatch("deleteFinalOutlay", this.project)
      this.project.dataFinal = undefined
    },
    deletePhotos() {
      this.project.dataPhotos = undefined
    }
  },
  created() {
    // this.$store.dispatch('fetchUsers')
    this.$store.dispatch('loadProjects')
    // let pro = this.project.projectImages
    // if(pro){
    //   if (pro[0]){
    //     this.currentImage = pro[0].imageUrl
    //   }
    //   if (pro[1]){
    //     this.projectImage = pro[1].imageUrl
    //   }
    // }
  }
};
</script>
