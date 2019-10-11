<template>
  <div id="app">
    <span class="text">ABCDEFG</span>
    <router-view/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['test'])
  },
  mounted() {
    this.$store.dispatch('setTest', 9).then(() => {
      console.log(this.test)
    })
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  if(fontSize > 50) {
    fontSize = 50
  }
  html.style.fontSize = fontSize + 'px'
})
</script>

<style lang="scss">
@import "./assets/styles/global";
  .text {
    font-family: "Days One";
    font-size: px2rem(37.5);
  }
</style>