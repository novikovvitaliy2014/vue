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
      <!-- <img :src="project.imageUrl"/> -->
      <router-link :to="'/private-projects/' + project.id">view project</router-link>
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
      auth() {
        return this.$store.getters.isAuthenticated !== null && this.$store.getters.isAuthenticated !== undefined
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
    },
    created() {
      this.$store.dispatch('loadProjects')
      // this.$store.dispatch('tryAutoSignin')
    }
  };
</script>
