<template>
  <div class="main">
    <v-subheader>{{ $t('myAccount.quickActions') }}</v-subheader>

    <v-divider/>

    <v-list class="list">
      <v-list-item-group>
        <v-list-item @click="goToMyOrders">
          <v-list-item-content>
            <v-list-item-title>
              <v-btn
                  class="button"
                  text
                  height="20"
                  small
                  :ripple="false"
              >{{ $t('myAccount.myOrders') }}</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="goToSoldOrders">
          <v-list-item-content>
            <v-list-item-title>
              <v-btn
                  class="button"
                  text
                  height="20"
                  small
                  :ripple="false"
              >{{ $t('myAccount.soldOrders') }}</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="goToMyOffers">
          <v-list-item-content>
            <v-list-item-title>
              <v-btn
                  class="button"
                  text
                  height="20"
                  small
                  :ripple="false"
              >{{ $t('myAccount.myOffers') }}</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="goToNewOfferForm">
          <v-list-item-content>
            <v-list-item-title>
              <v-btn
                  class="button"
                  text
                  height="20"
                  small
                  :ripple="false"
              >{{ $t('myAccount.createOffer') }}</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import router from '@/router';

export default defineComponent({
  setup() {
    const goToNewOfferForm = () => router.push({ name: 'NewOffer' });
    const goToMyOrders = () => router.push({ name: 'MyOrders' });
    const goToSoldOrders = () => router.push({ name: 'SoldOrders' });
    const goToMyOffers = () => router.push({ name: 'MyOffers' });

    return {
      goToNewOfferForm,
      goToMyOrders,
      goToSoldOrders,
      goToMyOffers
    }
  }
});
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}

.button:before {
  background: transparent;
}

.button:after {
  background: transparent;
}

.list {
  border-radius: 5pt;
}
</style>
