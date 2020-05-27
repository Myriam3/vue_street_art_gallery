<template>
  <span ref="loader">
    <img alt="" :src="imageServeur + path" @load="transition" v-on="listener" />
  </span>
</template>
<script>
export default {
  props: {
    path: {
      type: String,
      required: true,
    },
    lightbox: {
      type: Boolean,
    },
  },
  computed: {
    imageServeur() {
      return this.$store.state.images.imageServer;
    },
    listener() {
      if (this.lightbox) {
        return {
          click: this.toggleInfo,
        };
      } else return null;
    },
  },
  methods: {
    transition() {
      if (this.$refs.loader) this.$refs.loader.classList.remove("loading");
    },
    toggleInfo() {
      this.$emit("toggle-info");
    },
  },
  mounted() {
    this.$refs.loader.classList.add("loading");
  },
  updated() {
    this.$refs.loader.classList.add("loading");
  },
};
</script>

<style lang="scss" scoped>
img {
  transition: 0.5s opacity ease-out;
}

.loading img,
a:focus .loading img {
  opacity: 0;
}
</style>
