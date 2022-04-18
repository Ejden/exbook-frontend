import axios from "axios";

const headers = {
    'Content-Type': 'application/vnd.exbook.v1+json',
    'Accept': 'application/vnd.exbook.v1+json'
}

interface NewOfferForm {
    book: Book;
    description: string;
    images: Images;
    category: string;
    type: string;
    price: Money;
    location: string,
    shippingMethods: ShippingMethod[];
    initialStock: number;
}

interface Book {
    author: string;
    title: string;
    isbn: number;
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

interface CreatedOffer {
    id: string;
}

async function createOffer(offer: NewOfferForm): Promise<CreatedOffer> {
    return axios.post('api/offers', offer, { withCredentials: true, headers: headers });
}

export { createOffer, NewOfferForm, CreatedOffer };
