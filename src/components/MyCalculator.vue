<template>
  <div class="hello">
    <input v-model.number="first" @click="onClickInput('first')" id="firstInput">
    <input v-model.number="second" @click="onClickInput('second')" id="secondInput">

    <div :style="mt">
      <button
          v-for="symbol in symbols"
          :key="symbol"
          @click="handleMath(symbol)"
          :style="buttonStyle"
          :disabled="symbol == '/' && second == 0"
          :name="symbol"
      >
        {{ symbol }}
      </button>
    </div>

    <div :style="mt">Result: {{ result }}</div>

    <div style="margin-top: 100px">
      <input type="checkbox" id="check" :value="false" v-model="isChecked" style="cursor: pointer">
      <label for="check" style="cursor: pointer">Show keyboard</label>

      <div :style="mt" v-show="isChecked" id="keyboard">
        <button v-for="num in 10" :key="num" :style="buttonStyle" @click="onClickNum(num - 1)" :name="`${num - 1}`">{{ num - 1 }}</button>
        <button @click="onDeleteNum" name="backspace">← Backspace</button>

        <div :style="mt">
          <input type="radio" id="firstRadio" value="first" v-model="radio" style="cursor: pointer">
          <label for="firstRadio" style="cursor: pointer">Один</label>
          <input type="radio" id="secondRadio" value="second" v-model="radio" style="cursor: pointer">
          <label for="secondRadio" style="cursor: pointer">Два</label>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyCalculator',
  data() {
    return {
      first: 0,
      second: 0,
      result: null,
      isChecked: false,
      symbols: ['+', '-', '*', '/'],
      radio: 'first',
      buttonStyle: {
        marginRight: '5px',
        cursor: 'pointer'
      },
      mt: {
        marginTop: '10px'
      }
    }
  },
  methods: {
    handleMath(operation) {
      const {first, second} = this;
      switch (operation) {
        case '+':
          this.result = first + second;
          break;
        case '-':
          this.result = first - second;
          break;
        case '*':
          this.result = first * second;
          break;
        case '/':
          this.result = first / second;
          break;
      }
    },
    onClickNum(num) {
      this[this.radio] = +`${this[this.radio]}${num}`
    },
    onDeleteNum() {
      let newNumber = [...`${this[this.radio]}`];
      newNumber.length = newNumber.length - 1;
      this[this.radio] = +newNumber.join('');
    },
    onClickInput(radio) {
      this.radio = radio;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
