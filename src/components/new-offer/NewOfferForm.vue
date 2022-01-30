<template>
  <v-card>
    <v-window>
      <v-window-item>
        <v-card-text>
          <div class="d-flex align-top">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#488fef" class="bi bi-camera" viewBox="0 0 16 16">
              <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
              <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
            </svg>
            <div class="mt-4 ml-4">
              <h2 class="form-label mb-2">Dodaj zdjęcia książki</h2>
              <span>Dodaj do 10 zdjęć w formacie PNG, JPG, BMP</span>
            </div>
          </div>
          <v-file-input
            v-model="pictures"
            class="mt-5"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Zdjęcia oferty"
            outlined
            counter
            multiple
          ></v-file-input>
        </v-card-text>

        <v-divider/>

        <v-card-text>
          <label class="form-label">ISBN</label>
          <v-text-field
            outlined
            v-model="offerFormIsbn"
            :rules="[rules.counter(offerFormIsbn, 9)]"
          />
        </v-card-text>

        <v-divider/>

        <v-card-text>
          <label class="form-label">Tytuł książki*</label>
          <v-text-field
            outlined
            v-model="offerFormTitle"
            :rules="[rules.required, rules.counter(offerFormTitle, 30)]"
            maxlength="30"
            counter
          />
          <label class="form-label">Autor książki*</label>
          <v-text-field
            outlined
            v-model="offerFormAuthor"
            counter
            :rules="[rules.required, rules.counter(offerFormTitle, 25)]"
            maxlength="25"
          />
          <label class="form-label">Opis</label>
          <v-textarea
              outlined
              v-model="offerFormDescription"
              counter
              :rules="[rules.counter(offerFormDescription, 300)]"
              maxlength="300"
          />
        </v-card-text>

        <v-card-text>
          <label class="form-label">Kategoria*</label>
          <CategoriesSelectableList v-on:changedCategory="pushCategoryFromChildTreeToForm"/>
        </v-card-text>

        <v-card-text class="d-flex flex-column">
          <label class="form-label">Stan książki*</label>

          <v-btn-toggle
            mandatory
            class="d-flex flex-column"
            v-model="offerFormCondition"
          >
            <v-btn
                outlined
                color="blue-lighten-4"
                v-for="(condition, index) in conditions" :key="index"
                :value="condition.condition"
            >{{ condition.name }}</v-btn>
          </v-btn-toggle>
        </v-card-text>

        <v-divider/>

        <v-card-text>
          <label class="form-label">Rodzaj oferty*</label>

          <v-btn-toggle
            mandatory
            class="d-flex flex-column"
            v-model="offerFormType"
          >
            <v-btn
              outlined
              v-for="offerType in offerTypes" :key="offerType.type"
              :value="offerType"
            >
              {{ offerType.name }}
            </v-btn>
          </v-btn-toggle>

          <div v-if="offerFormType.buyAbility" class="mt-6">
            <span class="form-label">Cena książki*</span>
            <v-text-field
                v-model="offerFormPrice"
                suffix="zł"
                placeholder="0.00"
                outlined
                label="Cena"
                class="price-input"
            />
          </div>
        </v-card-text>

        <v-divider/>

        <v-card-text>
          <label class="form-label">Lokalizacja*</label>
          <v-text-field
              v-model="offerFormLocation"
              outlined
              placeholder="Wpisz miasto"
          ></v-text-field>
        </v-card-text>

        <v-divider/>

        <shipping-methods @changeShipping="updateSelectedShippingMethods"/>

        <v-divider/>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from '@vue/composition-api';
import CategoriesSelectableList from '@/components/new-offer/CategoriesSelectableList.vue';
import ShippingMethods from './ShippingMethods.vue';
import { Category } from '@/api/CategoryApi';
import { Store } from 'vuex';

interface Rules {
  required: any;
  counter: any;
}

