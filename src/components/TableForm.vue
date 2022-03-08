<template>
  <form class="formWrapper" @submit.prevent="submitForm">
    <input type="text" v-model.trim="date" class="formEl" placeholder="Date">
    <input type="text" v-model.trim="category" class="formEl" placeholder="Category">
    <input type="text" v-model.trim="value" class="formEl" placeholder="Value">
    <span v-show="!category || !value" class="errorText">* Category и Value не должны быть пустыми</span>
    <button :disabled="!category || !value" class="saveBtn">Save</button>
  </form>
</template>

<script>

export default {
  name: 'TableForm',
  components: {},
  props: {
    tableLength: Number
  },
  data() {
    return {
      date: '',
      category: '',
      value: '',
    }
  },
  methods: {
    submitForm() {
      const id = this.tableLength + 1;
      const {date, category, value} = this;
      const data = {
        date: date || this.getCurrentDate,
        category,
        value,
        id
      };
      this.$emit('addData', data);
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
  }
}
</script>

<style lang="scss" scoped>

.formWrapper {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.formEl {
  width: 300px;

  &:not(:first-child) {
    margin-top: 5px;
  }
}

.errorText {
  font-size: 12px;
  color: red;
}

.saveBtn {
  margin-top: 10px;
}
</style>
