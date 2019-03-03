<template>
    <div class="demo-date">
        <pl-date-day-panel :current-date="current"/>
    </div>
</template>

<script>
    import PlDateYearPanel from "../../src/components/date/pl-date-year-panel";
    import PlDateDayPanel from "../../src/components/date/pl-date-day-panel";

    export default {
        name: "demo-date",
        components: {PlDateDayPanel, PlDateYearPanel},
        data() {
            const current = new Date()
            current.setDate(current.getDate() + 1)
            return {
                current
            }
        },
    }
</script>

<style lang="scss">

</style>