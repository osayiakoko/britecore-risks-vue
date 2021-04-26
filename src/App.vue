<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <router-link :to="{ name: 'RiskTypes'}" class="d-flex align-center">
        <v-img alt="BriteCore Logo" cover src="./assets/logo.png" transition="scale-transition" />
        <h1 class="ml-1 white--text">BriteCore</h1>
      </router-link>
    </v-app-bar>

    <v-main class="blue-grey lighten-5">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
  };
</script>
