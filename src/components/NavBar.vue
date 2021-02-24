<template>
  <v-app-bar
    app
    color="white"
    flat
  >
<!--    <router-link class="menu-link" to="/">Home</router-link> |-->
<!--    <span v-if="isLoggedIn">-->
<!--      <a @click="logout">Logout</a>-->
<!--    </span>-->
<!--    <span v-else>-->
<!--      <router-link class="menu-link" to="/register">Register</router-link> |-->
<!--      <router-link class="menu-link" to="/login">Login</router-link>-->
<!--    </span>-->

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
          label="Czego szukasz, cwelu?"
        ></v-text-field>
      </v-responsive>
<!--      <v-spacer></v-spacer>-->
      <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
      >
      </v-avatar>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      links: [
      ]
    }
  },
  computed: {
    isLoggedIn : function () {
      return this.$store.getters.isAuthenticated
    },
    userImg : function () {
      return this.$store.getters.stateUser.img;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      await this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .bar {
    /*position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 20pt;
    padding: 10pt;
    margin-bottom: 20pt;
    background-color: #2c3e50;*/


    .menu-link {
      font-weight: bold;
      color: #ffffff;

      :hover {
        cursor: pointer;
      }

      :visited {
        color: white;
      }
    }

    a.router-link-exact-active {
      color: #42b983;
    }
  }

</style>