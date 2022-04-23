<template>
  <v-footer
    color="#1976d2"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
          v-for="link in links"
          :key="link.name"
          color="white"
          text
          rounded
          class="my-2"
        >
        {{link.name}}
      </v-btn>
      <v-col
          class="py-4 text-center white--text"
          cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Exbook</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { i18n } from '@/main';

interface FooterLink {
  name: string;
  url: string;
}

export default defineComponent({
  setup() {
    const links = ref<FooterLink[]>([
      {
        name: i18n.t('footer.homePage') as string,
        url: '/'
      },
      {
        name: i18n.t('footer.aboutUs') as string,
        url: '/'
      },
      {
        name: i18n.t('footer.team') as string,
        url: '/'
      },
      {
        name: i18n.t('footer.contact') as string,
        url: '/'
      }
    ]);

    return {
      links
    }
  }
})
</script>

<style scoped>

</style>
