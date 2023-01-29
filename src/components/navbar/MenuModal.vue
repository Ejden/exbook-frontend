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
        {{ $t('menu.modal.welcomeMsg') }}, {{ userFirstName }}
      </v-list-item>
      <v-list-item
          v-for="link in menuItems"
          :key="link.name"
      >
        <v-list-item-title>
          <router-link
              class="link"
              :to="link.url"
          >{{ link.name }}</router-link>
        </v-list-item-title>
      </v-list-item
      >
      <v-list-item
          v-if="isUserAuthenticated">
        <v-list-item-title>
          <v-btn elevation="0" @click="logout()">{{ $t('menu.modal.logout') }}</v-btn>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';
import { MenuLink } from './typings/MenuLink';
import { i18n } from '@/main';

export default defineComponent({
  setup(_, { root }) {
    const menuLinks = ref<MenuLink[]>([
      {
        name: i18n.t('menu.modal.myAccount') as string,
        url: '/my-account',
        loginRequired: true
      },
      // {
      //   name: i18n.t('menu.modal.messages') as string,
      //   url: '/messages',
      //   loginRequired: true
      // },
      {
        name: i18n.t('menu.modal.login') as string,
        url: '/login',
        loginRequired: false
      },
      {
        name: i18n.t('menu.modal.createAccount') as string,
        url: '/register',
        loginRequired: false
      }
    ]);

    const user = computed(() => root.$store.getters.getLoggedUser);

    const isUserAuthenticated = computed(() => user.value !== undefined);

    const menuItems = computed(() =>
        menuLinks.value.filter((link: MenuLink) => isUserAuthenticated.value === link.loginRequired));

    const userFirstName = computed(() => isUserAuthenticated.value ? user.value?.firstName : i18n.t('menu.modal.guest') as string,);

    const userAvatarName = computed(() => isUserAuthenticated.value ?
        user.value!.firstName[0].toUpperCase() + user.value!.lastName[0].toUpperCase() : 'G');

    const logout = () => root.$store.dispatch('logout');

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
