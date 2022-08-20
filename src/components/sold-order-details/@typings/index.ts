export interface ExchangeAddressEvent {
    firstAndLastName: string;
    phoneNumber: string;
    email: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
}

export interface ExchangePickupPointEvent {
    firstAndLastName: string;
    phoneNumber: string;
    email: string;
    pickupPointId: string;
}
