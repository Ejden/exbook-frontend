<template>
  <div>
    <h4>{{ $t('basketTransaction.exchangeProposal') }}</h4>

    <v-data-table
        :headers="tableHeaders"
        :items="exchangeBooks"
        class="books-table"
        hide-default-footer
    >
      <template #[`item.condition`]="{ item }">
        {{ getConditionText(item.condition) }}
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { getConditionText } from '@/components/basket/mixins';
import { DraftOrderExchangeBook } from '@/api/TransactionApi';
import { DataTableHeader } from 'vuetify';

export default defineComponent({
  props: {
    exchangeBooks: {
      type: Array as PropType<Array<DraftOrderExchangeBook>>,
      required: true
    }
  },
  setup() {
    const tableHeaders = [
      {
        text: 'Autor',
        value: 'author',
        class: 'pl-0',
        cellClass: 'pl-0'
      },
      {
        text: 'Tytuł',
        value: 'title',
      },
      {
        text: 'ISBN',
        value: 'isbn',
      },
      {
        text: 'Kondycja',
        value: 'condition',
        width: '100pt'
      },
      {
        text: 'Ilość',
        value: 'quantity',
        width: '60pt',
        align: 'end'
      }
    ] as Array<DataTableHeader>;

    return {
      getConditionText,
      tableHeaders
    }
  }
});
</script>

<style scoped>
.books-table {
  background: transparent;
  margin: 0;
  padding: 0;
}

</style>
