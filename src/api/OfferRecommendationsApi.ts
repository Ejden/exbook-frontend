import { BookCondition, Money, OfferType } from '@/api/CommonTypings';
import axios, { AxiosResponse } from 'axios';

export interface OfferRecommendations {
    recommendations: OfferRecommendation[];
}

export interface OfferRecommendation {
    id: string;
    book: Book;
    images: Images;
    type: OfferType;
    seller: Seller;
    price: Money;
}

export interface Book {
    author: string;
    title: string;
    isbn?: string;
    condition: BookCondition;
}

export interface Images {
    thumbnail?: Image;
    allImages: Image[];
}

export interface Image {
    url: string;
}

export interface Seller {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    grade: number;
}

export async function getGeneralRecommendations(): Promise<AxiosResponse<OfferRecommendations>> {
    return axios.get('/api/recommendations/offers');
}
