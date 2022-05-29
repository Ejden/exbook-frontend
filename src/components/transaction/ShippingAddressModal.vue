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
      <v-card-title>{{ $t('basketTransaction.shippingAddressModal.title') }}</v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field
              :label="$t('basketTransaction.shippingAddressModal.firstAndLastName')"
              dense
              outlined
              v-model="address.firstAndLastName"
              :rules="rules.textField"
              required
          />

          <v-text-field
              :label="$t('basketTransaction.shippingAddressModal.phoneNumber')"
              dense
              outlined
              v-model="address.phoneNumber"
              :rules="rules.textField"
              required
          />

          <v-text-field
              :label="$t('basketTransaction.shippingAddressModal.email')"
              dense
              outlined
              v-model="address.email"
              :rules="rules.textField"
          />

          <v-text-field
              :label="$t('basketTransaction.shippingAddressModal.address')"
              dense
              outlined
              v-model="address.address"
              :rules="rules.textField"
          />

          <v-text-field
              :label="$t('basketTransaction.shippingAddressModal.postalCode')"
              dense
              outlined
              v-model="address.postalCode"
              :rules="rules.textField"
          />

          <v-text-field
              :label="$t('basketTransaction.shippingAddressModal.city')"
              dense
              outlined
              v-model="address.city"
              :rules="rules.textField"
          />

          <v-text-field
              :label="$t('basketTransaction.shippingAddressModal.country')"
              dense
              outlined
              v-model="address.country"
              :rules="rules.textField"
          />
        </v-form>

        <div class="action-buttons">
          <v-btn
              block
              color="primary"
              @click.prevent="submit"
          >
            {{ $t('basketTransaction.shippingAddressModal.submit') }}
          </v-btn>

          <v-btn
              text
              block
              color="primary"
              @click="closeModal"
              class="margin-top-8"
          >
            {{ $t('basketTransaction.shippingAddressModal.cancel') }}
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { PreviewPurchaseShippingAddressData } from '@/api/TransactionApi';
import { i18n } from '@/main';

export default defineComponent({
  props: {
    width: {
      type: String,
      required: true
    },
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
    const address = ref({
      firstAndLastName: '',
      phoneNumber: '',
      email: '',
      address: '',
      postalCode: '',
      city: '',
      country: ''
    } as PreviewPurchaseShippingAddressData);
    const rules = {
      textField: [
        (value: string) => value.trim().length !== 0 || i18n.t('basketTransaction.shippingAddressModal.required')
      ]
    };
    const submit = () => {
      if (validateAddress(address.value)) {
        emit('deliveryAddressUpdated', address.value);
        closeModal();
      }
    }

    return {
      showModal,
      closeModal,
      address,
      rules,
      submit
    }
  }
});

function validateAddress(address: PreviewPurchaseShippingAddressData): boolean {
  return !(address.firstAndLastName.trim().length === 0 ||
      address.phoneNumber.trim().length === 0 ||
      address.email.trim().length === 0 ||
      address.address.trim().length === 0 ||
      address.postalCode.trim().length === 0 ||
      address.city.trim().length === 0 ||
      address.country.trim().length === 0);
}
</script>

<style scoped>

</style>
