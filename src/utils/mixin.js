import { mapGetters, mapActions } from 'vuex'
import { themeList, addCss, removeAllCss, getReadTimeByMinute } from './book'
import { saveLocation, getBookmark } from './localStorage'
export const ebookMixin = {
    methods: {
        ...mapActions([
            'setFileName',
            'setMenuVisible',
            'setSettingVisible',
            'setDefaultFontSize',
            'setDefaultFontFamily',
            'setFontFamilyVisible',
            'setDefaultTheme',
            'setBookAvailable',
            'setProgress',
            'setSection',
            'setIsPaginating',
            'setCurrentBook',
            'setNavigation',
            'setCover',
            'setMetadata',
            'setPaginate',
            'setPagelist',
            'setOffsetY',
            'setIsBookmark'
        ]),
        initGlobalStyle () {
            removeAllCss()
            switch (this.defaultTheme) {
                case 'Default' :
                addCss('http://39.96.186.64:8081/book/res/theme/theme_default.css')
                break
                case 'Eye' :
                addCss('http://39.96.186.64:8081/book/res/theme/theme_eye.css')
                break
                case 'Gold' :
                addCss('http://39.96.186.64:8081/book/res/theme/theme_gold.css')
                break
                case 'Night' :
                addCss('http://39.96.186.64:8081/book/res/theme/theme_night.css')
                break
            }
        },
        refreshLocation () {
            const currentLocation = this.currentBook.rendition.currentLocation()
            if (currentLocation && currentLocation.start) {
                const startCfi = currentLocation.start.cfi
                const progress = this.currentBook.locations.percentageFromCfi(startCfi)
                this.setProgress(Math.floor(progress * 100))
                this.setSection(currentLocation.start.index)
                saveLocation(this.fileName, startCfi)
                const bookmark = getBookmark(this.fileName)
                if (bookmark) {
                    if (bookmark.some(item => item.cfi === startCfi)) {
                        this.setIsBookmark(true)
                    } else {
                        this.setIsBookmark(false)
                    }
                } else {
                    this.setIsBookmark(false)
                }
            }
        },
        display (target, cb) {
            if (target) {
                return this.currentBook.rendition.display(target).then(() => {
                    this.refreshLocation()
                    if (cb) cb()
                })
            } else {
                return this.currentBook.rendition.display().then(() => {
                    this.refreshLocation()
                    if (cb) cb()
                })
            }
        },
        hideTitleAndMenu () {
            this.setMenuVisible(false)
            this.setSettingVisible(-1)
            this.setFontFamilyVisible(false)
        },
        getReadTimeText () {
            return this.$t('book.haveRead').replace('$1', getReadTimeByMinute(this.fileName))
        }
    },
    computed: {
        ...mapGetters([
            'fileName',
            'menuVisible',
            'settingVisible',
            'defaultFontSize',
            'defaultFontFamily',
            'fontFamilyVisible',
            'defaultTheme',
            'bookAvailable',
            'progress',
            'section',
            'isPaginating',
            'currentBook',
            'navigation',
            'cover',
            'metadata',
            'paginate',
            'pagelist',
            'offsetY',
            'isBookmark'
        ]),
        themeList () {
            return themeList(this)
        },
        getSectionName () {
            return this.section ? this.navigation[this.section].label : ''
        }
    }
}

export const storeHomeMixin = {
    computed: {
        ...mapGetters([
            'offsetY',
            'hotSearchOffsetY',
            'flapCardVisible'
        ])
    },
    methods: {
        ...mapActions([
            'setOffsetY',
            'setHotSearchOffsetY',
            'setFlapCardVisible'
        ])
    }
}
