<template>
  <v-container>
    <v-card>
      <h1></h1>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Offer",
  methods: {

  },
  created() {
    let offerUrl = 'api/v1/offers/' + this.$route.params.offerId
    axios.get(offerUrl).then(data => {
      console.log(data)
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style scoped>

</style>