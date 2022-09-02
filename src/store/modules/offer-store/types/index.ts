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
    allImages: Image[];
    rawFiles: File[];
}

interface Image {
    url: string;
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

interface NewOfferCreationResult {
    result: OfferCreationStatus
}

enum OfferCreationStatus {
    CREATED = 'CREATED',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    ERROR = 'ERROR'
}

export {
    OfferStoreState,
    OfferForm,
    Book,
    Images,
    Image,
    ShippingMethod,
    Money,
    PossibleOfferType,
    NewOfferCreationResult,
    OfferCreationStatus
};
