<template>
    <div class="demo-time">
        <demo-row :title="`基本用法：${val[0]}`">
            <pl-time-panel v-model="val[0]"/>
        </demo-row>
    </div>
</template>

<script>
    import PlTimePanel from "../../src/components/time/pl-time-panel";

    export default {
        name: "demo-time",
        components: {PlTimePanel},
        data() {
            return {
                val: {},
            }
        },
    }
</script>

<style lang="scss">

</style>