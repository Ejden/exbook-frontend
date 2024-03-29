import router from "@/router";
import { Route } from "vue-router";
import { OrderStatus } from '@/api/OrderApi';
import { i18n } from '@/main';

export async function goToHomePage(): Promise<Route> {
    if (router.currentRoute.path === '/') {
        window.location.reload();
        return new Promise<Route>(resolve => resolve(router.currentRoute));
    } else {
        return router.push('/');
    }
}

export function getOrderStatus(orderStatus: OrderStatus): string {
    switch (orderStatus) {
        case OrderStatus.NEW:
            return i18n.t('myAccount.orderStatus.new') as string;
        case OrderStatus.DECLINED:
            return i18n.t('myAccount.orderStatus.declined') as string;
        case OrderStatus.ACCEPTED:
            return i18n.t('myAccount.orderStatus.accepted') as string;
        case OrderStatus.RETURN_IN_PROGRESS:
            return i18n.t('myAccount.orderStatus.returnInProgress') as string;
        case OrderStatus.RETURN_DELIVERED:
            return i18n.t('myAccount.orderStatus.returnDelivered') as string;
        case OrderStatus.WAITING_FOR_ACCEPT:
            return i18n.t('myAccount.orderStatus.waitingForAccept') as string;
        case OrderStatus.CANCELED:
            return i18n.t('myAccount.orderStatus.canceled') as string;
        case OrderStatus.SENT:
            return i18n.t('myAccount.orderStatus.sent') as string;
        case OrderStatus.DELIVERED:
            return i18n.t('myAccount.orderStatus.delivered') as string;
        default:
            return i18n.t('myAccount.orderStatus.unknown') as string;
    }
}

export function getMonth(month: number): string {
    switch (month) {
        case 1:
            return i18n.t('months.january') as string;
        case 2:
            return i18n.t('months.february') as string;
        case 3:
            return i18n.t('months.march') as string;
        case 4:
            return i18n.t('months.april') as string;
        case 5:
            return i18n.t('months.may') as string;
        case 6:
            return i18n.t('months.june') as string;
        case 7:
            return i18n.t('months.july') as string;
        case 8:
            return i18n.t('months.august') as string;
        case 9:
            return i18n.t('months.september') as string;
        case 10:
            return i18n.t('months.october') as string;
        case 11:
            return i18n.t('months.november') as string;
        case 12:
            return i18n.t('months.december') as string;
        default:
            return ' '
    }
}

function defaultParamParser(key: string, value: string | number): string {
    const encodedValue = encodeURIComponent(value);
    return `${key}=${encodedValue}`;
}

export function buildUrl(url: string, queryParams: {}): string {
    let finalUrl = url;
    let paramConnector = '?';

    Object.keys(queryParams).forEach(key => {
        const value = Reflect.get(queryParams, key);

        if (value) {
            const isValueAnArray = Array.isArray(value);

            if (isValueAnArray) {
                value.forEach(val => {
                    if (val) {
                        finalUrl += paramConnector + defaultParamParser(key, val);
                        paramConnector = '&';
                    }
                });
            } else {
                finalUrl += paramConnector + defaultParamParser(key, value);
                paramConnector = '&';
            }
        }
    });
    return finalUrl;
}
