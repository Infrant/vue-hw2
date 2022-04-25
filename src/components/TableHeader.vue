<template>
  <v-container>
    <v-row>
      <v-col
          v-for="caption in headerData"
          :key="caption"
        >
        {{caption}}
      </v-col>
    </v-row>
  </v-container>
<!--  <div class="headerWrapper">-->
<!--    <div-->
<!--        v-for="caption in headerData"-->
<!--        :key="caption"-->
<!--        class="headerEl"-->
<!--    >-->
<!--      {{ caption }}-->
<!--    </div>-->
<!--  </div>-->
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

.headerWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: start;
  margin-top: 10px;
}

.headerEl {
  font-weight: bold;
}
</style>
