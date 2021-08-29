export function categoryComparator(arg1, arg2) {
    if (arg1.name < arg2.name) return -1
    if (arg1.name > arg2.name) return 1
    return 0
}
