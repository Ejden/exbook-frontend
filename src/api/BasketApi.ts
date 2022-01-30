import axios from 'axios';

export interface Basket {
    id: string;
    userId: string;
    items: BasketItem[];
    totalOffersCost: Money;
}

export interface BasketItem {
    offer: OfferItem;
    quantity: number;
    price: Money;
}

export interface OfferItem {
    id: string;
    price: Money;
    book: Book;
    images: Images;
    seller: Seller;
}

export interface Book {
    author: string;
    title: string;
}

export interface Images {
    thumbnail?: Image;
    otherImages: Image[];
}

export interface Image {
    url: string;
}

export interface Seller {
    id: string;
    firstName: string;
    lastName: string;
}

export interface Money {
    amount: string;
    currency: string;
}

export async function getUserBasket(): Promise<Basket> {
    return axios.get('api/basket')
        .then((response) => response.data as Basket);
}
