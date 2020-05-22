<template>
  <ul class="image-list">
    <li
      v-for="(image, index) in images"
      :key="index"
      class="image-list-item"
      :class="image.classes"
    >
      <a href="#" v-on:click.prevent>
        <img :src="imageServer + image.path + '/' + image.fileName" alt="" />
      </a>
    </li>
  </ul>
</template>

<script>
// TODO: Image list accessibility/current-index (?)
// TODO: SVG World map navigation component

export default {
  props: {
    images: {
      type: Array,
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
@import "@/scss/components/ImageList.scss";
</style>
