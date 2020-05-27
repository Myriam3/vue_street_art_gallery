<template>
  <nav class="country-list">
    <ul class="nav">
      <li
        v-if="countries.length > 0"
        class="nav-item"
        :class="{ active: !this.$route.params.country }"
      >
        <router-link
          :to="{ name: 'country-gallery', params: { country: 'All' } }"
        >
          All
        </router-link>
      </li>
      <li v-for="(country, index) in countries" :key="index" class="nav-item">
        <router-link
          :to="{
            name: 'country-gallery',
            params: { country: country },
          }"
        >
          {{ country }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {},
  methods: {},
  computed: {
    countries() {
      return this.$store.state.countries;
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/components/CountryList.scss";
</style>
