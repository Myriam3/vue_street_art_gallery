<template>
  <div class="lightbox">
    <button class="btn lightbox-btn close-btn" title="Close" aria-label="Close">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path
          d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"
        ></path>
      </svg>
    </button>
    <button
      class="btn lightbox-btn nav-btn prev"
      title="Previous"
      aria-label="Previous photo"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path
          d="M40 22H15.66l11.17-11.17L24 8 8 24l16 16 2.83-2.83L15.66 26H40v-4z"
        ></path>
      </svg>
    </button>
    <button
      class="btn lightbox-btn nav-btn next"
      title="Next"
      aria-label="Next photo"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path
          d="M24 8l-2.83 2.83L32.34 22H8v4h24.34L21.17 37.17 24 40l16-16z"
        ></path>
      </svg>
    </button>
    <div class="lightbox-wrap">
      <img alt="" :src="imageServer + image.path + '/' + image.fileName" />
      <ImageDetails :image="image" />
      <button
        class="btn lightbox-btn info-btn"
        title="Details"
        arial-label="Details"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path
            d="M22 34h4V22h-4v12zm2-30C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm-2-22h4v-4h-4v4z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import ImageDetails from "@/components/ImageDetails";

//TODO: navigation (+ accessibility):
//  - previous/next image (arrows, arrow keys)
// - close (button, click on overlay, escape key)
// - toggle info (button, click on image, space bar)

export default {
  components: {
    ImageDetails,
  },
  props: {
    image: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imageServer() {
      return this.$store.state.images.imageServer;
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/components/Lightbox.scss";
</style>
