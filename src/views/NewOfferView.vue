<template>
  <v-container class="main">
    <NewOfferForm
        class="new-offer-form"
        @show-book-filling-error-message="showErrorPopup"
    />

    <div class="right-panel">
      <NewOfferTips v-on:createOffer="createOffer" class="new-offer-tips"/>
    </div>

    <message-popup
        v-model="errorPopupVisible"
        :message="$t('newOfferForm.errorFillingBookData')"
        :close-message="$t('newOfferForm.closeErrorFillingBookData')"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import NewOfferForm from '@/components/new-offer/NewOfferForm.vue';
import NewOfferTips from '@/components/new-offer/NewOfferTips.vue';
import MessagePopup from '@/components/message-popup/MessagePopup.vue';

export default defineComponent({
  components: {
    MessagePopup,
    NewOfferTips,
    NewOfferForm
  },
  setup(_, { root }) {
    const createOffer = () => root.$store.dispatch('addOffer');
    const errorPopupVisible = ref(false);

    const showErrorPopup = () => {
      errorPopupVisible.value = true;
    }

    return {
      createOffer,
      errorPopupVisible,
      showErrorPopup
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
