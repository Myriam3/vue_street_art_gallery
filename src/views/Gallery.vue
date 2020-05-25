<template>
  <div>
    <CountryList />
    <ImageList :images="images" @open-lightbox="openLightbox" />
    <Lightbox v-if="isLightbox" />
    <div class="overlay" v-if="isLightbox"></div>
  </div>
</template>

<script>
import store from "@/store";
import CountryList from "@/components/CountryList";
import ImageList from "@/components/ImageList";
import Lightbox from "@/components/Lightbox";

// TODO: open image in lighbox
// TODO: Lazy loading image

export default {
  components: {
    CountryList,
    ImageList,
    Lightbox,
  },
  props: {
    country: {
      type: String,
      default: "All",
    },
  },
  computed: {
    images() {
      return store.state.images.imageList;
    },
    isLightbox() {
      return store.state.lightbox.toggled;
    },
  },
  methods: {
    openLightbox(index) {
      store.dispatch("lightbox/displayImage", index);
    },
  },
  beforeRouteUpdate(to, from, next) {
    // TODO: no request, only filter
    // check previous route
    // if all -> country :: filter
    // if country -> all :: is first all request ? display all : request all
    // if country -> country :: is fist all request ?  filter : request by country
    if (to.params.country === "All") {
      store.dispatch("images/fetchAll").then(() => {
        next();
      });
    } else {
      store.dispatch("images/fetchByCountry", to.params.country).then(() => {
        next();
      });
    }
  },
};
</script>

<style lang="scss">
.overlay {
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
}

.overlay {
  position: fixed;
  background: rgba(0, 0, 0, 0.9);
}
</style>
