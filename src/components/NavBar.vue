<template id="template">
  <div class="bar">
    <router-link class="menu-link" to="/">Home</router-link> |
    <span v-if="isLoggedIn">
      <a @click="logout">Logout</a>
    </span>
    <span v-else>
      <router-link class="menu-link" to="/register">Register</router-link> |
      <router-link class="menu-link" to="/login">Login</router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    isLoggedIn : function () {
      return this.$store.getters.isAuthenticated
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