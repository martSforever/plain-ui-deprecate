<template>
    <div class="lv-card" :style="styles" :class="[`lv-card-shadow-${shadow}`]">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "lv-card",
        props: {
            width: {default: '300px'},
            height: {default: '300px'},
            shadow: {type: String, default: 'always'},
        },
        computed: {
            styles() {
                const styles = {}
                this.width !== null && (styles.width = this.$lv.$utils.unit(this.width))
                this.height !== null && (styles.height = this.$lv.$utils.unit(this.height))
                return styles
            },
        },
    }
</script>

<style lang="scss">
    .lv-card {
        @include public-style;
        @include transition-all;
        border: $border;
        display: inline-block;
        &:hover {
            transform: scale(1.02);
        }

        &.lv-card-shadow-always {
            box-shadow: $box-shadow;
        }
        &.lv-card-shadow-hover {
            &:hover {
                box-shadow: $box-shadow;
            }
        }
        &.lv-card-shadow-never {
            box-shadow: initial;
        }
    }
</style>