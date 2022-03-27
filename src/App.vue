<template>
  <div id="app">
    <button @click="formBtnHandler" class="formBtn">{{ formBtnCaption }}</button>
    <TableForm v-show="isFormShow" @addData="addData" :tableLength="getStoreTableData.length"/>
    <div>Total cost: {{getTotalCost}}</div>
    <TableHeader :headerData="getHeaderDataData"/>
    <TableContent :tableData="filteredTableData"/>
    <TablePaginator
        :totalItems="getStoreTableData.length"
        :pageSize="pageSize"
        @setPage="setPage"
    />
  </div>
</template>

<script>

import TableHeader from "@/components/TableHeader";
import TableContent from "@/components/TableContent";
import TableForm from "@/components/TableForm";
import TablePaginator from "@/components/TablePaginator";

export default {
  name: 'App',
  components: {
    TablePaginator,
    TableForm,
    TableContent,
    TableHeader
  },
  data() {
    return {
      isFormShow: false,
      currentPage: 1,
      pageSize: 5
    }
  },
  computed: {
    formBtnCaption() {
      return this.isFormShow ? 'Close Form' : 'Open Form'
    },
    filteredTableData() {
      const left = (this.currentPage - 1) * this.pageSize;
      const right = this.currentPage * this.pageSize;
      return this.getStoreTableData.slice(left, right)
    },
    getTotalCost() {
      return this.$store.getters.getTotalCost;
    },
    getStoreTableData() {
      return this.$store.getters.getTableData
    },
    getHeaderDataData() {
      return this.$store.getters.getHeaderData
    },
  },
  methods: {
    formBtnHandler() {
      this.isFormShow = !this.isFormShow;
    },
    addData(data) {
      this.$store.commit('addTableData', data)
    },
    setPage(page) {
      this.currentPage = page
    },
  },
  mounted() {
    this.$store.dispatch('fetchData')
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 200px auto 0;
  max-width: 1140px;
}
</style>
