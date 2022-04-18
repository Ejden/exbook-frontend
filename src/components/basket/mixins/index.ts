import { BookCondition } from '@/api/BasketApi';

export function getConditionText(condition: BookCondition): string {
    switch (condition) {
        case BookCondition.NEW:
            return 'Nowa';
        case BookCondition.PERFECT:
            return 'Bardzo dobry';
        case BookCondition.LIGHTLY_USED:
            return 'Widoczne ślady użycia';
        case BookCondition.MODERATELY_USED:
            return 'Liczne ślady użycia';
        case BookCondition.BAD:
            return 'Zły';
        default:
            return 'Nieznany';
    }
}
