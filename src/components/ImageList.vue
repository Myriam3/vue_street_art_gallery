<template>
  <main class="main" ref="imageList">
    <transition-group tag="ul" name="image" appear class="image-list">
      <li
        v-for="(image, index) in images"
        :key="index"
        class="image-list-item"
        :class="[image.classes]"
        v-show="index <= currentBatch - 1"
      >
        <a
          href="#"
          @click="openLightbox(index, $event)"
          :class="{ lastItem: index === currentBatch - 1 }"
        >
          <img
            v-if="index <= currentBatch - 1"
            :src="imageServer + image.path + '/' + image.fileName"
            alt=""
          />
        </a>
      </li>
    </transition-group>
    <div class="pagination">
      <p :title="this.paginationInfo" aria-hidden="true">
        {{ currentImageNb }} / {{ images.length }}
      </p>
      <p class="visually-hidden">{{ this.paginationInfo }}</p>
      <button
        v-if="currentBatch < images.length"
        class="btn load-btn"
        @click="loadMoreImages"
      >
        See more
      </button>
    </div>
  </main>
</template>

<script>
// TODO: request next batch in the background
// TODO: responsive images (mobile)

import store from "@/store";

export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  computed: {
    imageServer() {
      return store.state.images.imageServer;
    },
    currentBatch() {
      return store.state.images.currentBatch;
    },
    currentImageNb() {
      if (this.images.length <= this.currentBatch) {
        return this.images.length;
      } else {
        return this.currentBatch;
      }
    },
    paginationInfo() {
      if (this.currentImageNb !== this.images.length) {
        return (
          this.currentImageNb + " images displayed out of " + this.images.length
        );
      } else {
        return "All images are displayed";
      }
    },
  },
  methods: {
    loadMoreImages() {
      const lastItem = this.$refs.imageList.querySelector(".lastItem");
      store.dispatch("images/displayImages");
      lastItem.focus();
    },
    openLightbox(index, e) {
      e.preventDefault();
      this.$emit("open-lightbox", index, e.currentTarget);
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/components/ImageList.scss";

.image-enter,
.image-leave {
  opacity: 0;
}
.image-enter-active {
  transition: all 1s ease-out;
}
.image-leave-active {
  transition: all 1s ease-out;
}
</style>
