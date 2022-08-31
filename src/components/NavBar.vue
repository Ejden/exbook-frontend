<template>
  <v-app-bar
    app
    color="rgba(255, 255, 255, 0.7)"
    elevation="3"
    elevate-on-scroll
    class="main"
  >
    <v-container v-if="!showFullSearchBar" class="app-bar">
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
        :label="$t('appBar.searchBar.message')"
        @keydown.enter="search"
      />

      <div>
        <v-icon class="mr-5 search-button" @click="openSearch">fas fa-search</v-icon>
        <v-icon v-if="isUserAuthenticated" v-on:click="$router.push('/checkout')">fas fa-shopping-basket</v-icon>
        <menu-modal/>
      </div>
    </v-container>

    <v-container v-else class="app-bar">
      <v-text-field
          v-model="searchText"
          dense
          flat
          hide-details
          solo-inverted
          :label="$t('appBar.searchBar.message')"
          @keydown.enter="search"
      />

      <v-icon @click="closeSearch" class="margin-left-8">fas fa-times</v-icon>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import MenuModal from '@/components/navbar/MenuModal.vue';

export default defineComponent({
  components: {
    MenuModal
  },
  setup(_, { root }) {
    const searchText = ref<string>('');
    const search = () => {
      if (searchText.value.trim().length !== 0) {
        root.$router.replace({ name: 'Listing', query: { search: searchText.value } }).catch(() => {})
      }
    }
    const showFullSearchBar = ref(false);

    const openSearch = () => {
      showFullSearchBar.value = true;
    }
    const closeSearch = () => {
      showFullSearchBar.value = false;
    }
    const isUserAuthenticated = computed(() => root.$store.getters.isUserAuthenticated);


    return {
      searchText,
      search,
      openSearch,
      closeSearch,
      showFullSearchBar,
      isUserAuthenticated
    }
  }
});
</script>

<style scoped>
.app-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.search-bar {
  max-width: 600px;
}

.search-button {
  display: none;
}

@media only screen and (max-width: 900px) {
  .app-bar {
    justify-content: space-between !important;
    padding: 0;
  }

  .search-bar {
    display: none;
  }

  .search-button {
    display: unset;
  }
}
</style>
