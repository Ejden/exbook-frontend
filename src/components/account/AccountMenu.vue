<template>
  <div class="main">
    <v-subheader>Szybkie akcje</v-subheader>

    <v-list>
      <v-list-item-group>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Moje zamówienia
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Obserwowane oferty
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <v-list-item-group>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Moje oferty
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Wystaw ofertę
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "AccountMenu"
}
</script>

<style scoped>
  .main {
    background: white;
    display: flex;
    flex-direction: column;
  }
</style>