<template>
  <v-container class="main">
    <NewOfferForm class="new-offer-form"/>

    <div class="right-panel">
      <NewOfferTips v-on:createOffer="createOffer" class="new-offer-tips"/>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import NewOfferForm from '@/components/new-offer/NewOfferForm.vue';
import NewOfferTips from '@/components/new-offer/NewOfferTips.vue';

export default defineComponent({
  components: {
    NewOfferTips,
    NewOfferForm
  },
  setup(_, { root }) {
    const createOffer = () => root.$store.dispatch('addOffer');

    return {
      createOffer
    }
  }
})
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: row;
  gap: 10pt;
}

.new-offer-form {
  flex-basis: 67%;
}

.new-offer-tips {
  position: sticky;
  top: 70px;
}

.right-panel {
  flex-basis: 33%;
}

@media only screen and (max-width: 768px){
  .main {
    flex-direction: column;
  }
}
</style>
