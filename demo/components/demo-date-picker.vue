<template>
    <div class="demo-date-picker">
        demo-date-picker
        <div style="background-color: rebeccapurple;display: inline-flex">
            <link-icon icon="lv-date"/>hello world<link-icon icon="lv-search"/>
        </div>
    </div>
</template>

<script>

    export default {
        name: "demo-date-picker",
        mounted() {
            console.log(this.$plain.$utils.dateFormat(new Date(2015, 10, 20), 'YYYY-MM-DD hh:mm:ss'));
            console.log(this.$plain.$utils.dateFormat(this.$plain.$utils.dateParse('2018-12-10 14:11:12', 'YYYY-MM-DD HH:mm:ss'), 'YYYYMMDDHHmmss'));
        },
    }
</script>

<style lang="scss">

</style>