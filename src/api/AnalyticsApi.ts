import axios from 'axios';

export interface OfferViewEvent {
    offerId: string;
    viewer: OfferViewEventViewer;
}

export interface OfferViewEventViewer {
    userId?: string;
}

export async function publishOfferViewEvent(event: OfferViewEvent): Promise<void> {
    await axios.post("/api/analytics/offer-view", event);
}
