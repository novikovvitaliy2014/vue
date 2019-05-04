<template>
  <div class="project__container project__container--baker">
    <h2 class="project__title">Project №1</h2>
    <h3 class="project__title">Mounting of 2 benches and laying slabs in the Baker Street</h3>
    <h4 class="project__title">Period of the participants engaging: 01.09.19.- 30.09.19.</h4>
    <div class="project__images">
      <div class="project__image">
        <p>Now</p>
        <div class="project__img project__img--before-bench">
        </div>
      </div>
      <div class="project__image">
        <p>Project Preview</p>
        <div class="project__img project__img--bench">
        </div>
      </div>
    </div>
    <div class="project__smeta" >
      <h2>{{$t("preliminary")}}</h2>
      <table>
        <tr v-html="$t('table-head')">
          <!-- <th>Resource</th>
          <th>Quantity</th>
          <th>Price of 1 item, $</th>
          <th>Sum, $</th> -->
        </tr>
        <tr v-for="row in smetaBaker"
            :key="row.name">
          <td>{{ row.name }}</td>
          <td>{{ row.num }}</td>
          <td>{{ row.price }}</td>
          <td >{{ multiplication(row.num, row.price) }}</td>
        </tr>
        <!-- <tr>
          <td>{{ $t('fee') }}</td>
          <td>10%</td>
          <td></td>
          <td>{{ salary(smetaBaker) }}</td>
        </tr> -->
        <tr>
          <td>{{$t("sum")}}</td>
          <td></td>
          <td></td>
          <td>{{ finalSum(smetaBaker) }}</td>
        </tr>
      </table>
    </div>

    <donate-btn></donate-btn>
    <donors></donors>

    <div class="smeta" >
      <h2>{{$t('final-outlay')}}</h2>
      <div class="smeta__row smeta__row--head"
           v-html="$t('table-head-final')">
        <!-- <span>Resource</span>
        <span>Quantity</span>
        <span>Price of 1 item, $</span>
        <span>Sum, $</span> -->
      </div>

      <section class="smeta__group">
        <div class="smeta__row">
          <span>{{$t('bench')}}</span>
          <span>2</span>
          <span>65</span>
          <span>130</span>
        </div>

          <div class="smeta__row smeta__row--btn">
            <button @click="showContacts(1)">{{$t('proof')}}</button>
          </div>

        <transition name="slide-fade">
          <div class="smeta-proof"
               v-if="showContact1"
               >
            <div class="smeta-proof__contacts">
              <h5>Ikea</h5>
              <span>38 050 456 78 99</span>
            </div>
            <img class="smeta-proof__bill" src="../../img/ikea.jpg" alt="walmart bill">
          </div>
        </transition>
      </section>
      <section class="smeta__group">
        <div class="smeta__row">
          <span>{{$t('slab')}}</span>
          <span>12</span>
          <span>5</span>
          <span>60</span>
        </div>

        <div class="smeta__row smeta__row--btn">
          <button @click="showContacts(2)">{{$t('proof')}}</button>
        </div>

        <transition name="slide-fade">
          <div class="smeta-proof"
               v-if="showContact2"
               >
            <div class="smeta-proof__contacts">
              <h5>Wallmart</h5>
              <span>38 050 456 78 99</span>
            </div>
            <img class="smeta-proof__bill" src="../../img/walmart.jpg" alt="walmart bill">
          </div>
        </transition>
      </section>
      <section class="smeta__group">
        <div class="smeta__row">
          <span>{{$t('work')}}</span>
          <span>10</span>
          <span>6</span>
          <span>60</span>
        </div>

        <div class="smeta__row smeta__row--btn">
          <button @click="showContacts(3)">{{$t('proof')}}</button>
        </div>

        <transition name="slide-fade">
          <div class="smeta-proof"
               v-if="showContact3"
               >
            <div class="smeta-proof__contacts">
              <h5>Multi Service </h5>
              <span>38 050 456 78 99</span>
            </div>
            <img class="smeta-proof__bill" src="../../img/invoice.png" alt="invoice">
          </div>
        </transition>
      </section>

      <div class="smeta__row">
        <span>{{$t('work-org')}}</span>
        <span>1</span>
        <span></span>
        <span>20</span>
      </div>

      <div class="smeta__row smeta__row--sum">
        <span>{{$t('sum')}}</span>
        <span></span>
        <span></span>
        <span>270</span>
      </div>
    </div>
    <h2>{{$t('photos')}}</h2>
    <section class="smeta__photos">
      <div class="smeta__photo">
        <img src="../../img/bench.jpg" alt="">
      </div>
      <div class="smeta__photo">
        <img src="../../img/bench.jpg" alt="">
      </div>
      <div class="smeta__photo">
        <img src="../../img/bench.jpg" alt="">
      </div>
      <div class="smeta__photo">
        <img src="../../img/bench.jpg" alt="">
      </div>
    </section>

    <!-- <div class="project__smeta" >
      <table>
        <caption>Final Priced outlay</caption>
        <tr>
          <th>Resource</th>
          <th>Quantity</th>
          <th>Price of 1 item, &#8364;</th>
          <th>Sum, &#8364;</th>
        </tr>
        <div v-for="row in finalSmetaBaker"
            :key="row.name" class="project__smeta-item">
          <div class="project__smeta-item-row">
            <div>{{ row.name }}</div>
            <div>{{ row.num }}</div>
            <div>{{ row.price }}</div>
            <div>{{ multiplication(row.num, row.price) }}</div>
          </div>
          <div class="project__smeta-info">Платежные документы и контакты поставщика материалов/услуг</div>
        </div>

        <tr>
          <td>Manager's fee</td>
          <td>10%</td>
          <td></td>
          <td>{{ salary(finalSmetaBaker) }}</td>
        </tr>
        <tr>
          <td>Final Sum:</td>
          <td></td>
          <td></td>
          <td>{{ finalSum(finalSmetaBaker) }}</td>
        </tr>
      </table>
    </div> -->
  </div>
