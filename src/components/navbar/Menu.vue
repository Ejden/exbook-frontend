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
// eslint-disable-next-line no-unused-vars
import { LoggedUser } from "@/store/modules/user-store/types/user";
import { userModuleStore } from "@/utils/store-accessor";

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

  private get user(): LoggedUser | undefined {
    return userModuleStore.getLoggedUser;
  }

  private get menuItems(): MenuLink[] {
    return this.menuLinks.filter((link: MenuLink) => (this.user !== undefined) === link.loginRequired);
  }

  private get userFirstName(): string {
    return (this.user?.firstName === undefined) ? 'Gościu' : this.user.firstName;
  }

  private get isUserAuthenticated(): boolean {
    return this.user !== undefined;
  }

  private get userAvatarName(): string {
    if (this.user === undefined)
      return 'G';
    else {
      return this.user.firstName[0].toUpperCase() + this.user.lastName[0].toUpperCase();
    }
   }

  private async logout(): Promise<void> {
    await userModuleStore.logout();
  }
}
</script>

<style scoped>
.user-avatar-name {
  color: #c7c7c7
}
</style>
