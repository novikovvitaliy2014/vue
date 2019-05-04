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
            <img :src="currentImage"
                  v-if="currentImage">
          </div>
          <div class="private-project__pre-photo">
            <h4>Project View</h4>
            <img  :src="projectImage"
                  v-if="projectImage"
                  >
          </div>
        </section>

        <section class="private-project__smeta" v-if="data">
          <h2>{{$t('preliminary')}}</h2>
          <div class="smeta__row smeta__row--head"
               v-html="$t('table-head-final')">
          </div>

          <div class="smeta__row" v-if="project.data.smetaName1">
            <span>{{ data.smetaName1 }}</span>
            <span>{{ data.smetaQuantity1 }}</span>
            <span>{{ data.smetaPrice1 }}</span>
            <span>{{multiplication(data.smetaQuantity1, data.smetaPrice1)}}</span>
          </div>
          <div class="smeta__row" v-if="project.data.smetaName2">
            <span>{{ data.smetaName2 }}</span>
            <span>{{ data.smetaQuantity2 }}</span>
            <span>{{ data.smetaPrice2 }}</span>
            <span>{{multiplication(data.smetaQuantity2, data.smetaPrice2)}}</span>
          </div>
          <div class="smeta__row" v-if="project.data.smetaName3">
            <span>{{ data.smetaName3 }}</span>
            <span>{{ data.smetaQuantity3 }}</span>
            <span>{{ data.smetaPrice3 }}</span>
            <span>{{multiplication(data.smetaQuantity3, data.smetaPrice3)}}</span>
          </div>
          <div class="smeta__row" v-if="project.data.smetaName4">
            <span>{{ data.smetaName4 }}</span>
            <span>{{ data.smetaQuantity4 }}</span>
            <span>{{ data.smetaPrice4 }}</span>
            <span>{{multiplication(data.smetaQuantity4, data.smetaPrice4)}}</span>
          </div>
          <div class="smeta__row" v-if="project.data.smetaName5">
            <span>{{ data.smetaName5 }}</span>
            <span>{{ data.smetaQuantity5 }}</span>
            <span>{{ data.smetaPrice5 }}</span>
            <span>{{multiplication(data.smetaQuantity5, data.smetaPrice5)}}</span>
          </div>
          <div class="smeta__row smeta__row--sum">
            <span>{{$t('sum')}}</span>
            <span></span>
            <span></span>
            <span>{{sum}}</span>
          </div>
        </section>
        <!-- <final-smeta @send-data="sendData"></final-smeta> -->
        <final-smeta :id="id" :imagesBase="imagesBase"></final-smeta>
      </v-card>
    </section>
  </div>
</template>
<script>
import DialogProjectEdit from './../../components/dialogs/DialogProjectEdit.vue'
import DialogProjectEditDate from './../../components/dialogs/DialogProjectEditDate.vue'
import DialogProjectEditTime from './../../components/dialogs/DialogProjectEditTime.vue'
import FinalSmeta from './../../components/projects/FinalSmeta.vue'
  export default {
    props: ['id'],
    data() {
      return {
        imagesBase: [],
        // images: [],
        currentImage: "",
        projectImage: "",
        // editedUrl_F1: this.project.currentImage.imageUrl,
        // project: {}
      }
    },
    components: {
      "final-smeta": FinalSmeta,
      "app-dialog-edit-project": DialogProjectEdit,
      "app-dialog-edit-date": DialogProjectEditDate,
      "app-dialog-edit-time": DialogProjectEditTime,
    },
    computed: {
      // currentImage(){
      //   return this.images[0]
      // },
      // projectImage(){
      //   return this.images[1]
      // },
      // projects(){
      //   return this.$store.getters.projects
      // },
      project() {
        return this.$store.getters.project(this.id)
        console.log(this.$store.getters.project(this.id))
      },
      data(){
        return this.project.data
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
        let data = this.project.data
        let sum = data.smetaQuantity1 * data.smetaPrice1 +
        data.smetaQuantity2 * data.smetaPrice2 +
        data.smetaQuantity3 * data.smetaPrice3 +
        data.smetaQuantity4 * data.smetaPrice4 +
        data.smetaQuantity5 * data.smetaPrice5
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
        // this.images = payload.editedUrls
        // this.project.projectImages[1].imageUrl = payload.url_2
        this.imagesBase = payload.baseUrls
        // this.imagesBase[1] = payload.urlBase2
        // console.log(payload.baseUrls)
      },
      deleteProject() {
        this.$store.dispatch("deleteProject", this.project)
      }
    },
    created() {
      this.$store.dispatch('loadProjects')
      console.log(this.project)
      // this.images[0] = this.project.images ? this.project.images[0] : ""
      // this.project.images[1] ? this.images[1] = this.project.images[1] : this.images[1] = ""
      let pro = this.project.projectImages
      if(pro){
        if (pro[0]){
          this.currentImage = pro[0].imageUrl
        }
        if (pro[1]){
          this.projectImage = pro[1].imageUrl
        }
      }


      // this.currentImage = this.images[0],
      // this.projectImage = this.images[1]
    }
  };
</script>
