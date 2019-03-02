<template>
    <div class="demo-date">
        <pl-date-day-panel/>
    </div>
</template>

<script>
    import PlDateYearPanel from "../../src/components/date/pl-date-year-panel";
    import PlDateDayPanel from "../../src/components/date/pl-date-day-panel";
    export default {
        name: "demo-date",
        components: {PlDateDayPanel, PlDateYearPanel}
    }
</script>

<style lang="scss">

</style>