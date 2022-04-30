import { OrderStatus } from '@/api/OrderApi';

export interface MyOrderStatusOption {
    text: string;
    value: OrderStatus;
}

export interface MyOrderSortingOption {
    text: string;
    value: string;
}
