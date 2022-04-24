import { BookCondition } from '@/api/BasketApi';
import { i18n } from '@/main';

export function getConditionText(condition: BookCondition): string {
    switch (condition) {
        case BookCondition.NEW:
            return i18n.t('bookCondition.new') as string;
        case BookCondition.PERFECT:
            return i18n.t('bookCondition.perfect') as string;
        case BookCondition.LIGHTLY_USED:
            return i18n.t('bookCondition.lightlyUsed') as string;
        case BookCondition.MODERATELY_USED:
            return i18n.t('bookCondition.moderatelyUsed') as string;
        case BookCondition.BAD:
            return i18n.t('bookCondition.bad') as string;
        default:
            return i18n.t('bookCondition.unknown') as string;
    }
}
