<template>
    <div class="pl-time-panel">
        <pl-time-spin :num="24" :width="width"/>
        <pl-time-spin :num="60" :width="width"/>
        <pl-time-spin :num="60" :width="width"/>
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
                hoursData: [],
                minuteData: [],
                secondData: [],
            }
        },
    }
</script>

<style lang="scss">
    .pl-time-panel {
        display: flex;
        align-items: center;
    }
</style>