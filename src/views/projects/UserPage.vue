<template>
  <div class="user-page">
    <h1 >User Page</h1>
    <section>
      <div v-for="(contact, index) in contacts"
          :key="index">
        <div class="donors__row">
          <div class="donors__cell">{{ contact.nickname }} </div>
          <div class="donors__cell">{{ contact.contact }}</div>
          <div class="donors__cell">
          <v-text-field
            v-model="contact.donation"
            label="Donation"
            >
          </v-text-field>
          </div>
          <v-btn @click="saveToPublic(index)">Save to Public List</v-btn>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    // data() {
    //   return {
    //   }
    // },
    computed: {
      // auth() {
      //   return this.$store.getters.userId !== null && this.$store.getters.userId !== undefined
      // },
      // projects(){
      //   return this.$store.getters.projects
      // },
      project(){
        return this.$store.getters.projects.find((project) =>{
          return project.creatorId == this.$store.getters.userId
        })
      },
      contacts(){
        return this.project.contacts
      }
    },
    methods: {
      saveToPublic(index){
        if(!this.contacts[index].donation){
          alert("Enter donation sum")
          return
        }
        // console.log(this.contacts[index].id)
        const publicList = {
          donation: this.contacts[index].donation,
          nickname: this.contacts[index].nickname,
          contact: this.contacts[index].contact,
          id: this.contacts[index].id,
          index: index
        }
        this.$store.dispatch('editProject',
          publicList
        )
        // console.log(publicList)
      },
    },
    created() {
      this.$store.dispatch('tryAutoSignin')
      setTimeout(()=>{
        this.$store.dispatch('fetchUsers')
        this.$store.dispatch('loadProjects')
      },1500)

    }
  };
</script>

