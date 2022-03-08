<template>
  <div id="app">
    <button @click="formBtnHandler" class="formBtn">{{ formBtnCaption }}</button>
    <TableForm v-show="isFormShow" @addData="addData" :tableLength="this.tableData.length"/>
    <TableHeader :headerData="headerData"/>
    <TableContent :tableData="this.getTableData"/>
    <TablePaginator
        :totalItems="tableData.length"
        :pageSize="this.pageSize"
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
      headerData: ['#', "Date", 'Category', "Value"],
      tableData: [
        {
          id: 1,
          date: '08.03.2022',
          category: 'Food',
          value: '100'
        },
        {
          id: 2,
          date: '08.03.2022',
          category: 'Transport',
          value: '100'
        },
        {
          id: 3,
          date: '08.03.2022',
          category: 'Clothing',
          value: '100'
        },
        {
          id: 4,
          date: '08.03.2022',
          category: 'Food',
          value: '100'
        },
        {
          id: 5,
          date: '08.03.2022',
          category: 'Transport',
          value: '100'
        },
        {
          id: 6,
          date: '08.03.2022',
          category: 'Clothing',
          value: '100'
        }
      ],
      isFormShow: false,
      currentPage: 1,
      pageSize: 5
    }
  },
  computed: {
    formBtnCaption() {
      return this.isFormShow ? 'Close Form' : 'Open Form'
    },
    getTableData() {
      const left = (this.currentPage - 1) * this.pageSize;
      const right = this.currentPage * this.pageSize;
      return this.tableData.filter((el, idx) => left <= idx && idx < right)
    }
  },
  methods: {
    formBtnHandler() {
      this.isFormShow = !this.isFormShow;
    },
    addData(data) {
      this.tableData.push(data);
    },
    setPage(page) {
      this.currentPage = page
    }
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
