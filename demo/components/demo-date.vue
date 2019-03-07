<template>
    <div class="demo-date">
        <demo-row :title="`普通用法:${val[0]}`">
            <link-date v-model="val[0]" max="2020-05-05" min="2018-01-01"/>
        </demo-row>
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