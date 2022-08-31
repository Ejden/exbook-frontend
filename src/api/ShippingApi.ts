import axios, { AxiosResponse } from 'axios';
import { Money, ShippingMethodType } from '@/api/CommonTypings';

export interface ShippingMethods {
    shippingMethods: ShippingMethod[];
}

export interface ShippingMethod {
    id: string;
    name: string;
    type: ShippingMethodType;
    defaultCost: ShippingCost;
}

export interface ShippingCost {
    cost: Money;
    canBeOverridden: boolean;
}

export async function getShippingMethods(): Promise<AxiosResponse<ShippingMethods>> {
    return axios.get('/api/shipping', { headers: { 'Accept': 'application/vnd.exbook.v1+json' } });
}
