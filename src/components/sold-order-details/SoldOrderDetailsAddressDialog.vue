<template>
  <v-dialog
      :value="showDialog"
      max-width="600px"
      @click:outside="cancel"
  >
    <template v-slot:activator="{ on, attrs }">
      <slot
          v-bind="attrs"
          v-on="on"
      />
    </template>

    <v-card>
      <v-card-title>{{ $t('soldOrderDetailsPage.addressDialog.title') }}</v-card-title>
      <v-card-subtitle>{{ $t('soldOrderDetailsPage.addressDialog.description') }}</v-card-subtitle>

      <v-card-text>
        <v-form>
          <v-radio-group v-model="deliveryType">
            <v-radio
                key="address"
                label="Adres"
                value="address"
            />

            <v-radio
                key="pickupPoint"
                label="Punkt dostawy"
                value="pickupPoint"
            />
          </v-radio-group>

          <div v-if="deliveryType === 'address'">
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
                label="Adres email"
                dense
                outlined
                v-model="address.email"
                :rules="rules.textField"
                required
            />
            <v-text-field
                label="Adres"
                dense
                outlined
                v-model="address.address"
                :rules="rules.textField"
                required
            />
            <v-text-field
                label="Kod pocztowy"
                dense
                outlined
                v-model="address.postalCode"
                :rules="rules.textField"
                required
            />
            <v-text-field
                label="Miasto"
                dense
                outlined
                v-model="address.city"
                :rules="rules.textField"
                required
            />
            <v-text-field
                label="Kraj"
                dense
                outlined
                v-model="address.country"
                :rules="rules.textField"
                required
            />
          </div>
          <div v-else>
            <v-text-field
                label="Imię i nazwisko"
                dense
                outlined
                v-model="pickupPoint.firstAndLastName"
                :rules="rules.textField"
                required
            />
            <v-text-field
                label="Numer telefonu"
                dense
                outlined
                v-model="pickupPoint.phoneNumber"
                :rules="rules.textField"
                required
            />
            <v-text-field
                label="Adres email"
                dense
                outlined
                v-model="pickupPoint.email"
                :rules="rules.textField"
                required
            />
            <v-text-field
                label="Numer punktu"
                dense
                outlined
                v-model="pickupPoint.pickupPointId"
                :rules="rules.textField"
                required
            />
          </div>
        </v-form>
      </v-card-text>

      <v-card-actions class="action-buttons">
        <v-btn
            block
            color="primary"
            @click="submit"
        >
          {{ $t('soldOrderDetailsPage.addressDialog.accept') }}
        </v-btn>

        <v-btn
            text
            block
            color="primary"
            @click="cancel"
        >
          {{ $t('soldOrderDetailsPage.addressDialog.cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from '@vue/composition-api';

interface Address {
  firstAndLastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
}

interface PickupPoint {
  firstAndLastName: string;
  phoneNumber: string;
  email: string;
  pickupPointId: string;
}

type DeliveryType = 'address' | 'pickupPoint'

export default defineComponent({
  props: {
    showDialog: {
      type: Boolean,
      required: true
    }
  },
  setup(_, { emit }) {
    const deliveryType = ref<DeliveryType>("address");
    const address = ref<Address>({
      firstAndLastName: '',
      phoneNumber: '',
      email: '',
      address: '',
      postalCode: '',
      city: '',
      country: ''
    });
    const pickupPoint = ref<PickupPoint>({
      firstAndLastName: '',
      phoneNumber: '',
      email: '',
      pickupPointId: ''
    });

    const cancel = () => {
      emit('cancel');
    };

    const rules = {
      textField: [
        (value: string) => value?.trim().length !== 0 || 'Wymagane'
      ]
    };

    const submit = () => {
      if (deliveryType.value === 'address') {
        validatedAction(address, validateAddress, validatedAddress => {
          emit('acceptExchangeWithAddress', validatedAddress);
        }, () => {});
      } else {
        validatedAction(pickupPoint, validatePickupPoint, validatedPickupPoint => {
          emit('acceptExchangeWithPickupPoint', validatedPickupPoint);
        }, () => {});
      }
    };

    return {
      cancel,
      submit,
      deliveryType,
      address,
      pickupPoint,
      rules
    }
  }
});
function validatedAction<T>(
    argument: Ref<T>,
    validation: (arg: T) => boolean,
    onValidated: (validatedArg: T) => void,
    onValidationFail: () => void
) {
  if (validation(argument.value)) {
    onValidated(argument.value);
  } else {
    onValidationFail();
  }
}

function validateAddress(address: Address): boolean {
  return address.firstAndLastName.trim().length !== 0 &&
      address.phoneNumber.trim().length !== 0 &&
      address.email.trim().length !== 0 &&
      address.address.trim().length !== 0 &&
      address.postalCode.trim().length !== 0 &&
      address.city.trim().length !== 0 &&
      address.country.trim().length !== 0;
}

function validatePickupPoint(pickupPoint: PickupPoint): boolean {
  return pickupPoint.firstAndLastName.trim().length !== 0 &&
      pickupPoint.phoneNumber.trim().length !== 0 &&
      pickupPoint.email.trim().length !== 0 &&
      pickupPoint.pickupPointId.trim().length !== 0;
}
</script>

<style scoped>
.action-buttons {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
</style>
