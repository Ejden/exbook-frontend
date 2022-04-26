<template>
  <v-dialog
      v-model="showModal"
      fullscreen
  >
    <template v-slot:activator="{ on, attrs }">
      <slot v-bind="attrs" v-on="on"></slot>
    </template>

    <v-card>
      <v-card-title class="title">
        <span>{{ $t('listing.filtersModalTitle') }}</span>
        <v-btn
            icon
            @click="closeModal"
        >
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <left-panel/>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import LeftPanel from '@/components/listing/leftpanel/LeftPanel.vue';

export default defineComponent({
  components: {LeftPanel},
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    const showModal = computed({
      get: () => props.value,
      set: (value: boolean) => emit('input', value)
    });
    const closeModal = () => showModal.value = false;

    return {
      showModal,
      closeModal
    }
  }
});
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
}
</style>
