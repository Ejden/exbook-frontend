interface OfferStoreState {
    newOfferForm: OfferForm;
}

interface OfferForm {
    book: Book;
    description: string;
    images: Images;
    category: string;
    type: PossibleOfferType;
    price: string;
    location: string;
    shippingMethods: ShippingMethod[];
    initialStock: number;
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
    price: Money;
}

interface Money {
    amount: string;
    currency: string;
}

interface PossibleOfferType {
    name: string;
    type: string;
    buyAbility: boolean;
}

export {
    OfferStoreState,
    OfferForm,
    Book,
    Images,
    Image,
    ShippingMethod,
    Money,
    PossibleOfferType
};
