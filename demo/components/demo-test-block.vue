<template>
    <div class="demo-test-block">
        <demo-row>
            <demo-block/>
        </demo-row>
        <span>{{ssss}}</span>
    </div>
</template>

<script>
    export default {
        name: "demo-test-block",
        data() {
            return {
                ssss: 'hel\nlo'
            }
        },
    }
</script>

<style lang="scss">

</style>