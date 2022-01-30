<template>
  <div class="main">
    <v-subheader>Szybkie akcje</v-subheader>

    <v-divider/>

    <v-list class="list">
      <v-list-item-group>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn plain height="20" small>Moje zamówienia</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn plain height="20" small>Obserwowane oferty</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <v-list-item-group>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn plain height="20" small>Moje oferty</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn
                  plain
                  height="20"
                  small
                  to="/add-offer"
              >Wystaw ofertę</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({})
</script>

<style scoped>
  .main {
    display: flex;
    flex-direction: column;
    background: linear-gradient(
        to right bottom,
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.8)
    );
  }

  .list {
    border-radius: 5pt;
    background: rgba(255, 255, 255, 0);
  }
</style>
