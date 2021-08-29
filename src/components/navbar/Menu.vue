<template>
  <v-menu offset-y>
    <template v-slot:activator="{on, attrs}">
      <v-avatar
          class="ml-10"
          color="grey darken-1"
          size="32"
          v-bind="attrs"
          v-on="on"
      >
        <span class="user-avatar-name">{{userAvatarName}}</span>
      </v-avatar>
    </template>
    <v-list>
      <v-list-item>
        Witaj, {{userFirstName}}
      </v-list-item>
      <v-list-item
          v-for="link in menuItemsToShow"
          :key="link.name"
      >
        <v-list-item-title>
          <router-link :to="link.url">{{link.name}}</router-link>
        </v-list-item-title>
      </v-list-item
      >
      <v-list-item
          v-if="isLoggedIn">
        <v-list-item-title>
          <v-btn elevation="0" @click="logout">Wyloguj</v-btn>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Menu",
  data() {
    return {
      links: [
        {
          name: 'Moje konto',
          url: '/my-account',
          loginRequired: true
        },
        {
          name: 'Wiadomości',
          url: '/messages',
          loginRequired: true
        },
        {
          name: 'Zaloguj',
          url: 'login',
          loginRequired: false
        },
        {
          name: 'Utwórz konto',
          url: '/register',
          loginRequired: false
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      stateUser: 'stateUser'
    }),
    isLoggedIn : function() {
      return this.$store.getters.isAuthenticated
    },
    userImg : function() {
      return this.$store.getters.stateUser.img;
    },
    userFirstName: function() {
      return (this.$store.getters.stateUser.firstName === null) ? 'Gościu' : this.$store.getters.stateUser.firstName
    },
    menuItemsToShow: function() {
      return this.links.filter((link) => this.isLoggedIn === link.loginRequired)
    },
    userAvatarName: function () {
      if (this.stateUser.firstName === null)
        return 'G'
      else {
        return this.stateUser.firstName[0].toUpperCase() + this.stateUser.lastName[0].toUpperCase()
      }
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

  .user-avatar-name {
    color: #c7c7c7
  }
</style>