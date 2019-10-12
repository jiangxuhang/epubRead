<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
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
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>