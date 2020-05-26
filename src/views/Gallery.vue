<template>
  <div>
    <CountryList />
    <CityList
      v-if="!isAllCountries"
      :cityList="cityList"
      :currentCity="this.cityFilter"
      @city-filter="filterByCity"
    />
    <Worldmap v-if="isAllCountries" />
    <ImageList :images="images" @open-lightbox="openLightbox" />
    <Lightbox v-if="isLightbox" :images="images" />
    <div class="overlay" v-if="isLightbox"></div>
  </div>
</template>

<script>
import store from "@/store";
import CountryList from "@/components/CountryList";
import CityList from "@/components/CityList";
import Worldmap from "@/components/Worldmap";
import ImageList from "@/components/ImageList";
import Lightbox from "@/components/Lightbox";

export default {
  components: {
    CountryList,
    CityList,
    Worldmap,
    ImageList,
    Lightbox,
  },
  props: {
    country: {
      type: String,
      default: "All",
    },
  },
  data() {
    return {
      cityFilter: false,
    };
  },
  computed: {
    images() {
      if (this.cityFilter) {
        return this.imagesByCity;
      } else {
        return this.storeImages;
      }
    },
    storeImages() {
      return store.state.images.imageList;
    },
    imagesByCity() {
      return this.storeImages.filter((img) => img.city === this.cityFilter);
    },
    isLightbox() {
      return store.state.lightbox.toggled;
    },
    isAllCountries() {
      return this.$route.params.country === "All";
    },
    cityList() {
      if (this.isAllCountries) return [];
      else {
        let cities = this.storeImages.reduce((acc, next) => {
          acc.push(next.city);
          return acc;
        }, []);
        // Remove duplicates
        cities = Array.from(new Set(cities));

        return cities;
      }
    },
  },
  methods: {
    openLightbox(index, lastFocusEl) {
      store.dispatch("lightbox/displayImage", { index, lastFocusEl });
    },
    filterByCity(filter) {
      if (filter === this.cityFilter) return;
      this.cityFilter = filter;
      console.log("images by city", this.imagesByCity);
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
    //Reset city filter
    this.cityFilter = false;
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
