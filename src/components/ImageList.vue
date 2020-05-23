<template>
  <main class="main">
    <ul class="image-list">
      <li
        v-for="(image, index) in images"
        :key="index"
        class="image-list-item"
        :class="image.classes"
        v-show="index <= currentBatch - 1"
      >
        <a href="#" v-on:click.prevent>
          <img
            v-if="index <= currentBatch - 1"
            :src="imageServer + image.path + '/' + image.fileName"
            alt=""
          />
        </a>
      </li>
    </ul>
    <div class="pagination">
      <p>{{ currentBatch }} / {{ images.length }}</p>
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
// TODO: Image list accessibility/current-index (?)
// TODO: SVG World map navigation component
// TODO: Loader images (first load country + lazy load)
// TODO: request next batch in the background

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
  },
  methods: {
    loadMoreImages() {
      store.dispatch("images/displayImages");
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
