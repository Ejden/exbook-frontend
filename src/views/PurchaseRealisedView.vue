<template>
  <v-layout fill-height>
    <v-container
        class="margin-top-16 main"
    >
      <v-card elevation="0">
        <v-card-title>
          {{ $t('purchaseRealisedPage.title') }}
        </v-card-title>

        <v-card-text>
          {{ $t('purchaseRealisedPage.description') }}
        </v-card-text>

        <v-card-actions>
          <v-btn
              text
              block
              color="primary"
              @click="$router.push({ name: 'MyAccount' })"
          >
            {{ $t('purchaseRealisedPage.goToMyOrders') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({});
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
