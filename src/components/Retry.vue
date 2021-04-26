<template>
  <div class="text-center">
    <h2 class="my-4 grey--text text--darken-2">Unable to fetch data</h2>
    <v-btn small color="secondary" @click="onRetry()">retry</v-btn>
    <router-link v-if="homeLink" :to="{ name: 'RiskTypes'}" class="d-block mt-2">go to homepage</router-link>
  </div>
</template>

<script>
export default {
  props: {
    homeLink: {
      default: true,
      type: Boolean,
    },
  },
  methods: {
    onRetry() {
      this.$emit("retry");
    },
  },
};
</script>
