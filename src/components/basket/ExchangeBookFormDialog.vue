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
      <v-card-title>{{ $t('basket.bookModal.title') }}</v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field
              label="Autor"
              dense
              outlined
              v-model="book.author"
              :rules="rules.textField"
              required
          />

          <v-text-field
              label="Tytuł"
              dense
              outlined
              v-model="book.title"
              :rules="rules.textField"
              required
          />

          <v-text-field
              label="ISBN"
              dense
              outlined
              v-model="book.isbn"
              :rules="rules.isbn"
          />

          <v-select
              label="Stan"
              dense
              outlined
              :items="possibleBookConditions"
              v-model="book.condition"
          />

          <v-text-field
              label="Ilość"
              dense
              type="number"
              outlined
              v-model.number="book.quantity"
          />
        </v-form>

        <div class="action-buttons">
          <v-btn
              block
              color="primary"
              @click="submit"
          >
            {{ $t('basket.bookModal.add') }}
          </v-btn>

          <v-btn
              text
              block
              color="primary"
              @click="cancel"
          >
            {{ $t('basket.bookModal.cancel') }}
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watchPostEffect } from '@vue/composition-api';
import { BookCondition } from '@/api/BasketApi';
import { getConditionText } from '@/components/basket/mixins';

export interface Book {
  author: string;
  title: string;
  isbn?: string;
  quantity: number;
  condition: BookCondition;
}

interface BookConditionItem {
  text: string;
  value: BookCondition;
}

export default defineComponent({
  props: {
    showDialog: {
      type: Boolean,
      required: true
    }
  },
  setup(_, { emit }) {
    const book = ref({
      author: '',
      title: '',
      isbn: undefined,
      quantity: 1,
      condition: BookCondition.NEW
    } as Book);
    watchPostEffect(() => {
      if (book.value.quantity <= 0) {
        book.value.quantity = 1;
      }
    });
    const submit = () => {
      let validated = validateBook(book.value);
      if (validated) {
        emit('submit', book.value);
      }
    };
    const cancel = () => {
      emit('cancel');
    };
    const possibleBookConditions = Object.values(BookCondition).map(condition => {
      return {
        text: getConditionText(condition),
        value: condition
      } as BookConditionItem
    });
    const rules = {
      textField: [
        (value: string) => value?.trim().length !== 0 || 'Wymagane'
      ],
      isbn: [
        (value: string) => (value?.trim().length === 0 || value?.trim().length === 10 || value?.trim().length === 13) || 'ISBN musi składać się z 10 lub 13 znaków'
      ]
    };

    return {
      book,
      submit,
      cancel,
      possibleBookConditions,
      rules
    }
  }
});

function validateBook(book: Book): boolean {
  if (book.author.trim().length === 0) {
    return false;
  }

  if (book.title.trim().length === 0) {
    return false;
  }

  if (book.isbn !== undefined) {
    if (book.isbn.trim().length !== 10 && book.isbn.trim().length !== 13) {
      return false;
    }
  }

  return book.quantity > 0;
}
</script>

<style scoped>
.action-buttons {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
</style>
