import router from '@/router';
import { CreatedOffer, createOffer, NewOfferForm } from '@/api/OfferApi';
import { ActionContext } from 'vuex';
import { IRootState } from '@/store';
import {
    Image,
    NewOfferCreationResult,
    OfferCreationStatus,
    OfferForm,
    OfferStoreState,
    PossibleOfferType,
    ShippingMethod
} from '@/store/modules/offer-store/types';
import { AxiosResponse } from 'axios';

const availableOfferTypes: PossibleOfferType[] = [
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
]

const state: OfferStoreState = {
    newOfferForm: {
        book: {
            author: '',
            title: '',
            isbn: '',
            condition: ''
        },
        description: '',
        images: {
            thumbnail: null,
            allImages: [],
            rawFiles: []
        },
        category: '',
        type: availableOfferTypes[0],
        price: '',
        location: '',
        shippingMethods: [],
        initialStock: 1
    }
}

const getters = {
    newOfferForm: (state: OfferStoreState) => state.newOfferForm,
    offerTypes: () => availableOfferTypes
}

function parseToShippingMethod(shippingMethod: ShippingMethod) {
    return {
        id: shippingMethod.id,
        price: {
            amount: shippingMethod.price.amount,
            currency: 'PLN'
        }
    };
}

function validateOffer(offerForm: OfferForm): NewOfferCreationResult | null {
    if (!offerForm.images.thumbnail) {
        return { result: OfferCreationStatus.VALIDATION_ERROR };
    }
    if (offerForm.images.allImages.length === 0) {
        return { result: OfferCreationStatus.VALIDATION_ERROR };
    }

    return null;
}

const actions = {
    async addOffer(context: ActionContext<OfferStoreState, IRootState>): Promise<NewOfferCreationResult> {
        const form = context.state.newOfferForm;
        const price = (form.price === undefined || form.price.trim().length === 0) ? undefined : { amount: form.price, currency: 'PLN' };
        const validationResult = validateOffer(form);
        if (validationResult !== null) {
            return validationResult;
        }

        const body: NewOfferForm = {
            book: {
                author: form.book.author,
                title: form.book.title,
                isbn: parseInt(form.book.isbn),
                condition: form.book.condition
            },
            description: form.description,
            images: {
                thumbnail: form.images.thumbnail,
                allImages: form.images.allImages
            },
            category: form.category,
            type: form.type.type,
            price: price,
            location: form.location,
            shippingMethods: form.shippingMethods.map((s: ShippingMethod) => parseToShippingMethod(s)),
            initialStock: form.initialStock
        };

        createOffer(body)
            .then((response: AxiosResponse<CreatedOffer>) => {
                context.commit('clearNewOfferForm');
                router.push('offer/' + response.data.id + '/new');
                return { result: OfferCreationStatus.CREATED };
            })
            .catch(() => router.push('error'));

        return Promise.resolve({ result: OfferCreationStatus.ERROR });
    }
}

const mutations = {
    clearNewOfferForm(state: OfferStoreState) {
        state.newOfferForm.book.author = '';
        state.newOfferForm.book.title = '';
        state.newOfferForm.book.isbn = '';
        state.newOfferForm.book.condition = '';
        state.newOfferForm.description = '';
        state.newOfferForm.images.thumbnail = null;
        state.newOfferForm.images.allImages = [];
        state.newOfferForm.images.rawFiles = [];
        state.newOfferForm.category = '';
        state.newOfferForm.type = availableOfferTypes[0];
        state.newOfferForm.price = '';
        state.newOfferForm.location = '';
        state.newOfferForm.shippingMethods = [];
        state.newOfferForm.initialStock = 1;
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
    updateTypeInNewOfferForm(state: OfferStoreState, type: any) {
        state.newOfferForm.type = type;
    },
    updatePriceInNewOfferForm(state: OfferStoreState, price: string) {
        state.newOfferForm.price = price;
    },
    updateLocationInNewOfferForm(state: OfferStoreState, location: string) {
        state.newOfferForm.location = location;
    },
    updateShippingMethodsInNewOfferForm(state: OfferStoreState, shippingMethods: ShippingMethod[]) {
        state.newOfferForm.shippingMethods = shippingMethods;
    },
    updateSelectedCategoriesInNewOfferForm(state: OfferStoreState, category: string) {
        state.newOfferForm.category = category;
    },
    updateInitialStock(state: OfferStoreState, initialStock: number) {
        state.newOfferForm.initialStock = initialStock;
    },
    updateAllImages(state: OfferStoreState, images: Array<Image>) {
        state.newOfferForm.images.allImages = images;
    },
    updateThumbnailImage(state: OfferStoreState, image: Image) {
        state.newOfferForm.images.thumbnail = image;
    },
    updateImageRawFiles(state: OfferStoreState, images: File[]) {
        state.newOfferForm.images.rawFiles = images;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
