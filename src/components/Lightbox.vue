<template>
  <div class="lightbox" @click.self="closeLightbox">
    <div class="lightbox-wrap">
      <img
        alt=""
        :src="imageServer + image.path + '/' + image.fileName"
        @click="toggleInfo"
      />
      <ImageDetails :image="image" />
      <button
        class="btn lightbox-btn info-btn"
        title="Details"
        arial-label="Details"
        @click="toggleInfo"
        ref="lastTabEl"
        tabindex="4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path
            d="M22 34h4V22h-4v12zm2-30C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm-2-22h4v-4h-4v4z"
          ></path>
        </svg>
      </button>
    </div>
    <!--Navigation-->
    <button
      class="btn lightbox-btn close-btn"
      title="Close"
      aria-label="Close"
      @click="closeLightbox"
      ref="firstTabEl"
      tabindex="1"
    >
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
      @click="navigate(-1)"
      v-if="this.currentIndex !== 0"
      ref="prevBtn"
      tabindex="2"
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
      @click="navigate(1)"
      v-if="this.currentIndex !== this.lastIndex"
      ref="nextBtn"
      tabindex="3"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path
          d="M24 8l-2.83 2.83L32.34 22H8v4h24.34L21.17 37.17 24 40l16-16z"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script>
import store from "@/store/";
import ImageDetails from "@/components/ImageDetails";

export default {
  components: {
    ImageDetails,
  },
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  computed: {
    image() {
      return this.images[this.currentIndex];
    },
    imageServer() {
      return store.state.images.imageServer;
    },
    currentIndex() {
      return store.state.lightbox.currentIndex;
    },
    lastIndex() {
      return this.images.length - 1;
    },
    isInfo() {
      return store.state.lightbox.info;
    },
  },
  methods: {
    closeLightbox() {
      store.dispatch("lightbox/toggleLightbox");
    },
    toggleInfo() {
      store.dispatch("lightbox/toggleInfo");
    },
    navigate(direction) {
      let lastBatchIndex = store.state.images.currentBatch - 1;
      let newIndex = this.currentIndex + direction;

      // Navigate backwards
      if (direction === -1 && this.currentIndex === 0) {
        // First image
        newIndex = null;
      }
      // Navigate forwards
      else if (direction === 1) {
        // Last of batch: load new batch
        if (this.currentIndex === lastBatchIndex) {
          store.dispatch("images/displayImages");
        }
        // Last image
        if (this.currentIndex === this.lastIndex) {
          newIndex = null;
        }
      }

      if (newIndex !== null) {
        store.dispatch("lightbox/displayImage", { index: newIndex });
      }
    },
    keyboardsEvents(e) {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          this.navigate(-1);
          break;
        case "ArrowRight":
          e.preventDefault();
          this.navigate(1);
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!this.isInfo) this.toggleInfo();
          break;
        case "ArrowDown":
          e.preventDefault();
          if (this.isInfo) this.toggleInfo();
          break;
        case "Escape":
          e.preventDefault();
          this.closeLightbox();
          break;
        // Focus trapping
        case "Tab":
          if (e.shiftKey) {
            // Tabbing backward
            if (e.target === this.$refs.firstTabEl) {
              e.preventDefault();
              this.$refs.lastTabEl.focus();
            }
          } else {
            // Tabbing forward
            if (e.target === this.$refs.lastTabEl) {
              e.preventDefault();
              this.$refs.firstTabEl.focus();
            }
          }
      }
    },
  },
  created() {},
  mounted() {
    window.addEventListener("keydown", this.keyboardsEvents);
    // Focus trapping
    this.$refs.firstTabEl.focus();
  },
  beforeUpdate() {
    // Focus trapping
    // Avoid losing focus when prev/next buttons disapear
    if (
      this.currentIndex === 0 &&
      document.activeElement === this.$refs.prevBtn
    ) {
      this.$refs.lastTabEl.focus();
    } else if (
      this.currentIndex === this.lastIndex &&
      document.activeElement === this.$refs.nextBtn
    ) {
      this.$refs.lastTabEl.focus();
    }
  },
  destroyed() {
    const lastFocus = store.state.lightbox.lastFocusEl;
    if (lastFocus) lastFocus.focus();
    window.removeEventListener("keydown", this.keyboardsEvents);
  },
};
</script>

<style lang="scss">
@import "@/scss/components/Lightbox.scss";
</style>
