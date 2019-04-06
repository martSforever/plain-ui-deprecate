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

<style lang="scss">
    .pl-header {
        height: 44px;
        position: relative;
        z-index: 1;
        background-color: white;
        transition: var(--p-page-transition);
        opacity: 0.2;
        .pl-header-content-wrapper {
            height: 100%;
            width: 100%;
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            padding: 0 6px;
            box-sizing: border-box;
            background-color: white;
            transition: var(--p-page-transition);
            left: 20%;
            .pl-back-button {
                margin-right: var(--p-padding);
            }
        }
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 1px;
            box-shadow: 0 0 15px 1px #ddd;
        }
    }
</style>
