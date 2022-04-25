<template>
  <v-app>
    <v-app-bar
        app
    >
      <v-btn plain :ripple="false" to="/">Home</v-btn>
      <v-btn plain :ripple="false" to="costs">Costs</v-btn>
      <v-btn plain :ripple="false" to="about">About</v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  mounted() {
    if (this.$store.getters.getDataStatus) return;
    this.$store.dispatch('fetchData')
  }
};
</script>
