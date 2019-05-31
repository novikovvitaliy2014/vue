<template>
  <div class="private-projects">
    <h1>{{ $t('nav-projects') }}</h1>
    <p>{{ $t('projects-enter') }}</p>
    <v-text-field
      type="text"
      :rules="numberRules"
      label="ID"
      id="projectId"
      v-model='projectId'
      @focus="loadProjects"
      >
    </v-text-field>
    <section v-if="project" class="private-projects__project">
      <div class="private-projects__project-title">{{ project.title }}</div>
      <div class="private-projects__project-date"> {{ project.date | date }}</div>
      <div class="private-projects__project-description">{{ project.description }}</div>
      <router-link :to="'/private-projects/' + project.id"
        :project="project"
        tag="button"
        class="private-projects__project-btn btn"
        >{{ $t('view-project') }}
      </router-link>
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
      loadProjects(){
        this.$store.dispatch('loadProjects')

        setTimeout(()=>{
          if(!this.projects  || this.projects.length === 0) {
            this.$store.dispatch('logout')
          }
        },3000)
      }
    },
    created() {
      this.$store.dispatch('tryAutoSignin')
      this.$store.dispatch('resizeImages')
      setTimeout(()=>{
        if(!this.$store.getters.userId){
          this.$store.dispatch('logout')
        }
      }, 1000)
    }
  };
</script>
