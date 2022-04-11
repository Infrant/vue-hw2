import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tableData: [],
    headerData: ['#', "Date", 'Category', "Value"],
    categoryList: [],
    isLoaded: false
  },
  getters: {
    getTableData: state => state.tableData,
    getTotalCost: state => {
      return state.tableData.reduce((acc, el) => acc + +el.value, 0)
    },
    getHeaderData: state => state.headerData,
    getCategoryList: state => state.categoryList,
    getDataStatus: state => state.isLoaded
  },
  mutations: {
    /* eslint-disable */
    setTableData(state, payload) {
      state.tableData = payload;
    },
    addTableData(state, payload) {
      state.tableData.push(payload);
    },
    setCategories(state, payload) {
      if (!Array.isArray(payload)) {
        payload = [payload]
      }
      state.categoryList.push(...payload)
    },
    setFetchDataStatus(state, payload) {
      state.isLoaded = payload
    }
  },
  actions: {
    fetchData({commit}) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const tableData = [];
          for (let i = 0; i < 10; i++) {
            tableData.push({
              id: Date.now() + i,
              date: '08.03.2022',
              category: 'Food',
              value: '100'
            })
          }
          resolve(tableData)
        }, 0)
      })
          .then(res => {
            commit('setTableData', res);
            commit('setFetchDataStatus', true)
          })
    },
    loadCategories({commit}) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(['Clothing', 'Transport', 'Food'])
        }, 1000)
      })
          .then(res => {
            commit('setCategories', res)
          })
    },
  },
})
