<template>
    <div class="pl-scroll-option-item" @click="$emit('click')" :style="styles">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "pl-scroll-option-item",
        props: {
            labelKey: {type: String},
            valueKey: {type: String},
            itemHeight: {type: Number, default: 24},
            itemNum: {type: Number, default: 3},

            index: {},
            scrollTop: {},
        },
        computed: {
            styles() {
                const styles = {
                    height: `${this.itemHeight}px`
                }
                if (this.index != null) {
                    const deg = ((Math.abs((this.scrollTop - (this.index * this.itemHeight))) / this.itemHeight).toFixed(1) - 0) * (100 / (this.itemNum * 2))
                    styles.transform = `rotateX(${deg}deg)`
                }
                return styles
            },
        },
    }
</script>

<style lang="scss">

</style>