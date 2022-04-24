<template>
  <v-data-table
      :headers="tableHeaders"
      :items="exchangeBooks"
      class="books-table"
      hide-default-footer
  >
    <template #[`item.removeAction`]="{ item }">
      <v-btn icon>
        <v-icon
            size="18"
            @click="removeItem(item.id)"
        >far fa-trash-alt</v-icon>
      </v-btn>
    </template>
    <template #[`item.condition`]="{ item }">
      {{ getConditionText(item.condition) }}
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { DataTableHeader } from 'vuetify';
import { ExchangeBook } from '@/api/BasketApi';
import { getConditionText } from '@/components/basket/mixins';
import { i18n } from '@/main';

export default defineComponent({
  name: "BasketExchangingBooksTable",
  props: {
    exchangeBooks: {
      type: Array as PropType<Array<ExchangeBook>>,
      required: true
    }
  },
  setup(_, { emit }) {
    const tableHeaders = [
      {
        text: i18n.t('basket.booksTable.author'),
        value: 'author',
        class: 'pl-0',
        cellClass: 'pl-0'
      },
      {
        text: i18n.t('basket.booksTable.title'),
        value: 'title',
      },
      {
        text: i18n.t('basket.booksTable.isbn'),
        value: 'isbn',
      },
      {
        text: i18n.t('basket.booksTable.condition'),
        value: 'condition',
        width: '100pt'
      },
      {
        text: i18n.t('basket.booksTable.quantity'),
        value: 'quantity',
        width: '60pt',
        align: 'end'
      },
      {
        text: i18n.t('basket.booksTable.remove'),
        value: 'removeAction',
        width: '60pt',
        align: 'end',
        sortable: false,
        class: 'pr-0',
        cellClass: 'pr-0'
      }
    ] as Array<DataTableHeader>;
    const removeItem = (exchangeBookId: string) => {
      emit('removeItem', exchangeBookId);
    };

    return {
      tableHeaders,
      removeItem,
      getConditionText
    }
  }
})
</script>

<style scoped>
.books-table {
  background: transparent;
  margin: 0;
  padding: 0;
}

.book-row {
  padding: 0;
}
</style>
