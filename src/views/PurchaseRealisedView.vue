<template>
  <v-layout fill-height>
    <v-container class="margin-top-16 main">
      <v-card>
        <v-card-title>
          Dziękujemy za zakup
        </v-card-title>

        <v-card-text>
          Szczegóły na temat tego zamówienia możesz znaleźć na swoim koncie
        </v-card-text>

        <v-card-actions>
          <v-btn
              text
              block
              color="primary"
              @click="$router.push({ name: 'MyAccount' })"
          >
            Przejdź do moich zamówień
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: "PurchaseRealisedView"
});
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
