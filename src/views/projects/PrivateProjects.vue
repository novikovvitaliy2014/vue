<template>
  <div class="private-projects">
    <h1>Private Projects</h1>
    <p>You need to enter unique project ID to see project details</p>
    <v-text-field
      type="text"
      :rules="numberRules"
      label="Project ID"
      id="projectId"
      v-model='projectId'
      @focus="loadProjects"

      >
    </v-text-field>
    <!-- prepend-icon="lock"
      light
      flat
      solo-inverted
      hide-details
      clearable -->
    <!-- v-for="project in projects"
      :key="project.id" -->
      <!-- <p>{{ project }}</p>
      <p>{{ match }}</p>
      <p>{{ projects }}</p>
      <p>{{ projectId }}</p> -->
    <section v-if="project"
      >
      <div class="title">{{ project.title }}</div>
      <!-- <div class="id">{{ project.id }}</div> -->
      <div>{{ project.date | date }}</div>
      <div>{{ project.description }}</div>
      <div>{{ project.projectImages }}</div>
      <!-- <img :src="project.imageUrl"/> -->
      <router-link :to="'/private-projects/' + project.id" :project="project">view project</router-link>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        numberRules: [
        v => !!v || 'Enter the project ID',
        v => (v && v.length >= 6) || 'ID must be at least 6 symbols'
      ],
        projectId: ''
        // project: {}
      }
    },
    computed: {
      projects(){
        return this.$store.getters.projects
      },
      loading(){
        return this.$store.getters.loading
      },
      project(){
        return this.projects.find((project) =>{
          return project.projectId === this.projectId
        })
      }
    },
    methods: {
      // checkId(){
      //  this.project = this.match

      //   // console.log(this.match)
      //   console.log(this.project)
      //   }
      // resizeImages(){
      //   this.$store.dispatch('resizeImages')
      //   console.log('resized')
      // },
      loadProjects(){
        if(this.$store.getters.userId === undefined || this.$store.getters.userId === null){
          // this.$router.push( '/signin')
          this.$store.dispatch('logout')
        } else {
          this.$store.dispatch('loadProjects')
          console.log('loaded')
        }


      },
      // async resizeAndLoad(){
      //   try {
      //     console.log('start')
      //     await this.resizeImages()
      //     console.log('resized')
      //     // await this.editUser();
      //     await this.loadProjects()
      //     console.log('loaded')
      //   } catch (e) {
      //       alert("Error" + e)
      //   }
      // },
    },
    created() {
      // this.$store.dispatch('tryAutoSignin')
      this.$store.dispatch('resizeImages')
      console.log('resized')
      console.log(this.$store.getters.userId)
      // this.$store.dispatch('loadProjects')
      // this.resizeAndLoad()


      // this.$store.dispatch('loadProjects')
      // this.$store.dispatch('tryAutoSignin')
    }
  };
</script>
