<template>
  <ul class="image-list">
    <li v-for="(image, index) in images" :key="index" class="image-list-item">
      {{ image.fileName }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
};
</script>
