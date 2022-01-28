<template>
  <v-app-bar
    app
    color="rgba(255, 255, 255, 0.7)"
    elevation="3"
    elevate-on-scroll
  >
    <v-container class="app-bar">
      <router-link to="/">
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
        <v-icon v-on:click="$router.push('/checkout')">fas fa-shopping-basket</v-icon>
        <Menu/>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import Menu from "@/components/navbar/Menu.vue";
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Menu
  }
})
export default class NavBar extends Vue {
  private searchText: string = '';

  search(): void {
    this.$router.push({ name: 'Listing', query: { search: this.searchText} });
  }
}
</script>

<style scoped>
  .app-bar {
    display: flex;
    justify-content: space-between;
  }

  .search-bar {
    max-width: 600px;
  }

  @media only screen and (max-width: 768px) {
    .app-bar {
      display: flex !important;
      justify-content: flex-start !important;
    }
  }
</style>