<template>
    <div class="pl-time-panel">
        <div class="pl-time-panel-label-wrapper">
            <div class="pl-time-panel-label">{{timeString}}</div>
        </div>
        <div class="pl-time-spin-wrapper">
            <pl-time-spin :num="24" :width="width" v-model="hour"/>
            <pl-time-spin :num="60" :width="width" v-model="minute"/>
            <pl-time-spin :num="60" :width="width" v-model="second"/>
        </div>
    </div>
</template>

<script>
    import PlTimeSpin from "./pl-time-spin";

    export default {
        name: "pl-time-panel",
        components: {PlTimeSpin},
        props: {
            width: {default: 50},
        },
        data() {
            return {
                hour: 0,
                minute: 10,
                second: 0,
            }
        },
        computed: {
            timeString() {
                return `${this.$plain.$utils.zeroize(this.hour)} : ${this.$plain.$utils.zeroize(this.minute)} : ${this.$plain.$utils.zeroize(this.second)}`
            },
        },
    }
</script>

<style lang="scss">
    .pl-time-panel {
        @include public-style;
        display: inline-block;
        .pl-time-panel-label-wrapper {
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 1;
            .pl-time-panel-label {
                height: 100%;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: white;
                z-index: 2;
            }
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 1px;
                z-index: 1;
                box-shadow: 0 0 15px 1px #ddd;
            }
        }
        .pl-time-spin-wrapper {
            display: inline-flex;
            align-items: center;
            position: relative;
            z-index: 0;
        }
    }
</style>