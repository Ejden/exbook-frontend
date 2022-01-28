import axios, {AxiosResponse} from 'axios';

interface Basket {
    id: string;
    userId: string;
    items: BasketItem[];
    totalOffersCost: Money;
}

interface BasketItem {
    offer: OfferItem;
    quantity: number;
    price: Money;
}

interface OfferItem {
    id: string;
    price: Money;
    book: Book;
    images: Images;
    seller: Seller;
}

interface Book {
    author: string;
    title: string;
}

interface Images {
    thumbnail?: Image;
    otherImages: Image[];
}

interface Image {
    url: string;
}

interface Seller {
    id: string;
    firstName: string;
    lastName: string;
}

interface Money {
    amount: string;
    currency: string;
}

async function getUserBasket(): Promise<Basket> {
    return axios.get('api/basket')
        .then((response) => response.data as Basket);
}

export { getUserBasket, Basket };
