<template>
  <v-container>
    <v-row>
      <v-col class="col-4">{{ headerData[0] }}</v-col>
      <v-col class="col-3">{{ headerData[1] }}</v-col>
      <v-col class="col-3">{{ headerData[2] }}</v-col>
      <v-col class="col-1">{{ headerData[3] }}</v-col>
      <v-col class="col-1"></v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'TableHeader',
  components: {},
  props: {
    headerData: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>
