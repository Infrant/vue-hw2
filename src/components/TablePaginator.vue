<template>
  <div class="paginatorWrapper">
    <button
        class="paginatorEl"
        @click="setPageByArrow('-')"
        :disabled="currentPage == '1'"
    >
    </button>
    <button
        v-for="page in getTotalPagesCount"
        :key="page"
        class="paginatorEl"
        @click="setPage(page)"
    >
      {{ page }}
    </button>
    <button
        class="paginatorEl"
        @click="setPageByArrow('+')"
        :disabled="currentPage == getTotalPagesCount"
    >
      &gt;
    </button>
  </div>
</template>

<script>

export default {
  name: 'TablePaginator',
  components: {},
  props: {
    totalItems: Number,
    pageSize: Number
  },
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    getTotalPagesCount() {
      return Math.ceil(this.totalItems / this.pageSize);
    }
  },
  methods: {
    setPage(page) {
      this.currentPage = page;
      this.$emit('setPage', page)
    },
    setPageByArrow(symbol) {
      let page;
      const {currentPage} = this;
      switch (symbol) {
        case '+':
          page = currentPage + 1;
          break;
        case '-':
          page = currentPage - 1;
          break;
      }
      this.currentPage = page;
      this.$emit('setPage', page)
    },
  }
}
</script>

<style lang="scss" scoped>

.paginatorWrapper {
  margin-top: 20px;
  display: flex;
}

.paginatorEl {
  padding: 4px 8px;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 5px;
  }
}

</style>
