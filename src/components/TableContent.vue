<template>
  <v-container>
    <v-row
        v-for="(item) in tableData"
        :key="item.id"
    >
      <v-col class="col-4">{{ item.id }}</v-col>
      <v-col class="col-3">{{ item.date }}</v-col>
      <v-col class="col-3">{{ item.category }}</v-col>
      <v-col class="col-1">{{ item.value }}</v-col>
      <v-col class="col-1 pt-1">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
                v-for="(contextData, index) in contextData"
                :key="index"
                style="cursor: pointer"
            >
              <v-list-item-title @click="onClickContextMenu(contextData, item)">{{ contextData }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
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
    return {
      contextData: ['Edit', 'Delete']
    }
  },
  methods: {
    onClickEdit(item) {
      this.$router.push(
          {
            name: 'form',
            params: {category: item.category},
            query: {
              id: item.id,
              date: item.date,
              value: item.value,
              isEditing: true
            }
          })
    },
    onClickDelete(item) {
      this.$store.commit('deleteElement', item.id)
    },
    onClickContextMenu(action, item) {
      switch (action) {
        case 'Edit':
          this.onClickEdit(item);
          break;
        case 'Delete':
          this.onClickDelete(item);
          break;
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
