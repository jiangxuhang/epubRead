<template>
    <div class="store-home">
        <search-bar></search-bar>
        <scroll :top="94" @onScroll="onScroll">
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
export default {
    mixins: [storeHomeMixin],
    components: {
        SearchBar,
        Scroll
    },
    methods: {
        onScroll(offsetY) {
            this.setOffsetY(offsetY)
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