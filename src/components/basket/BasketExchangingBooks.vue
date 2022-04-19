<template>
  <div>
    <h4>Propozycja wymiany</h4>

    <basket-exchanging-books-table
        :exchange-books="exchangeBooks"
        @removeItem="removeItemEventHandler"
    />

    <div class="buttons-container">
      <exchange-book-form-dialog
          :show-dialog="showDialog"
          @submit="addButtonHandler"
          @cancel="hideBookDialog"
      >
        <v-btn
            class="add-book-button"
            text
            color="primary"
            @click="addButtonToggle"
        >
          Dodaj książkę
        </v-btn>

      </exchange-book-form-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/composition-api';
import { ExchangeBook } from '@/api/BasketApi';
import BasketExchangingBooksTable from '@/components/basket/BasketExchangingBooksTable.vue';
import ExchangeBookFormDialog, { Book } from '@/components/basket/ExchangeBookFormDialog.vue';

export default defineComponent({
  components: {
    ExchangeBookFormDialog,
    BasketExchangingBooksTable
  },
  props: {
    exchangeBooks: {
      type: Array as PropType<Array<ExchangeBook>>,
      required: true
    }
  },
  setup(_, { emit }) {
    const showDialog = ref(false);
    const addButtonToggle = () => {
      showDialog.value = !showDialog.value;
    };
    const hideBookDialog = () => {
      showDialog.value = false;
    };
    const addButtonHandler = (book: Book) => {
      emit('addExchangeBook', book);
      hideBookDialog();
    };
    const removeItemEventHandler = (exchangeBookId: string) => {
      emit('removeExchangeBook', exchangeBookId);
    };

    return {
      showDialog,
      addButtonToggle,
      hideBookDialog,
      addButtonHandler,
      removeItemEventHandler
    }
  }
})
</script>

<style scoped>
.buttons-container {
  display: flex;
  justify-content: right;
}
</style>
