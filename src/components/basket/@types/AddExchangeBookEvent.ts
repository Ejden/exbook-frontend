import { BookCondition } from '@/api/BasketApi';

export interface AddExchangeBookEvent {
    author: string;
    title: string;
    isbn?: string;
    quantity: number;
    sellerId: string;
    condition: BookCondition;
}
