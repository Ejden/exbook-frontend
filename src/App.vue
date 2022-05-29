<template>
  <v-app>
    <NavBar/>
    <v-main class="app">
      <router-view class="margin-bottom-16" :key="$route.fullPath"/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Footer from "@/components/FooterBar.vue";
import NavBar from "@/components/NavBar.vue";
export default defineComponent({
  components: {
    NavBar,
    Footer
  }
});
</script>

<style>
  .app {
    background: #e6e6e6;
  }
</style>
