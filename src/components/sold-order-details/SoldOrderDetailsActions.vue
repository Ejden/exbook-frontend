<template>
  <div class="main">
    <v-btn
        class="button"
        elevation="0"
        text
        color="primary"
        large
    >
      {{ $t('soldOrderDetailsPage.action.accept') }}
    </v-btn>

    <v-btn
        class="button"
        elevation="0"
        text
        color="#1976d2"
        large
    >
      {{ $t('soldOrderDetailsPage.action.discard') }}
    </v-btn>

    <v-btn
        class="button"
        elevation="0"
        text
        color="#1976d2"
        large
    >
      {{ $t('soldOrderDetailsPage.action.sent') }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({

});
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}

.button:before {
  background: transparent;
}

@media screen and (max-width: 900px) {
  .main {
    align-items: center;
  }
}
</style>
