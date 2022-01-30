import { Money } from '@/api/ShippingApi';

export interface NewOfferShippingMethod {
    id: string;
    name: string;
    pickupPointMethod: boolean;
    price: Money;
}
