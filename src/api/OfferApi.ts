import axios from "axios";

interface OfferApi {
    createOffer(offer: NewOfferForm): Promise<CreatedOffer>;
}

interface NewOfferForm {
    book: Book;
    description: string;
    images: Images;
    category: string;
    type: string;
    cost: Money;
    location: string,
    shippingMethods: ShippingMethod[];
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
    cost: Money;
}

interface Money {
    amount: string;
    currency: string;
}

interface CreatedOffer {
    id: string;
}

class OfferClient implements OfferApi {
    private serviceUrl = "http://localhost:8082";

    async createOffer(offer: NewOfferForm): Promise<CreatedOffer> {
        return axios.post('api/offers', offer, { withCredentials: true });
    }
}

export { OfferApi, OfferClient, NewOfferForm, CreatedOffer };
