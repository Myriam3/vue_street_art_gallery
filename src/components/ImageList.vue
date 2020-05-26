<template>
  <main class="main">
    <ul class="image-list" ref="imageList">
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
    </ul>
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
// TODO: Filter by city

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

.pagination {
  padding: 1rem;
  margin-top: 1rem;
  text-align: center;
}

.pagination {
  p {
    margin: 0;
    color: map_get($colors, main-color);
    padding: 0.3rem;
  }
  .load-btn {
    background: map_get($colors, main-color);
    color: #fff;
    padding: 0.5rem;
    &:hover,
    &:focus {
      background: map_get($colors, main-color-dark);
    }
  }
}
</style>
