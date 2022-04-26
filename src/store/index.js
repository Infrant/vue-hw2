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
    setTableData(state, payload) {
      state.tableData = payload;
    },
    addTableData(state, payload) {
      state.tableData.push(payload);
    },
    deleteElement(state, payload) {
      const idx = state.tableData.findIndex(({id}) => id == payload);
      state.tableData.splice(idx, 1);
    },
    editElement(state, payload) {
      const idx = state.tableData.findIndex(({id}) => id == payload.id);
      state.tableData[idx] = payload;
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
