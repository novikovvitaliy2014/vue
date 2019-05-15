<template>
  <section class="donors">
    <button class="btn" @click="showList">open participants
      <v-icon dark medium>keyboard_arrow_down</v-icon>
    </button>
    <!-- <v-select
      class="project__select"
      v-model="selected"
      :items="adresses"
      label="Select the project"
      @input="getDonors"
      required>
    </v-select> -->
    <section class="donors__pro" v-if="showParticipants">
      <h1 >{{$t('list')}}</h1>
      <div class="donors__row donors__row--head">
        <div class="donors__cell">{{$t('donation')}}</div>
        <div class="donors__cell">{{$t('nickname')}}</div>
      </div>
      <div v-for="donor in donors"
          :key="donor.pseudo">
        <div class="donors__row">
          <div class="donors__cell">{{ donor.donation }} $</div>
          <div class="donors__cell">{{ donor.pseudo }}</div>
        </div>
      </div>
      <div class="donors__row donors__row--got-donations">
        <div class="donors__cell">{{ gotDonations(donors) }} $</div>
        <div class="donors__cell">{{$t('Raised')}}</div>
      </div>
      <div class="donors__row donors__row--need-donations">
        <div class="donors__cell">{{ needDonations(outlayBaker) }} $</div>
        <div class="donors__cell">{{$t('demand')}}</div>
      </div>
      <div class="donors__row donors__row--rest-donations">
        <div class="donors__cell">{{ restDonation(outlayBaker, donors)}} $</div>
        <div class="donors__cell">{{$t('needed')}}</div>
      </div>
    </section>
    <!-- <section class="donors__pro" v-if="selected === 'School №53'">
      <div v-for="user in usersSchool"
          :key="user.idToken">
      <div class="donors__row">
        <div class="donors__cell">{{ user.donation }} &#8364;</div>
        <div class="donors__cell">{{ user.pseudo }}</div>
      </div>
      </div>
      <div class="donors__row donors__row--got-donations">
        <div class="donors__cell">{{ gotDonations(usersSchool) }} &#8364;</div>
        <div class="donors__cell">Raised</div>
      </div>
      <div class="donors__row donors__row--need-donations">
        <div class="donors__cell">{{ needDonations(outlaySchool) }} &#8364;</div>
        <div class="donors__cell">Project demand</div>
      </div>
      <div class="donors__row donors__row--rest-donations">
        <div class="donors__cell">{{ restDonation(outlaySchool, usersSchool) }} &#8364;</div>
        <div class="donors__cell">Still needed</div>
      </div>
    </section> -->
  </section>
</template>

<script>
import donors from "./../../data/donorsEn.js"
export default {
  data() {
    return {
      // adresses: ["Baker Street","School №53"],
      // selected: '',
      outlayBaker: [],
      donors: donors,
      showParticipants: false
      // outlaySchool: []
    }
  },
  methods: {
    showList(){
      this.showParticipants = !this.showParticipants
    },
    gotDonations(donations) {
      let sumDonations = null
      for (let item of donations) {
        sumDonations = sumDonations + Number(item.donation)
      }
      return sumDonations
    },
    needDonations(outlay) {
      // let needSum = 0;
      let sum = 0
      for (let item of outlay ) {
        sum = sum + item.num * item.price
      }
      // needSum = sum + sum * 0.1
      return sum
    },
    restDonation(outlay, donations) {
      let need = this.needDonations(outlay)
      let sum = this.gotDonations(donations)
      let rest = need - sum
      return rest
    }
    // getDonors() {
    //   this.$store.dispatch('fetchUsers')
    // }
  },
  computed: {
    // donors() {
    //   return this.$store.getters.usersBaker
    // },
    // usersSchool() {
    //   return this.$store.getters.usersSchool
    // },
  },
  created () {
    this.$store.dispatch('initOutlay')
    this.outlayBaker = this.$store.getters.outlayBaker
    // this.outlaySchool = this.$store.getters.outlaySchool
  }
};
</script>
