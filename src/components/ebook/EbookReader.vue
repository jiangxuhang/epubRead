<template>
    <div class="ebook-reader">
        <div id="read"></div>
        <div class="ebook-reader-mask" 
        @click="onMaskClick"
        @touchmove="move"
        @touchend="moveEnd"
        @mousedown.left="onMouseEnter"
        @mousemove.left="onMouseMove"
        @mouseup.left="onMouseEnd"></div>
    </div>
</template>
<script>
import Epub from 'epubjs'
import {ebookMixin} from '../../utils/mixin'
import { getFontFamily, saveFontFamily, getFontSize, saveFontSize,getTheme,saveTheme } from '../../utils/localStorage'
import { getLocation } from '../../../../vue-imooc-ebook-chapter/src/utils/localStorage';
import { flatten } from '../../utils/book';
import { getLocalForage } from '../../utils/localForage'
global.epub = Epub
export default {
    mixins:[ebookMixin],
    methods: {
        onMouseEnter(e) {
            this.mouseState = 1//鼠标进入
            this.mouseStartTime = e.timeStamp
            e.preventDefault()
            e.stopPropagation()
        },
        onMouseMove(e) {
            if(this.mouseState === 1) {
                this.mouseState = 2//鼠标进入后移动
            } else if(this.mouseState === 2) {
                let offsetY = 0
                if(this.firseOffsetY) {
                    offsetY = e.clientY - this.firseOffsetY
                    this.setOffsetY(offsetY)
                } else {
                    this.firseOffsetY = e.clientY
                }
            }
            e.preventDefault()
            e.stopPropagation()
        },
        onMouseEnd(e) {
            if(this.mouseState === 2) {
                this.setOffsetY(0)
                this.firseOffsetY = null
                this.mouseState = 3
            } else {
                this.mouseState = 4
            }
            const time = e.timeStamp - this.mouseStartTime
            if(time < 100) {
                this.mouseState = 4
            }
            e.preventDefault()
            e.stopPropagation()
        },
        move(e) {
            let offsetY = 0
            if(this.firseOffsetY) {
                offsetY = e.changedTouches[0].clientY - this.firseOffsetY
                this.setOffsetY(offsetY)
            } else {
                this.firseOffsetY = e.changedTouches[0].clientY
            }
            e.preventDefault()
            e.stopPropagation()
        },
        moveEnd() {
            this.setOffsetY(0)
            this.firseOffsetY = null
        },
        onMaskClick(e) {
            if(this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) return
            const offsetX = e.offsetX;
            const width = window.innerWidth
            if(offsetX > 0 && offsetX < width * 0.3) {
                this.prevPage()
            } else if (offsetX > 0 && offsetX > width * 0.7) {
                this.nextPage()
            } else {
                this.toggleTitleAndMenu()
            }
        },
        prevPage() {
            if(this.rendition) {
                this.rendition.prev().then(() => {
                    this.refreshLocation()
                })
                this.hideTitleAndMenu()
            }
        },
        nextPage() {
            if(this.rendition) {
                this.rendition.next().then(() => {
                    this.refreshLocation()
                })
                this.hideTitleAndMenu()
            }
        },
        toggleTitleAndMenu() {
            if(this.menuVisible) {
                this.setSettingVisible(-1)
                this.setFontFamilyVisible(false)
            }
            this.setMenuVisible(!this.menuVisible)
        },
        initFontSize() {
            let fontSize = getFontSize(this.fileName)
            if(!fontSize) {
                saveFontSize(this.fileName, this.defaultFontSize)
            } else {
                this.rendition.themes.fontSize(fontSize + 'px')
                this.setDefaultFontSize(fontSize)
            }
        },
        initFontFamily() {
            let font = getFontFamily(this.fileName)
            if(!font) {
                saveFontFamily(this.fileName, this.defaultFontFamily)
            } else {
                this.rendition.themes.font(font)
                this.setDefaultFontFamily(font)
            }
        },
        initTheme() {
            let defaultTheme = getTheme(this.fileName)
            if(!defaultTheme) {
                defaultTheme = this.themeList[0].name
                saveTheme(this.fileName, defaultTheme)
            }
            this.setDefaultTheme(defaultTheme)
            this.themeList.forEach(theme => {
                this.rendition.themes.register(theme.name, theme.style)
            })
            this.rendition.themes.select(defaultTheme)
        },
        initRendition() {
            this.rendition = this.book.renderTo('read', {
               width: window.innerWidth,
               height: window.innerHeight,
               method: 'default'
           })
           const location = getLocation(this.fileName)
           this.display(location, () => {
               this.initTheme()
               this.initFontSize()
               this.initFontFamily()
               this.initGlobalStyle()
               this.refreshLocation()
           })
           this.rendition.hooks.content.register(contents => {
               contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`)
               contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`)
               contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`)
               contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
           })
        },
        initGesture() {
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

        },
        parseBook() {
            this.book.loaded.cover.then(cover => {
                this.book.archive.createUrl(cover).then(url => {
                    this.setCover(url)
                })
            })
            this.book.loaded.metadata.then(metadata => {
                this.setMetadata(metadata)
            })
            this.book.loaded.navigation.then(nav => {
                const navItem = flatten(nav.toc)
                function find(item, level = 0) {
                    if(!item.parent) {
                        return level
                    } else {
                        find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++ level)
                    }
                }
                navItem.forEach(item => {
                    item.level = find(item)
                })
                this.setNavigation(navItem)
            })
        },
        initEpub(url) {
            this.book = new Epub(url)
            this.setCurrentBook(this.book)
            this.initRendition()
            this.initGesture()
            this.parseBook()
            this.book.ready.then(() => {
                return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
            }).then((locations) => {
                this.setBookAvailable(true)
                this.refreshLocation()
            })
        }
    },
    mounted() {
        const books = this.$route.params.fileName.split('|')
        const fileName = books[1]
        getLocalForage(fileName, (err, blob) => {
            if(!err && blob) {
                console.log('离线缓存')
                this.setFileName(books.join('/')).then(() => {
                    this.initEpub(blob)
                })
            } else {
                console.log('在线获取')
                this.setFileName(books.join('/')).then(() => {
                    const url = 'http://39.96.186.64:8081/epub/' + this.fileName + '.epub'
                    this.initEpub(url)
                })
            }
        })
    }
}
</script>
<style lang="scss">
    @import "../../assets/styles/global";
    .ebook-reader {
        position: relative;
        width:100%;
        height: 100%;
        overflow: hidden;
        .ebook-reader-mask {
            position: absolute;
            z-index: 150;
            top: 0;
            background-color: transparent;
            left: 0;
            width: 100%;
            height: 100%;
            
        }
    }
</style>