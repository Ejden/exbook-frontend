import axios from "axios";
import router from "@/router";

const state = {
    newOfferForm: {
        book: {
            author: '',
            title: '',
            isbn: '',
            condition: ''
        },
        description: null,
        images: {
            thumbnail: null,
            otherImages: []
        },
        category: '',
        type: '',
        price: null,
        location: '',
        shippingMethods: []
    }
}

const getters = {
    newOfferForm: state => state.newOfferForm
}

const actions = {
    async addOffer(state) {
        class Cost {
            constructor(value, currency) {
                this.value = value
                this.currency = currency
            }
        }

        class ShippingMethod{
            constructor(id, cost) {
                this.id = id
                this.cost = cost
            }
        }

        let body = {
            book: {
                author: '',
                title: '',
                isbn: '',
                condition: ''
            },
            description: null,
            images: {
                thumbnail: null,
                otherImages: []
            },
            category: '',
            type: '',
            cost: null,
            location: '',
            shippingMethods: []
        }

        console.log(body)

        body.book.author = state.getters.newOfferForm.book.author
        body.book.title = state.getters.newOfferForm.book.title
        body.book.isbn = parseInt(state.getters.newOfferForm.book.isbn)
        body.book.condition = state.getters.newOfferForm.book.condition
        body.description = state.getters.newOfferForm.description
        body.type = state.getters.newOfferForm.type.type
        body.cost = new Cost(state.getters.newOfferForm.price, 'PLN')
        body.location = state.getters.newOfferForm.location
        body.category = state.getters.newOfferForm.category.id
        body.shippingMethods = state.getters.newOfferForm.shippingMethods
            .map(shippingMethod => new ShippingMethod(
                    shippingMethod.id,
                    new Cost(shippingMethod.price.amount, 'PLN')
                )
            )

        console.log(body)

        await axios.post('api/offers', body, { withCredentials: true })
            .then((response) => {
                this.commit('clearNewOfferForm')
                router.push('offer/'+response.data.id+'/new')
            })
            .catch(() => router.push('error'))
    }
}

const mutations = {
    clearNewOfferForm(state) {
        state.newOfferForm.book.author = ''
        state.newOfferForm.book.title = ''
        state.newOfferForm.book.isbn = ''
        state.newOfferForm.book.condition = ''
        state.newOfferForm.description = null
        state.newOfferForm.images.thumbnail = null
        state.newOfferForm.images.otherImages = []
        state.newOfferForm.category = ''
        state.newOfferForm.type = ''
        state.newOfferForm.price = ''
        state.newOfferForm.location = ''
        state.newOfferForm.shippingMethods = []
    },
    updateIsbnInNewOfferForm(state, isbn) {
        state.newOfferForm.book.isbn = isbn
    },
    updateBookTitleInNewOfferForm(state, title) {
        state.newOfferForm.book.title = title
    },
    updateBookAuthorInNewOfferForm(state, author) {
        state.newOfferForm.book.author = author
    },
    updateDescriptionInNewOfferForm(state, description) {
        state.newOfferForm.description = description
    },
    updateBookConditionInNewOfferForm(state, condition) {
        state.newOfferForm.book.condition = condition
    },
    updateTypeInNewOfferForm(state, type) {
        state.newOfferForm.type = type
    },
    updatePriceInNewOfferForm(state, price) {
        state.newOfferForm.price = price
    },
    updateLocationInNewOfferForm(state, location) {
        state.newOfferForm.location = location
    },
    updateShippingMethodsInNewOfferForm(state, shippingMethods) {
        state.newOfferForm.shippingMethods = shippingMethods
    },
    updateSelectedCategoriesInNewOfferForm(state, category) {
        state.newOfferForm.category = category
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
