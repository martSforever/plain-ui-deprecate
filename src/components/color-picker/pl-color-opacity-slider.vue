<template>
    <div class="pl-color-opacity-slider" :style="styles">
    </div>
</template>

<script>
    export default {
        name: "pl-color-opacity-slider",
        props: {
            color: {},
            opacity: {},
        },
        computed: {
            styles() {
                return {
                    background: `linear-gradient(to left, ${this.color}, #ffffff00)`,
                }
            },
        },
    }
</script>

<style lang="scss">
    .pl-color-opacity-slider {
        width: 100%;
        height: 10px;
        position: relative;
        cursor: pointer;
    }
</style>