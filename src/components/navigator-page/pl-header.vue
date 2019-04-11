<template>
    <div class="pl-header" :style="styles">
        <div class="pl-header-content-wrapper" :style="wrapperStyles">
            <pl-back-button/>
            <slot name="title"><span>{{title}}</span></slot>
        </div>
    </div>
</template>

<script>
    import PlBackButton from "./pl-back-button";

    export default {
        name: "pl-header",
        components: {PlBackButton},
        props: {
            title: {},
        },
        data() {
            return {
                totalWidth: null,
                page: null,
                pageLeft: null,
            }
        },
        mounted() {
            this.page = this.$plain.$dom.findComponentUpward(this, 'pl-page')
            this.totalWidth = this.page.$el.offsetWidth
            this.pageLeft = 0
            this.page.$on('move', (left) => {
                this.pageLeft = left
            })
        },
        computed: {
            wrapperStyles() {
                if (this.pageLeft == null) return null
                return {
                    left: `${this.pageLeft / 5}px`,
                }
            },
            styles() {
                if (this.pageLeft == null) return null
                return {
                    opacity: 1 - ((this.pageLeft / this.totalWidth).toFixed(2) - 0)
                }
            },
        },
    }
</script>