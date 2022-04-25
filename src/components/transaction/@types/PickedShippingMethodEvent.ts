import { OrderType } from '@/api/CommonTypings';
import { PreviewPurchasePickupPointData, PreviewPurchaseShippingAddressData } from '@/api/TransactionApi';

export interface PickedShippingMethodEvent {
    sellerId: string;
    orderType: OrderType;
    orderId: string;
    shippingMethodId: string;
    shippingAddress?: PreviewPurchaseShippingAddressData;
    pickupPoint?: PreviewPurchasePickupPointData;
}
