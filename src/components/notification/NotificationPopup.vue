<template>
  <v-snackbar
    right
    bottom
    multi-line
    outlined
    light
    :value="value"
    @input="propagateValue"
  >
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn
          color="primary"
          text
          v-bind="attrs"
      >{{ closeButtonMessage }}</v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { NotificationType } from '@/components/notification/@types/NotificationType';
import { NotificationDuration } from '@/components/notification/@types/NotificationDuration';

export default defineComponent({
  props: {
    value: {
      type: Boolean,
      required: true
    },
    type: {
      type: String as PropType<NotificationType>,
      required: true
    },
    duration: {
      type: String as PropType<NotificationDuration>,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    closeButtonMessage: {
      type: String,
      required: false
    }
  },
  setup(_, { emit }) {
    const propagateValue = (event: any) => {
      emit('update:value', event.target.value)
    };

    return {
      propagateValue
    }
  }
})
</script>

<style scoped>

</style>