</template>

<script>
import Donors from '../../views/donorsPage/Donors.vue'
import donateBtn from '../../components/projects/donateBtn.vue'
export default {
  components: {
    Donors,
    "donate-btn": donateBtn
  },
  data() {
    return {
      showContact1: false,
      showContact2: false,
      showContact3: false
      // smetaBaker: [],
      // finalSmetaBaker: []
    }
  },
  methods: {
    showContacts(n){
      if(n===1){
        this.showContact1 = !this.showContact1
      } else if (n===2){
        this.showContact2 = !this.showContact2
      } else if (n===3){
        this.showContact3 = !this.showContact3
      }
    },
    multiplication(num, price) {
      return num * price
    },
    // salary(smeta) {
    //   let sumTotal = 0
    //   for (let item of smeta ) {
    //     sumTotal = sumTotal + item.num * item.price
    //   }
    //   return sumTotal * 0.1
    // },
    finalSum(smeta) {
      let sumTotal = 0
      for (let item of smeta ) {
        sumTotal = sumTotal + item.num * item.price
      }
      return sumTotal
      // return this.salary(salaryFrom) * 10 + this.salary(salaryFrom)
    }
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated
    },
    smetaBaker(){
      return this.$store.getters.smetaBaker
    },
    finalSmetaBaker(){
      return this.$store.getters.finalSmetaBaker
    }

    // total(smeta) {
    //   // let smetaV = smeta
    //   // let smeta = this.$store.getters.smetaBaker
    //   // let smeta = this.$store.getters.finalSmetaBaker

    //   let sumTotal = 0
    //   for (let item of smeta ) {
    //     sumTotal = sumTotal + item.num * item.price
    //   }
    //   return sumTotal
    // },

  },
  created() {
    this.$store.dispatch('initSmeta')
    // this.smetaBaker = this.$store.getters.smetaBaker
    // this.finalSmetaBaker = this.$store.getters.finalSmetaBaker
  }
};
</script>
