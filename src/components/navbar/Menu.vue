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
        <span class="user-avatar-name">{{ userAvatarName }}</span>
      </v-avatar>
    </template>
    <v-list>
      <v-list-item>
        Witaj, {{ userFirstName }}
      </v-list-item>
      <v-list-item
          v-for="link in menuItems"
          :key="link.name"
      >
        <v-list-item-title>
          <router-link :to="link.url">{{ link.name }}</router-link>
        </v-list-item-title>
      </v-list-item
      >
      <v-list-item
          v-if="isUserAuthenticated">
        <v-list-item-title>
          <v-btn elevation="0" @click="logout()">Wyloguj</v-btn>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserModule } from "@/store/modules/user-store/user-store";

interface MenuLink {
  name: string;
  url: string;
  loginRequired: boolean;
}

@Component
export default class Menu extends Vue {
  private menuLinks: MenuLink[] = [
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
  ];

  get user() {
    return UserModule.loggedUser;
  }

  get menuItems(): MenuLink[] {
    return this.menuLinks.filter((link: MenuLink) => (this.user !== undefined) === link.loginRequired);
  }

  get userFirstName(): string {
    return (this.user?.firstName === undefined) ? 'Gościu' : this.user.firstName;
  }

  get isUserAuthenticated(): boolean {
    return UserModule.loggedUser !== undefined;
  }

  get userAvatarName(): string {
    if (this.user === undefined)
      return 'G';
    else {
      return this.user.firstName[0].toUpperCase() + this.user.lastName[0].toUpperCase();
    }
   }

  async logout(): Promise<void> {
    this.$store.dispatch('logout')
      .then(() => this.$router.push('/login'));
  }
}
</script>

<style scoped>
.user-avatar-name {
  color: #c7c7c7
}
</style>