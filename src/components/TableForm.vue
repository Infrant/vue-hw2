<template>
  <v-card class="text-left pa-8 mt-1">
    <form @submit.prevent="submitForm">
      <v-text-field v-model.trim="date" label="Date"/>
      <v-select v-model="category" label="Category" :items="this.$store.getters.getCategoryList"/>
      <v-text-field v-model.trim="value" label="Value"/>
      <div v-show="!category || !value" class="errorText">* Category и Value не должны быть пустыми</div>
      <v-btn :disabled="!category || !value" color="teal" @click="submitForm">Save</v-btn>
    </form>
  </v-card>
</template>

<script>

export default {
  name: 'TableForm',
  components: {},
  props: {},
  data() {
    return {
      date: '',
      category: '',
      value: '',
      id: 0,
      data: {},
      hasParams: false,
      editing: false,
    }
  },
  methods: {
    submitForm() {
      if (this.editing) {
        const data = {
          date: this.date,
          category: this.category,
          value: this.value,
          id: this.id
        }
        this.$store.commit('editElement', data);
        this.toCosts();
      }
      this.handleFormData();
      if (this.hasParams) {
        this.$store.commit('addTableData', this.data)
        this.toCosts();
      }
      this.$emit('addData', this.data);
    },
    handleFormData() {
      const id = Date.now();
      const {date, category, value} = this;
      const data = {
        date: date || this.getCurrentDate,
        category,
        value,
        id
      };
      this.data = data;
    },
    toCosts() {
      this.$router.push({name: 'costs'})
    }
  },
  computed: {
    getCurrentDate() {
      const newDate = new Date();
      const day = newDate.getDate();
      const month = newDate.getMonth() + 1;
      const year = newDate.getFullYear();

      return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`
    }
  },
  mounted() {
    if (!this.$store.getters.getCategoryList.length) {
      this.$store.dispatch('loadCategories')
    }
    const hasParams = Object.keys(this.$route?.params).length;
    const isEditing = this.$route?.query.isEditing;

    if (isEditing) {
      const {category} = this.$route.params;
      const {value, id, date} = this.$route.query;
      this.category = category;
      this.value = value;
      this.id = id;
      this.date = date;
      this.editing = true;
      return;
    }
    if (hasParams) {
      this.hasParams = true;
      const {category} = this.$route.params;
      const {value} = this.$route.query;
      this.category = category;
      this.value = value;
    }

    if (this.category && this.value) {
      this.handleFormData();
      this.$store.commit('addTableData', this.data)
      this.$router.push({name: 'costs'})
    }
  }
}
</script>

<style lang="scss" scoped>

.errorText {
  font-size: 12px;
  color: red;
}
</style>
