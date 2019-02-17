<template>
    <div class="pl-color" :style="styles">
        <div class="pl-color-inner" :style="innerStyles"></div>
    </div>
</template>

<script>
    export default {
        name: "pl-color",
        props: {
            color: {},
            length: {type: Number, default: 24},
            round: {type: Boolean, default: true},
        },
        data() {
            return {
                backgroundImage: require('src/asserts/opacity.png'),

            }
        },
        computed: {
            styles() {
                const styles = {
                    width: this.$plain.$utils.unit(this.length),
                    height: this.$plain.$utils.unit(this.length),
                    backgroundImage:`url(${this.backgroundImage})`
                }
                this.round && (styles.borderRadius = this.$plain.$utils.unit(this.length))
                return styles
            },
            innerStyles() {
                return {
                    backgroundColor: this.color,
                }
            },
        },
    }
</script>

<style lang="scss">
    .pl-color {
        overflow: hidden;
        background-size: 10px;
        .pl-color-inner {
            height: 100%;
            width: 100%;
        }
    }
</style>