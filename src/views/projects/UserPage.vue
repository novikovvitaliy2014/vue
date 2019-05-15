<template>
  <div class="user-page">
    <h1 >User Page</h1>
    <section v-if="true">
      <div v-for="(contact, index) in contacts"
          :key="index">
        <div class="donors__row">
          <div class="donors__cell">{{ contact.nickname }} </div>
          <div class="donors__cell">{{ contact.contact }}</div>
          <!-- <div class="donors__cell"> -->
          <v-text-field
            v-model="contact.donation"
            label="Donation"
            >
          </v-text-field>
          <!-- </div> -->
          <v-btn @click="saveToPublic(index)">Save to Public List</v-btn>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // contacts: []
        // projects: [],
        project: {},
        // contacts: {}
      }
    },
    computed: {
      auth() {
        return this.$store.getters.isAuthenticated !== null && this.$store.getters.isAuthenticated !== undefined
      },
      // projects(){
      //   return this.$store.getters.projects
      // },
      // project(){
      //   return this.$store.getters.projects.find((project) =>{
      //     return project.creatorId == this.$store.getters.userId
      //   })
      // },
      contacts(){
        return this.project.contacts
      }
    },
    methods: {
      saveToPublic(index){
        // let cont = this.contacts[index]
        console.log(this.contacts[index].id)
        const publicList = {
          donation: this.contacts[index].donation,
          nickname: this.contacts[index].nickname,
          id: this.contacts[index].id,
          index: index
        }
        console.log(publicList)
        this.$store.dispatch('editProject',
          publicList
        )
        console.log(publicList)
      },
      loadProjects(){
        this.$store.dispatch('loadProjects')
      },
      fetchProject(){
        setTimeout(() => {
          this.project = this.$store.getters.projects.find((project) =>{
            return project.creatorId == this.$store.getters.userId
          })
        }, 1500)
      },
      async load(){
        try {
          await this.loadProjects()
          await this.fetchProject()
        } catch (e) {
            console.log(e)
        }
      }
    },

    created() {
      this.load()
      // for(let i = 0; i < this.contacts.length; i++){
      //   if(!contacts[i].donation){
      //     contacts[i].donation = ''
      //   }
      // }
      // if()
      // this.contacts = this.project.contacts
      // this.$store.dispatch('loadProjects')

      // for(let i = 0; i < this.contacts.length; i++){
      //   let donation = 5
      //   this.contacts[i].push(donation)
      // }
      // console.log(this.project)
      // console.log(this.projects)
      // console.log(this.$store.getters.userId)
    },
    mounted(){
      // console.log(this.$store.getters.projects)
      // this.projects = this.$store.getters.projects
      // this.project = this.$store.getters.projects.find((project) =>{
      //     return project.creatorId == this.$store.getters.userId
      //   })
    }
  };
</script>

