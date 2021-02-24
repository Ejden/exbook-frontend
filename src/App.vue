<template>
  <v-app>
    <NavBar>
    </NavBar>
    <v-main class="grey lighten-3">
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
