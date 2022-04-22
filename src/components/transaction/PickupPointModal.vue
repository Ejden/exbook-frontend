<template>
  <v-dialog
      v-model="showModal"
      :width="width"
      :fullscreen="$vuetify.breakpoint.mobile"
  >
    <template v-slot:activator="{ on, attrs }">
      <slot v-bind="attrs" v-on="on"/>
    </template>

    <v-card>
      <v-card-title>Wybierz punkt odbioru</v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field
              label="Imię i nazwisko"
              dense
              outlined
              v-model="address.firstAndLastName"
              :rules="rules.textField"
              required
          />

          <v-text-field
              label="Numer telefonu"
              dense
              outlined
              v-model="address.phoneNumber"
              :rules="rules.textField"
              required
          />

          <v-text-field
              label="Email"
              dense
              outlined
              v-model="address.email"
              :rules="rules.textField"
          />

          <v-text-field
              label="Numer paczkomatu"
              dense
              outlined
              v-model="address.pickupPointId"
              :rules="rules.textField"
          />
        </v-form>

        <div>
          <v-btn
              block
              color="primary"
              @click.prevent="submit"
          >
            Zatwierdź
          </v-btn>

          <v-btn
              text
              block
              color="primary"
              @click="closeModal"
              class="margin-top-8"
          >
            Anuluj
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { PreviewPurchasePickupPointData } from '@/api/TransactionApi';

export default defineComponent({
  props: {
    value: {
      type: Boolean,
      required: true
    },
    width: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const showModal = computed({
      get: () => props.value,
      set: (value: boolean) => emit('input', value)
    });
    const closeModal = () => showModal.value = false;
    const address = ref({
      firstAndLastName: '',
      phoneNumber: '',
      email: '',
      pickupPointId: ''
    } as PreviewPurchasePickupPointData);
    const rules = {
      textField: [
        (value: string) => value.trim().length !== 0 || 'Wymagane'
      ]
    };
    const submit = () => {
      if (validateForm(address.value)) {
        emit('pickupPointUpdated', address.value);
        closeModal();
      }
    }

    return {
      showModal,
      address,
      rules,
      submit,
      closeModal
    }
  }
});

function validateForm(form: PreviewPurchasePickupPointData): boolean {
  return !(form.firstAndLastName.trim().length === 0 ||
      form.email.trim().length === 0 ||
      form.phoneNumber.trim().length === 0 ||
      form.pickupPointId.trim().length === 0);
}
</script>

<style scoped>

</style>
