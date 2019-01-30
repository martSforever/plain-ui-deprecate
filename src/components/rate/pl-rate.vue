<template>
    <div class="pl-rate" @mousedown="p_mousedown">
        <div class="pl-rate-active" :style="activeStyles">
            <pl-icon v-for="(index) in data" icon="pl-star-fill" :key="index"/>
        </div>
        <div class="pl-rate-inactive">
            <pl-icon v-for="(index) in data" icon="pl-star" :key="index"/>
        </div>
    </div>
</template>

<script>
    import {MountedMixin, ValueMixin} from "../../mixin/component-mixin";
    import PlIcon from "../icon/pl-icon";

    export default {
        name: "pl-rate",
        components: {PlIcon},
        mixins: [ValueMixin, MountedMixin],
        props: {
            value: {type: Number, default: 0},
            total: {type: Number, default: 5},
            count: {type: Number, default: 5},
        },
        data() {
            return {
                _totalWidth: null,
                _elLeft: null,
            }
        },
        computed: {
            data() {
                let i = 0
                let ret = []
                while (i < this.count) {
                    ret.push(i)
                    i++
                }
                return ret
            },
            activeStyles() {
                return {
                    width: (this.currentValue / this.total) * 100 + '%'
                }
            },
            totalWidth() {
                if (!this.p_mounted) return 0
                if (!this._totalWidth) this._totalWidth = this.$el.offsetWidth
                return this._totalWidth
            },
            elLeft() {
                if (!this._elLeft) this._elLeft = this.$el.getBoundingClientRect().left
                return this._elLeft
            },
        },
        methods: {
            p_mousedown(e) {
                window.document.addEventListener('mousemove', this.p_mousemove)
                window.document.addEventListener('mouseup', this.p_mouseup)
                this.$plain.$dom.enableSelectNone()
                this.reset(e)
            },
            p_mousemove(e) {
                this.reset(e)
            },
            p_mouseup(e) {
                window.document.removeEventListener('mousemove', this.p_mousemove)
                window.document.removeEventListener('mouseup', this.p_mouseup)
                this.$plain.$dom.disabledSelectNone()
            },
            reset(e) {
                this.currentValue = (Math.max(0, Math.min((e.clientX - this.elLeft) / this.totalWidth, 1)) * this.total).toFixed(2) - 0
            },
        }
    }
</script>

<style lang="scss">
    .pl-rate {
        @include public-style;
        position: relative;
        display: inline-block;
        cursor: pointer;
        .pl-rate-active {
            white-space: nowrap;
            overflow: hidden;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
        }
    }
</style>