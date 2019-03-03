<template>
    <div class="pl-date-panel">
        <pl-date-header/>
        <div class="pl-date-panel-body">
            <pl-date-year-panel :value="current.getFullYear()"/>
            <!--<pl-date-day-panel :current-date="current" :start-date="start" :hover-date.sync="hoverDate"/>-->
        </div>
    </div>
</template>

<script>
    import PlDateDayPanel from "./pl-date-day-panel";
    import PlDateHeader from "./pl-date-header";
    import PlDateYearPanel from "./pl-date-year-panel";

    export default {
        name: "pl-date-panel",
        components: {PlDateYearPanel, PlDateHeader, PlDateDayPanel},
        data() {
            const now = new Date()
            now.setDate(now.getDate() + 1)
            const current = this.$plain.$utils.deepCopy(now)
            now.setDate(15)
            const start = this.$plain.$utils.deepCopy(now)
            now.setMonth(now.getMonth() + 1)
            now.setDate(5)
            const end = this.$plain.$utils.deepCopy(now)
            return {
                current,
                start,
                end,

                hoverDate: null,
            }
        },
    }
</script>

<style lang="scss">
    .pl-date-panel {
        @include public-style;
        width: 196px;
        display: inline-block;
        .pl-date-panel-body {
            width: 196px;
            height: 238px;
        }
    }
</style>