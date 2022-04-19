import axios from 'axios';

const headers = {
    'Content-Type': 'application/vnd.exbook.v1+json',
    'Accept': 'application/vnd.exbook.v1+json'
}

const acceptHeader = {
    'Accept': 'application/vnd.exbook.v1+json'
}

export interface Basket {
    id: string;
    buyer: Buyer;
    itemsGroups: ItemsGroup[];
    totalOffersCost: Money;
}

export interface Buyer {
    id: string;
}

export interface ItemsGroup {
    seller: Seller;
    orderType: OrderType;
    items: BasketItem[];
    exchangeBooks: ExchangeBook[];
    groupTotalOffersPrice: Money;
}

export enum OrderType {
    EXCHANGE = 'EXCHANGE',
    BUY = 'BUY'
}

export interface BasketItem {
    offer: OfferItem;
    quantity: number;
    totalPrice: Money;
}

export interface OfferItem {
    id: string;
    price: Money;
    book: Book;
    images: Images;
    seller: Seller;
}

export interface ExchangeBook {
    id: string;
    author: string;
    title: string;
    isbn?: string;
    condition: string;
    quantity: number;
}

export enum BookCondition {
    NEW = 'NEW',
    PERFECT = 'PERFECT',
    LIGHTLY_USED = 'LIGHTLY_USED',
    MODERATELY_USED = 'MODERATELY_USED',
    BAD = 'BAD'
}

export interface Book {
    author: string;
    title: string;
}

export interface Images {
    thumbnail: Image;
    allImages: Image[];
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

export interface AddExchangeBookBody {
    author: string;
    title: string;
    isbn?: string;
    condition: BookCondition;
    quantity: number;
}

export async function getUserBasket(): Promise<Basket> {
    return axios.get('api/basket')
        .then((response) => response.data as Basket);
}

export async function addItemToBasket(offerId: String, orderType: OrderType, quantity: number): Promise<Basket> {
    return axios.put('api/basket',
        {
            offerId: offerId,
            orderType: orderType,
            quantity: quantity
        },
        { withCredentials: true, headers: headers }
    ).then((response) => response.data as Basket);
}

export async function changeItemQuantityInBasket(offerId: string, newQuantity: number, orderType: OrderType): Promise<Basket> {
    return axios.post('api/basket/' + offerId,
        {
            orderType: orderType,
            newQuantity: newQuantity
        },
        {
            withCredentials: true,
            headers: headers
        });
}

export async function removeItemFromBasket(offerId: string, orderType: OrderType): Promise<Basket> {
    return axios.delete('api/basket/' + orderType + '/' + offerId, {
        withCredentials: true,
        headers: acceptHeader
    })
}

export async function addExchangeBookToBasket(sellerId: string, book: AddExchangeBookBody): Promise<Basket> {
    return axios.post('api/basket/sellers/' + sellerId + '/books', book, {
        withCredentials: true,
        headers: {
            ...headers
        }
    });
}

export async function removeExchangeBookFromBasket(sellerId: string, exchangeBookId: string): Promise<Basket> {
    return axios.delete('api/basket/sellers/' + sellerId + '/books/' + exchangeBookId, {
        withCredentials: true,
        headers: {
            ...acceptHeader
        }
    });
}
