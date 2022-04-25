<template>
  <div class="main">
    <v-subheader>{{ $t('myAccount.quickActions') }}</v-subheader>

    <v-divider/>

    <v-list class="list">
      <v-list-item-group>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn plain height="20" small>{{ $t('myAccount.myOrders') }}</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn plain height="20" small>{{ $t('myAccount.observableOffers') }}</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <v-list-item-group>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn plain height="20" small>{{ $t('myAccount.myOffers') }}</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn
                  plain
                  height="20"
                  small
                  to="/add-offer"
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
    background: linear-gradient(
        to right bottom,
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.8)
    );
  }

  .list {
    border-radius: 5pt;
    background: rgba(255, 255, 255, 0);
  }
</style>
