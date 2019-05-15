<template>
  <div class="private-project">
    <h1>Private Pro</h1>
    <section>
      <v-card v-if="project">
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
        <v-card-title>
          <h3 class="private-project__title">{{ project.title }}</h3>
          <!-- <h5>{{ project.creatorId }}</h5> -->
        </v-card-title>
        <v-card-text class="private-project__desc">
          {{ project.description }}
        </v-card-text>
        <v-card-text class="private-project__date">
          {{ project.date | date }}
        </v-card-text>
        <template  v-if="userIsCreator">
          <div class="private-project__edit-date">
            <app-dialog-edit-date :project="project">
            </app-dialog-edit-date>
            <app-dialog-edit-time :project="project">
            </app-dialog-edit-time>
          </div>
        </template>
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

        <div class="private-project__edit-icons">
          <app-dialog-edit-project-outlay :project="project">
          </app-dialog-edit-project-outlay>
          <v-btn class="delete-icon" @click="deleteOutlay" color="green">
            <v-icon >fas fa-trash-alt</v-icon>
            <span>Delete</span>
          </v-btn>
        </div>

        <section class="private-project__outlay" v-if="project.dataOutlay">
          <h2>{{$t('preliminary')}}</h2>
          <div class="outlay__row outlay__row--head"
               v-html="$t('table-head-final')">
          </div>

          <div class="outlay__row" v-if="project.dataOutlay.outlayName1">
            <span>{{ data.outlayName1 }}</span>
            <span>{{ data.outlayQuantity1 }}</span>
            <span>{{ data.outlayPrice1 }}</span>
            <span>{{multiplication(data.outlayQuantity1, data.outlayPrice1)}}</span>
          </div>
          <div class="outlay__row" v-if="project.dataOutlay.outlayName2">
            <span>{{ data.outlayName2 }}</span>
            <span>{{ data.outlayQuantity2 }}</span>
            <span>{{ data.outlayPrice2 }}</span>
            <span>{{multiplication(data.outlayQuantity2, data.outlayPrice2)}}</span>
          </div>
          <div class="outlay__row" v-if="project.dataOutlay.outlayName3">
            <span>{{ data.outlayName3 }}</span>
            <span>{{ data.outlayQuantity3 }}</span>
            <span>{{ data.outlayPrice3 }}</span>
            <span>{{multiplication(data.outlayQuantity3, data.outlayPrice3)}}</span>
          </div>
          <div class="outlay__row" v-if="project.dataOutlay.outlayName4">
            <span>{{ data.outlayName4 }}</span>
            <span>{{ data.outlayQuantity4 }}</span>
            <span>{{ data.outlayPrice4 }}</span>
            <span>{{multiplication(data.outlayQuantity4, data.outlayPrice4)}}</span>
          </div>
          <div class="outlay__row" v-if="project.dataOutlay.outlayName5">
            <span>{{ data.outlayName5 }}</span>
            <span>{{ data.outlayQuantity5 }}</span>
            <span>{{ data.outlayPrice5 }}</span>
            <span>{{multiplication(data.outlayQuantity5, data.outlayPrice5)}}</span>
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

        <div class="private-project__edit-icons">
          <app-dialog-edit-project-final :project="project" @imageUrlFinal="urlUpdateFinal">
          </app-dialog-edit-project-final>
          <v-btn class="delete-icon" @click="deleteFinalOutlay" color="green">
            <v-icon >fas fa-trash-alt</v-icon>
            <span>Delete</span>
          </v-btn>
        </div>
        <final-outlay v-if="project.dataFinal" :id="id" :imagesBase="imagesBase"></final-outlay>

        <div class="private-project__edit-icons">
          <app-dialog-edit-project-photos :project="project" @photoBaseUrl="photoBaseUrl">
          </app-dialog-edit-project-photos>
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
      currentImage: "",
      projectImage: "",
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
    data(){
      return this.project.dataOutlay
    },
    auth() {
      return this.$store.getters.isAuthenticated !== null && this.$store.getters.isAuthenticated !== undefined
    },
    userIsCreator(){
      if(this.project){
        return this.$store.getters.userId === this.project.creatorId
      }
      return false
    },
    sum(){
      let data = this.project.dataOutlay
      let sum = data.outlayQuantity1 * data.outlayPrice1 +
      data.outlayQuantity2 * data.outlayPrice2 +
      data.outlayQuantity3 * data.outlayPrice3 +
      data.outlayQuantity4 * data.outlayPrice4 +
      data.outlayQuantity5 * data.outlayPrice5
      return sum
    }
  },
  methods: {
    multiplication(num, price) {
      return num * price
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
  },
  created() {
    let pro = this.project.projectImages
    if(pro){
      if (pro[0]){
        this.currentImage = pro[0].imageUrl
      }
      if (pro[1]){
        this.projectImage = pro[1].imageUrl
      }
    }
  }
};
</script>
