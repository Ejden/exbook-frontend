<template>
  <v-container class="body margin-top-16 rounded container-standard-background">
    <div>
      <h1 class="not-found-text">{{ $t('notFoundPage.code') }}</h1>
    </div>

    <div class="message-text">
      <h2>{{ $t('notFoundPage.title') }}</h2>

      <span>{{ $t('notFoundPage.description') }}</span>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
})
</script>

<style scoped>
.body {
  text-align: center;
  height: 50vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.not-found-text {
  font-size: 180pt;
  color: rgba(255, 84, 84, 0.8);
}

.message-text {
  font-size: 15pt;
}
</style>
