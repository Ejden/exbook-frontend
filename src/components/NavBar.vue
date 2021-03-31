<template>
  <v-app-bar
    app
    color="#ffffff"
    elevation="1"
  >
    <v-container class="app-bar">
      <router-link class="home-logo-button" to="/">
        <v-img
            src="/img/Exbook_cr.svg"
            height="32"
            alt="Logo"
            contain
            max-width="102"
        />
      </router-link>

      <v-text-field
        v-model="searchText"
        class="search-bar"
        dense
        flat
        hide-details
        solo-inverted
        label="Czego szukasz?"
        @keydown.enter="search"
      />

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
    </v-container>
  </v-app-bar>
</template>

<script>
import Menu from "@/components/navbar/Menu";

export default {
  name: "NavBar",
  components: {Menu},
  data() {
    return {
      searchText: ''
    }
  },
  methods: {
    search() {
      this.$router.push('/listing')
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
  }

  .search-bar-container {
  }

  .search-bar {
    max-width: 600px;
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
  }
</style>