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
import { defineComponent, ref, computed } from '@vue/composition-api';
import { userModuleStore } from '@/utils/store-accessor';
import { MenuLink } from './typings/MenuLink';

export default defineComponent({
  setup() {
    const menuLinks = ref<MenuLink[]>([
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
    ]);

    const user = computed(() => userModuleStore.getLoggedUser);

    const isUserAuthenticated = computed(() => user.value !== undefined);

    const menuItems = computed(() =>
        menuLinks.value.filter((link: MenuLink) => isUserAuthenticated.value === link.loginRequired));

    const userFirstName = computed(() => isUserAuthenticated.value ? user.value?.firstName : 'Gościu');

    const userAvatarName = computed(() => isUserAuthenticated.value ?
        user.value!.firstName[0].toUpperCase() + user.value!.lastName[0].toUpperCase() : 'G');

    const logout = () => userModuleStore.logout();

    return {
      menuLinks,
      menuItems,
      userFirstName,
      isUserAuthenticated,
      userAvatarName,
      logout
    }
  }
})
</script>

<style scoped>
.user-avatar-name {
  color: #c7c7c7
}
</style>
