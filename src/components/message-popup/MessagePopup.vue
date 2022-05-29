<template>
  <v-snackbar
      v-model="showPopup"
      right
      bottom
      multi-line
      light
  >
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="showPopup = false"
      >{{ closeMessage }}</v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';

export default defineComponent({
  props: {
    value: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    closeMessage: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const showPopup = computed({
      get: () => props.value,
      set: (value: Boolean) => emit('input', value)
    });

    return {
      showPopup
    }
  }
});
</script>

<style scoped>

</style>
