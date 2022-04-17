<template>
  <div>
    <div
        v-for="(item) in tableData"
        :key="item.id"
        class="contentWrapper"
    >
      <span>{{ item.id }}</span>
      <span>{{ item.date }}</span>
      <span>{{ item.category }}</span>
      <span>
        {{ item.value }}
        <span
            class="contextMenu"
            @click="onClickContextItem($event, item)"

        >
          ...
        </span>
      </span>
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
  },
  methods: {
    editItem(item) {
      console.log(item);
    },
    onClickContextItem(event, item) {
      const items = [
        {
          text: "Edit",
          action: () => {
            this.$router.push(
                {
                  name: 'form',
                  params: {category: item.category},
                  query: {
                    id: item.id,
                    date: item.date,
                    value: item. value,
                    isEditing: true
                  }
                })
          },
        },
        {
          text: "Delete",
          action: () => {
            this.$store.commit('deleteElement', item.id)
          },
        },
      ];
      this.$contextMenu.show({event, items})
    },
  },
}
</script>

<style lang="scss" scoped>

.contentWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: start;
  margin-top: 10px;
}

.contextMenu {
  cursor: pointer;
}
</style>
