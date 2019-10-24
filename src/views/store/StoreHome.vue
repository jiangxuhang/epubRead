<template>
    <div class="store-home">
        <search-bar></search-bar>
        <flap-card></flap-card>
        <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
            <div>111111111111111111</div>
            <div>111111111111111111</div>
            <div>111111111111111111</div>
            <div>111111111111111111</div>
            <div>111111111111111111</div>
            <div>111111111111111111</div>
            <div>111111111111111111</div>
            <div>111111111111111111</div>
            <div>222222222222222222</div>
            <div>222222222222222222</div>
            <div>222222222222222222</div>
            <div>222222222222222222</div>
            <div>222222222222222222</div>
            <div>222222222222222222</div>
            <div>222222222222222222</div>
            <div>333333333333333333</div>
            <div>333333333333333333</div>
            <div>333333333333333333</div>
            <div>333333333333333333</div>
            <div>333333333333333333</div>
        </scroll>
    </div>
</template>

<script>
import SearchBar from '../../components/home/SearchBar'
import Scroll from '../../components/common/Scroll'
import {storeHomeMixin} from '../../utils/mixin'
import FlapCard from '../../components/home/FlapCard'
export default {
    mixins: [storeHomeMixin],
    components: {
        SearchBar,
        Scroll,
        FlapCard
    },
    methods: {
        onScroll(offsetY) {
            this.setOffsetY(offsetY)
            if(offsetY > 0) {
                this.scrollTop = 52
            } else {
                this.scrollTop = 94
            }
            this.$refs.scroll.refresh()
        }
    },
    data() {
        return {
            scrollTop: 94
        }
    }
}
</script>

<style lang="scss">
@import "../../assets/styles/global";
.store-home {
    width: 100%;
    height: 100%;
}
</style>