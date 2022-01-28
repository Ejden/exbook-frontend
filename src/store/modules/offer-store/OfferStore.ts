import router from "@/router";
import { OfferApi, OfferClient, NewOfferForm } from "@/api/OfferApi";
import {ActionContext} from "vuex";

interface OfferStoreState {
    newOfferForm: OfferForm;
    offerApi: OfferApi;
}

interface OfferForm {
    book: Book;
    description: string;
    images: Images;
    category: string;
    type: string;
    price: string;
    location: string;
    shippingMethods: ShippingMethod[];
}

interface Book {
    author: string;
    title: string;
    isbn: string;
    condition: string;
}

interface Images {
    thumbnail: Image | null;
    otherImages: Image[];
}

interface Image {
    raw: string;
}

interface ShippingMethod {
    id: string;
    cost: Money;
}

interface Money {
    amount: string;
    currency: string;
}

const state: OfferStoreState = {
    newOfferForm: {
        book: {
            author: 'aa',
            title: '',
            isbn: '',
            condition: ''
        },
        description: '',
        images: {
            thumbnail: null,
            otherImages: []
        },
        category: '',
        type: '',
        price: '',
        location: '',
        shippingMethods: []
    },
    offerApi: new OfferClient()
}

const getters = {
    newOfferForm: (state: OfferStoreState) => state.newOfferForm
}

function parseToShippingMethod(shippingMethod: ShippingMethod) {
    return { id: shippingMethod.id, cost: { amount: shippingMethod.cost.amount, currency: 'PLN' } }
}

const actions = {
    async addOffer({ commit }: ActionContext<any, any>) {
        let body: NewOfferForm = {
            book: {
                author: state.newOfferForm.book.author,
                title: state.newOfferForm.book.title,
                isbn: parseInt(state.newOfferForm.book.isbn),
                condition: state.newOfferForm.book.condition
            },
            description: state.newOfferForm.description,
            images: {
                thumbnail: null,
                otherImages: []
            },
            category: state.newOfferForm.category,
            type: state.newOfferForm.type,
            cost: { amount: state.newOfferForm.price, currency: 'PLN' },
            location: state.newOfferForm.location,
            shippingMethods: state.newOfferForm.shippingMethods.map(s => parseToShippingMethod(s))
        };

        console.log(body);

        state.offerApi.createOffer(body)
            .then((response) => {
                commit('clearNewOfferForm');
                router.push('offer/' + response.id + '/new');
            })
            .catch(() => router.push('error'));
    }
}

const mutations = {
    clearNewOfferForm(state: OfferStoreState) {
        state.newOfferForm.book.author = ''
        state.newOfferForm.book.title = ''
        state.newOfferForm.book.isbn = ''
        state.newOfferForm.book.condition = ''
        state.newOfferForm.description = ''
        state.newOfferForm.images.thumbnail = null
        state.newOfferForm.images.otherImages = []
        state.newOfferForm.category = ''
        state.newOfferForm.type = ''
        state.newOfferForm.price = ''
        state.newOfferForm.location = ''
        state.newOfferForm.shippingMethods = []
    },
    updateIsbnInNewOfferForm(state: OfferStoreState, isbn: string) {
        state.newOfferForm.book.isbn = isbn;
    },
    updateBookTitleInNewOfferForm(state: OfferStoreState, title: string) {
        state.newOfferForm.book.title = title;
    },
    updateBookAuthorInNewOfferForm(state: OfferStoreState, author: string) {
        state.newOfferForm.book.author = author;
    },
    updateDescriptionInNewOfferForm(state: OfferStoreState, description: string) {
        state.newOfferForm.description = description;
    },
    updateBookConditionInNewOfferForm(state: OfferStoreState, condition: string) {
        state.newOfferForm.book.condition = condition;
    },
    updateTypeInNewOfferForm(state: OfferStoreState, type: string) {
        state.newOfferForm.type = type;
    },
    updatePriceInNewOfferForm(state: OfferStoreState, price: string) {
        state.newOfferForm.price = price;
    },
    updateLocationInNewOfferForm(state: OfferStoreState, location: string) {
        state.newOfferForm.location = location;
    },
    updateShippingMethodsInNewOfferForm(state: OfferStoreState, shippingMethods: ShippingMethod[]) {
        state.newOfferForm.shippingMethods = shippingMethods
    },
    updateSelectedCategoriesInNewOfferForm(state: OfferStoreState, category: string) {
        state.newOfferForm.category = category
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
    name: 'OfferStore'
}
