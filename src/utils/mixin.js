import { mapGetters, mapActions } from 'vuex'
import { themeList, addCss, removeAllCss, getReadTimeByMinute } from './book'
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
        }
    }
}
