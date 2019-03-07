<template>
    <div class="demo-date">
        <div>{{val[0]}}</div>
        <link-date v-model="val[0]" max="2019-05-05" min="2019-01-01"/>
    </div>
</template>

<script>
    import PlDateYearPanel from "../../src/components/date/pl-date-year-panel";
    import PlDateDayPanel from "../../src/components/date/pl-date-day-panel";
    import PlDatePanel from "../../src/components/date/pl-date-panel";

    export default {
        name: "demo-date",
        components: {PlDatePanel, PlDateDayPanel, PlDateYearPanel},
        data() {
            return {
                val: {
                    0: '2019-03-05'
                }
            }
        },
    }
</script>

<style lang="scss">

</style>