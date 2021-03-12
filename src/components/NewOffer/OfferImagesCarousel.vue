<template>
  <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(image, index) in images"
      :key="index"
    >

    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "OfferImagesCarousel",
  props: ['images']
}
</script>

<style scoped>

</style>