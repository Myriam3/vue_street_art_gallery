<template>
  <nav class="city-list">
    <ul class="nav">
      <li
        v-if="cityList.length > 1"
        class="nav-item"
        :class="{ active: !currentCity }"
      >
        <a href="#" @click="filterByCity(false, $event)">All</a>
      </li>
      <li
        v-for="(city, index) in cityList"
        :key="index"
        class="nav-item"
        :class="{ active: currentCity === city }"
      >
        <a
          v-if="cityList.length > 1"
          href="#"
          @click="filterByCity(city, $event)"
        >
          {{ city }}
        </a>
        <template v-else>
          {{ city }}
        </template>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: {
    cityList: {
      type: Array,
      required: true,
    },
    currentCity: {
      type: [Boolean, String],
      required: true,
    },
  },
  methods: {
    filterByCity(city, e) {
      e.preventDefault();
      this.$emit("city-filter", city);
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/components/CityList.scss";
</style>
