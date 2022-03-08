<template>
  <div>
    <div
        v-for="{date, category, value, id} in tableData"
        :key="id"
        class="contentWrapper"
    >
      <span>{{ id }}</span>
      <span>{{ date }}</span>
      <span>{{ category }}</span>
      <span>{{ value }}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TableContent',
  components: {},
  props: {
    tableData: {
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

.contentWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: start;
  margin-top: 10px;
}
</style>
