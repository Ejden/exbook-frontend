import axios from 'axios';

export interface ShippingMethod {
    id: string;
    name: string;
    pickupPointMethod: boolean;
    defaultCost: Money;
}

export interface Money {
    amount: string;
    currency: string;
    canBeOverridden: boolean;
}

export async function getShippingMethods(): Promise<ShippingMethod[]> {
    return axios.get('api/shipping', { headers: { 'Accept': 'application/vnd.exbook.v1+json' } })
        .then(r => r.data as ShippingMethod[]);
}
