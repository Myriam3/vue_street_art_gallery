<template>
  <div class="image-details">
    <div class="image-details-wrap" :class="{ active: isInfo }">
      <span class="info location">
        {{ image.location }}
      </span>
      <span class="info"> {{ image.city }} - {{ image.country }} </span>
      <span class="info year">
        {{ image.year }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    image: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isInfo() {
      return this.$store.state.lightbox.info;
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/components/ImageDetails.scss";
</style>
