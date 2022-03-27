import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tableData: [],
    headerData: ['#', "Date", 'Category', "Value"],
    categoryList: []
  },
  getters: {
    getTableData: state => state.tableData,
    getTotalCost: state => {
      return state.tableData.reduce((acc, el) => acc + +el.value, 0)
    },
    getHeaderData: state => state.headerData,
    getCategoryList: state => state.categoryList
  },
  mutations: {
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
  },
  actions: {
    fetchData({commit}) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
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
          ])
        }, 1000)
      })
          .then(res => {
            commit('setTableData', res)
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
