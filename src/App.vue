<template>
  <v-app>
    <NavBar/>
<!--    <v-main class="grey lighten-3">-->
    <v-main class="app">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
      <div class="circle circle-4"></div>
      <router-view/>
    </v-main>
    <Footer>

    </Footer>
  </v-app>
</template>

<script>

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
export default {
  name: 'App',

  components: {
    NavBar,
    Footer

  },

  data: () => ({
    //
  }),
};
</script>

<style>
  .app {
    background: linear-gradient(
        to right bottom,
        rgba(124, 185, 232),
        rgba(172, 164, 245)
    );
  }

  .circle {
    position: fixed;
    border-radius: 100%;
    background: rgba(255, 255, 255, 0.2);
  }

  .circle-1 {
    width: 300pt;
    height: 300pt;
    top: 20%;
    left: 80%;
  }

  .circle-2 {
    width: 200pt;
    height: 200pt;
    top: 15%;
    left: 10%;
  }

  .circle-3 {
    width: 300pt;
    height: 300pt;
    top: 30%;
    left: 40%;
  }

  .circle-4 {
    width: 500pt;
    height: 500pt;
    top: 70%;
    left: -10%;
  }
</style>
