<template>
  <section class="donors">
    <!-- <button class="btn" @click="showList">open participants
      <v-icon dark medium>keyboard_arrow_down</v-icon>
    </button> -->
    <!-- <v-select
      class="project__select"
      v-model="selected"
      :items="adresses"
      label="Select the project"
      @input="getDonors"
      required>
    </v-select> -->
    <!-- v-if="showParticipants" -->
    <section class="donors__pro" v-if="contacts">
      <h1 >{{$t('list')}}</h1>

      <div class="donors__row donors__row--head">
        <div class="donors__cell">{{$t('donation')}}</div>
        <div class="donors__cell">{{$t('nickname')}}</div>
      </div>
      <div v-for="(contact, index) in contacts"
          :key="index">
        <div class="donors__row" v-if="contact.donation">
          <div class="donors__cell">{{ contact.donation }} $</div>
          <div class="donors__cell">{{ contact.nickname }}</div>
        </div>
      </div>
      <div class="donors__row donors__row--got-donations">
        <div class="donors__cell">{{ gotDonations }} $</div>
        <div class="donors__cell">{{$t('Raised')}}</div>
      </div>
      <div class="donors__row donors__row--need-donations">
        <div class="donors__cell">{{ sum }} $</div>
        <div class="donors__cell">{{$t('demand')}}</div>
      </div>
      <div class="donors__row donors__row--rest-donations">
        <div class="donors__cell">{{ restDonation }} $</div>
        <div class="donors__cell">{{$t('needed')}}</div>
      </div>
    </section>
  </section>
</template>

<script>
// import donors from "./../../data/donorsEn.js"
export default {
  props: {
      id: String,
      sum: Number
  },
  // data() {
  //   return {
  //   }
  // },
  computed: {
    gotDonations() {
      let sumDonations = null
      if(this.contacts){
        for (let i  in this.contacts) {
          if(this.contacts[i].donation !== undefined){
            sumDonations = sumDonations + Number(this.contacts[i].donation)
          }
        }
        return sumDonations
      } else {
        return null
      }
    },
    restDonation() {
      let need = this.sum
      let sum = this.gotDonations
      let rest = need - sum
      return rest
    },
    project(){
      return this.$store.getters.project(this.id)
    },
    contacts(){
      return this.project.contacts
    }
  },
  // methods: {
  // },
  // created () {
  // }
};
</script>
