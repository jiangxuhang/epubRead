<template>
    <div class="ebook-reader">
        <div id="read"></div>
    </div>
</template>
<script>
import Epub from 'epubjs'
import {ebookMixin} from '../../utils/mixin'
global.epub = Epub
export default {
    mixins:[ebookMixin],
    methods: {
        prevPage() {
            if(this.rendition) {
                this.rendition.prev()
                this.hideTitleAndMenu()
            }
        },
        nextPage() {
            if(this.rendition) {
                this.rendition.next()
                this.hideTitleAndMenu()
            }
        },
        toggleTitleAndMenu() {
            this.setMenuVisible(!this.menuVisible)
        },
        hideTitleAndMenu() {
            this.setMenuVisible(false)
        },
        initEpub() {
            const url = 'http://39.96.186.64:8081/epub/' + this.fileName + '.epub'
            this.book = new Epub(url)
            this.rendition = this.book.renderTo('read', {
               width: innerWidth,
               height: innerHeight,
               //method: 'default'
           })
           this.rendition.display()
           this.rendition.on('touchstart', event => {
               this.touchStartX = event.changedTouches[0].clientX
               this.touchStartTime = event.timeStamp
           })
           this.rendition.on('touchend', event => {
               const offsetX = event.changedTouches[0].clientX - this.touchStartX
               const time = event.timeStamp - this.touchStartTime
               if(time < 500 && offsetX > 40) {
                   this.prevPage()
               } else if (time < 500 && offsetX < -40) {
                   this.nextPage()
               } else {
                   this.toggleTitleAndMenu()
               }
           })
        }
    },
    mounted() {
        this.setFileName(this.$route.params.fileName.split('|').join('/')).then(() => {
            this.initEpub()
        })
    }
}
</script>
<style lang="scss">
    @import "../../assets/styles/global";
</style>