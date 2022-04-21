<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/calculator">Calculator</router-link> |
      <router-link to="/costs">Costs</router-link>
    </nav>
    <router-view/>
    <transition name="fade">
      <ContextMenu />
    </transition>
  </div>
</template>

<script>
import ContextMenu from './components/ContextMenu.vue';
export default {
  components: {
    ContextMenu
  },
  mounted() {
    if (this.$store.getters.getDataStatus) return;
    this.$store.dispatch('fetchData')
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
