<template>
    <div class="pl-time-panel">
        <pl-time-spin/>
    </div>
</template>

<script>
    import PlTimeSpin from "./pl-time-spin";

    export default {
        name: "pl-time-panel",
        components: {PlTimeSpin},
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

</style>