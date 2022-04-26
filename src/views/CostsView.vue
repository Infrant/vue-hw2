<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-h5 text-sm-h3 pb-3">My personal costs</div>
        <v-dialog
            v-model="isFormShow"
        >
          <template #activator="{on}">
            <v-btn color="teal" v-on="on" dark>{{ formBtnCaption }}
              <v-icon>{{ formBtnIcon }}</v-icon>
            </v-btn>
          </template>
          <v-card>
            <TableForm @addData="addData"/>
          </v-card>
        </v-dialog>
        <TableHeader :headerData="getHeaderDataData"/>
        <TableContent :tableData="this.filteredTableData"/>
        <div class="text-center">
          <v-container>
            <v-row justify="center">
              <v-col cols="8">
                <v-container class="max-width">
                  <v-pagination
                      v-model="currentPage"
                      class="my-4"
                      :length="getTotalPagesCount"
                  ></v-pagination>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
      <v-col>
        <MyApexchart
            type="pie" width="380" :options="chartOptions" :series="series" ref="myChart">
        </MyApexchart>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TableHeader from "@/components/TableHeader";
import TableContent from "@/components/TableContent";
import TableForm from "@/components/TableForm";
import '../plugins/apexcharts'
export default {
  name: 'App',
  components: {
    TableForm,
    TableContent,
    TableHeader
  },
  data() {
    return {
      isFormShow: false,
      currentPage: 1,
      pageSize: 5,
      series: [0, 0, 0],
      chartOptions: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Clothing', 'Transport', 'Food'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    }
  },
  computed: {
    formBtnCaption() {
      return this.isFormShow ? 'Close Form' : 'Open Form'
    },
    formBtnIcon() {
      return this.isFormShow ? 'mdi-minus' : 'mdi-plus'
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
    getTotalPagesCount() {
      return Math.ceil(this.getStoreTableData.length / this.pageSize);
    }
  },
  methods: {
    formBtnHandler() {
      this.isFormShow = !this.isFormShow;
    },
    addData(data) {
      this.$store.commit('addTableData', data)
      this.isFormShow = false
      this.updatePie();
    },
    setPage(page) {
      this.currentPage = page
    },
    getClothing() {
     return this.getStoreTableData.reduce((acc, el) => {
        return +acc + +(el.category === 'Clothing' && el.value)
      }, 0);
    },
    getTransport() {
      return this.getStoreTableData.reduce((acc, el) => {
        return +acc + +(el.category === 'Transport' && el.value)
      }, 0);
    },
    getFood() {
      return this.getStoreTableData.reduce((acc, el) => {
        return +acc + +(el.category === 'Food' && el.value)
      }, 0);
    },
    updatePie() {
      this.series[0] = this.getClothing();
      this.series[1] = this.getTransport();
      this.series[2] = this.getFood();
      this.$refs.myChart.refresh();
    },
    fetchData() {
      const tableData = [];

      for (let i = 0; i < 60; i++) {
        tableData.push({
          id: Date.now() + i,
          date: '08.03.2022',
          category: 'Food',
          value: '100'
        })
      }

      return tableData;
    }
  },
  created () {
    if (!this.$store.getters.getDataStatus) this.$store.commit('setTableData', this.fetchData());
    this.$store.commit('setFetchDataStatus',true);
  },
  mounted() {
    this.updatePie();
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