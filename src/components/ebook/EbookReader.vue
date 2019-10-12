<template>
    <div class="ebook-reader">
        <div id="read"></div>
    </div>
</template>
<script>
import Epub from 'epubjs'
import {mapGetters} from 'vuex'
global.epub = Epub
export default {
    computed: {
        ...mapGetters(['fileName'])
    },
    methods: {
        initEpub() {
            const url = this.fileName + '.epub'
            this.book = new Epub(url)
            this.rendition = this.book.renderTo('read', {
               width: innerWidth,
               height: innerHeight,
               method: 'default'
           })
           this.rendition.display()
        }
    },
    mounted() {
        const fileName = this.$route.params.fileName
        console.log(fileName)
        this.$store.dispatch('setFileName', fileName).then(() => {
            this.initEpub()
        })
    }
}
</script>
<style lang="scss">
    @import "../../assets/styles/global";
</style>