<template>
  <div>
    <CountryList />
    <p>{{ country }}</p>
    <main class="main">
      <ImageList :images="images" />
    </main>
  </div>
</template>

<script>
import CountryList from "@/components/CountryList";
import ImageList from "@/components/ImageList";
import store from "@/store";

export default {
  components: {
    CountryList,
    ImageList,
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
  },
  beforeRouteUpdate(to, from, next) {
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
