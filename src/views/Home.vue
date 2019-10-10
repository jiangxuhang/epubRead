<template>
  <div class="home">
    <div id="read"></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
global.epub = Epub
export default {
  mounted () {
    this.book = new Epub('/漆黑的子弹1：以神为目标的人们.epub')
    this.book.renderTo('read', {
      width: window.innerWidth,
      height: window.innerHeight
    }).display()
    console.log(this.book)
  }
}
</script>
