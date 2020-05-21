<template>
  <div>
    <CountryList />
    <p>{{ country }}</p>
  </div>
</template>

<script>
import CountryList from "@/components/CountryList";
export default {
  components: {
    CountryList,
  },
  props: {
    country: {
      type: String,
      default: "All",
    },
  },
};
</script>
