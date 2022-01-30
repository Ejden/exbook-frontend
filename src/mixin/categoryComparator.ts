import {Category} from "@/api/CategoryApi";

export function categoryComparator(arg1: Category, arg2: Category) {
    if (arg1.name < arg2.name) return -1
    if (arg1.name > arg2.name) return 1
    return 0
}
