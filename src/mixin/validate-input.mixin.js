export default {

    minLengthValid(input, minLength) {
        return input.length >= minLength;
    },

    maxLengthValid(input, maxLength) {
        return input.length <= maxLength;
    }
}