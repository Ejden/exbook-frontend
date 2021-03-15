<template>
  <v-app-bar
    app
    color="white"
    elevation="1"
  >
    <div class="app-bar">
      <router-link class="home-logo-button" to="/">
        <v-img
            content-class="site-logo"
            src="img/Exbook_cr.svg"
            height="32"
            alt="Logo"
            contain
            max-width="102"
        />
      </router-link>

      <v-text-field
        class="search-bar"
        dense
        flat
        hide-details
        solo-inverted
        label="Czego szukasz?"
      ></v-text-field>

      <div>
        <v-btn
            outlined
            plain
            v-if="isUserLoggedIn"
            to="/add-offer"
            class="new-offer-button"
        >
          <span>Dodaj ofertę</span>
        </v-btn>

        <Menu/>
      </div>
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
  .app-bar {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .search-bar {
    max-width: 700px;

  }

  @media only screen and (max-width: 768px) {
    .new-offer-button {
      display: none;
    }
    .home-logo-button {

    }
    .app-bar {
      display: flex !important;
      justify-content: flex-start !important;
    }
    .site-logo {

    }
  }
</style>