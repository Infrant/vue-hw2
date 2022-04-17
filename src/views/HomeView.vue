<template>
  <div class="home">
    <router-link
        :to="{
        name: 'form',
        params: { category: 'Clothing'},
        query: {value: 500}
      }"
    >
      Clothing 500
    </router-link>
    /

    <router-link
        :to="{
        name: 'form',
        params: { category: 'Transport' },
        query: {value: 100}
      }"
    >
      Transport 100
    </router-link>
    /

    <router-link
        :to="{ name: 'form', params: { category: 'Food' } }"
    >
      Food
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {}
}
</script>
