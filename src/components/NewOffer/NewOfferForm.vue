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
          <CategoriesSelectableList v-on:modifiedSelectedCategoriesEvent="pushCategoryFromChildTreeToForm"/>
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
                placeholder="0,00"
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

        <v-card-text>
          <span class="form-label">Metody dostawy*</span>

          <div>
            <div class="d-flex justify-space-between" v-for="shippingMethod in shippingMethods" :key="shippingMethod.id">
              <v-checkbox
                v-model="selectedShippingMethods"
                :label="shippingMethod.name"
                :value="shippingMethod"
                @change="updateSelectedShippingMethods"
              ></v-checkbox>
              <v-text-field
                class="shipping-price-input"
                outlined
                dense
                suffix="zł"
                v-model="shippingMethod.defaultCost.value"
                @change="updateSelectedShippingMethods"
              ></v-text-field>
            </div>
          </div>
        </v-card-text>

        <v-divider/>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import CategoriesSelectableList from "@/components/NewOffer/CategoriesSelectableList";
import axios from "axios";
import inputValidator from '@/mixin/validate-input.mixin'

export default {
  mixins: [inputValidator],
  name: "NewOfferForm",
  components: {CategoriesSelectableList},
  data: () => ({
    rules: {
      required: value => !!value || 'Wymagane',
      counter: (value, max) => {
        if (value === null) return true
        return value.length <= max || 'Max ' + max + ' characters'
      }
    },
    pictures: [],
    conditions: [
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
    ],
    selectedCondition: '',
    price: 0,
    offerTypes: [
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
    ],
    shippingMethods: [],
    selectedShippingMethods: []
  }),
  methods: {
    pushCategoryFromChildTreeToForm(payload) {
      this.$store.commit('updateSelectedCategoriesInNewOfferForm', payload)
    },
    updateSelectedShippingMethods() {
      this.$store.commit('updateShippingMethodsInNewOfferForm', this.selectedShippingMethods)
    }
  },
  computed: {
    offerFormIsbn: {
      get() {
        return this.$store.getters.newOfferForm.book.isbn
      },
      set(value) {
        this.$store.commit('updateIsbnInNewOfferForm', value)
      }
    },
    offerFormTitle: {
      get() {
        return this.$store.getters.newOfferForm.book.title
      },
      set(value) {
        this.$store.commit('updateBookTitleInNewOfferForm', value)
      }
    },
    offerFormAuthor: {
      get() {
        return this.$store.getters.newOfferForm.book.author
      },
      set(value) {
        this.$store.commit('updateBookAuthorInNewOfferForm', value)
      }
    },
    offerFormDescription: {
      get() {
        return this.$store.getters.newOfferForm.description
      },
      set(value) {
        this.$store.commit('updateDescriptionInNewOfferForm', value)
      }
    },
    offerFormCondition: {
      get() {
        return this.$store.getters.newOfferForm.book.condition
      },
      set(value) {
        this.$store.commit('updateBookConditionInNewOfferForm', value)
      }
    },
    offerFormType: {
      get() {
        return this.$store.getters.newOfferForm.type
      },
      set(value) {
        this.$store.commit('updateTypeInNewOfferForm', value)
      }
    },
    offerFormPrice: {
      get() {
        return this.$store.getters.newOfferForm.price
      },
      set(value) {
        this.$store.commit('updatePriceInNewOfferForm', value)
      }
    },
    offerFormLocation: {
      get() {
        return this.$store.getters.newOfferForm.location
      },
      set(value) {
        this.$store.commit('updateLocationInNewOfferForm', value)
      }
    },
    offerFormShippingMethods: {
      get() {
        return this.$store.getters.newOfferForm.shippingMethods
      },
      set(value) {
        this.$store.commit('updateShippingMethodsInNewOfferForm', value)
      }
    }
  },
  mounted() {
    this.updateSelectedShippingMethods()

    axios.get('api/shipping', {headers: {'Accept': 'application/vnd.exbook.v1+json'}}).then(response => {
      response.data.forEach(shippingMethod => {
        shippingMethod.price = shippingMethod.defualtPrice
        delete shippingMethod.defualtPrice
      })
      this.shippingMethods = response.data
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  .form-label {
    font-weight: 500;
  }

  .condition-button {
    border-width: thick;
    border-color: #45A049;
  }

  .active-condition-button {
    border-color: cornflowerblue;
  }

  .shipping-price-input {
    flex-basis: 80pt;
    flex-shrink: 0;
    flex-grow: 0;
  }
</style>