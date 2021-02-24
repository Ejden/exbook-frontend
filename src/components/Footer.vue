<template>
  <v-footer
    color="primary lighten-1"
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
          class="primary lighten-1 py-4 text-center white--text"
          cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Exbook</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      links: [
        {
          name: 'STRONA GŁÓWNA',
          url: '/'
        },
        {
          name: 'O NAS',
          url: '/'
        },
        {
          name: 'ZESPÓŁ',
          url: '/'
        },
        {
          name: 'KONTAKT',
          url: '/'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>