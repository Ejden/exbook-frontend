<template>
  <div class="main">
    <v-subheader>{{ $t('myAccount.quickActions') }}</v-subheader>

    <v-divider/>

    <v-list class="list">
      <v-list-item-group>
        <v-list-item>
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

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn
                  class="button"
                  text
                  height="20"
                  small
                  :ripple="false"
              >{{ $t('myAccount.observableOffers') }}</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
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

        <v-list-item @click="$router.push({ name: 'NewOffer' })">
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

export default defineComponent({})
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
