<template>
  <v-card flat class="image-container">
    <v-carousel v-model="currentImage">
      <v-carousel-item v-if="showNoImgMessage">
        <v-sheet height="100%" color="#EEEEEE" class="no-img-sheet">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#AAAAAA" class="bi bi-camera" viewBox="0 0 16 16">
            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
          </svg>
          <h3 class="no-img-msg-text">{{ $t('newOfferForm.addImages') }}</h3>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item
          v-else
          class="image"
          v-for="(image, index) in images"
          :key="index"
          :src="image.url"
      >
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from '@vue/composition-api';
import { Image } from '@/store/modules/offer-store/types';

export default defineComponent({
  name: "ImageSlider",
  props: {
    images: {
      type: Array as PropType<Array<Image>>,
      required: true
    },
    thumbnail: {
      type: Object as PropType<Image | null>,
      required: false
    }
  },
  setup(props) {
    const currentImage = ref(0);
    const showNoImgMessage = computed(() => props.images.length === 0);

    return {
      currentImage,
      showNoImgMessage
    }
  }
});
</script>

<style scoped>
.image-container {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
}

.image {
  width: 100%;
  max-width: 100%;
}

.no-img-sheet {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.no-img-msg-text {
  color: #AAAAAA;
}
</style>
