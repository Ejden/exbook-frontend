<template>
  <v-app-bar
    app
    color="white"
    flat
    elevation="1"
  >
    <router-link to="/">
      <v-img
          src="img/Exbook_cr.svg"
          height="32"
          alt="Logo"
          contain
      />
    </router-link>
    <v-container class="py-0 fill-height">
      <v-responsive max-width="800">
        <v-text-field
          dense
          flat
          hide-details
          solo-inverted
          label="Czego szukasz?"
        ></v-text-field>
      </v-responsive>

    </v-container>
    <v-btn
        outlined
        plain
        v-if="isUserLoggedIn"
        to="/add-offer"
    >
      <span>Dodaj ofertę</span>
    </v-btn>
    <div>
      <Menu/>
    </div>

  </v-app-bar>
</template>

<script>
import Menu from "@/components/navbar/Menu";

export default {
  name: "NavBar",
  components: {Menu},
  data() {
    return {

    }
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>

<style scoped>

</style>