export default defineComponent({
  components: {
    ShippingMethods,
    CategoriesSelectableList
  },
  setup(_, { root }) {
    const rules = ref<Rules>({
      required: (value: string) => !!value || 'Wymagane',
      counter: (value: string, max: number) => {
        if (value == null) return true;
        return value.length <= max || 'Max ' + max + ' characters';
      }
    });
    const pictures = ref([]);
    const conditions = [
      {
        condition: 'NEW',
        name: 'Nowa'
      },
      {
        condition: 'PERFECT',
        name: 'Brak śladów użytkowania'
      },
      {
        condition: 'LIGHTLY_USED',
        name: 'Nosi ślady użytkowania'
      },
      {
        condition: 'MODERATELY_USED',
        name: 'Nosi liczne ślady użytkowania'
      },
      {
        condition: 'BAD',
        name: 'W złym stanie'
      }
    ];
    const selectedCondition = ref('');
    const price = ref('0.00');
    const offerTypes = [
      {
        name: 'KUPNO I WYMIANA',
        type: 'EXCHANGE_AND_BUY',
        buyAbility: true
      },
      {
        name: 'TYLKO KUPNO',
        type: 'BUY_ONLY',
        buyAbility: true
      },
      {
        name: 'TYLKO WYMIANA',
        type: 'EXCHANGE_ONLY',
        buyAbility: false
      }
    ];

    const pushCategoryFromChildTreeToForm = (payload: Category) => {
      root.$store.commit('updateSelectedCategoriesInNewOfferForm', payload);
    }

    const updateSelectedShippingMethods = (selectedShippingMethods: any) => {
      root.$store.commit('updateShippingMethodsInNewOfferForm', selectedShippingMethods);
    }

    const {
      offerFormIsbn,
      offerFormTitle,
      offerFormAuthor,
      offerFormDescription,
      offerFormCondition,
      offerFormType,
      offerFormPrice,
      offerFormLocation,
      offerFormShippingMethods
    } = offerModifiers(root.$store);

    onMounted(() => {
      updateSelectedShippingMethods(undefined);
    });

    return {
      rules,
      pictures,
      conditions,
      selectedCondition,
      price,
      offerTypes,
      pushCategoryFromChildTreeToForm,
      updateSelectedShippingMethods,
      offerFormIsbn,
      offerFormTitle,
      offerFormAuthor,
      offerFormDescription,
      offerFormCondition,
      offerFormType,
      offerFormPrice,
      offerFormLocation,
      offerFormShippingMethods
    }
  }
})

function offerModifiers(store: Store<any>) {
  const offerFormIsbn = computed({
    get: () => store.getters.newOfferForm.book.isbn,
    set: (value: string) => store.commit('updateIsbnInNewOfferForm', value)
  });

  const offerFormTitle = computed({
    get: () => store.getters.newOfferForm.book.title,
    set: (value: string) => store.commit('updateBookTitleInNewOfferForm', value)
  });

  const offerFormAuthor = computed({
    get: () => store.getters.newOfferForm.book.author,
    set: (value: string) => store.commit('updateBookAuthorInNewOfferForm', value)
  });

  const offerFormDescription = computed({
    get: () => store.getters.newOfferForm.description,
    set: (value: string) => store.commit('updateDescriptionInNewOfferForm', value)
  });

  const offerFormCondition = computed({
    get: () => store.getters.newOfferForm.book.condition,
    set: (value: string) => store.commit('updateBookConditionInNewOfferForm', value)
  });

  const offerFormType = computed({
    get: () => store.getters.newOfferForm.type,
    set: (value: string) => store.commit('updateTypeInNewOfferForm', value)
  });

  const offerFormPrice = computed({
    get: () => store.getters.newOfferForm.price,
    set: (value: string) => store.commit('updatePriceInNewOfferForm', value)
  });

  const offerFormLocation = computed({
    get: () => store.getters.newOfferForm.location,
    set: (value: string) => store.commit('updateLocationInNewOfferForm', value)
  });

  const offerFormShippingMethods = computed({
    get: () => store.getters.newOfferForm.shippingMethods,
    set: (value: string) => store.commit('updateShippingMethodsInNewOfferForm', value)
  });

  return {
    offerFormIsbn,
    offerFormTitle,
    offerFormAuthor,
    offerFormDescription,
    offerFormCondition,
    offerFormType,
    offerFormPrice,
    offerFormLocation,
    offerFormShippingMethods
  }
}
</script>

<style scoped>
  .form-label {
    font-weight: 500;
  }
</style>