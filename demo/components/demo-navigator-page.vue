<template>
    <div class="demo-navigator-page">
        <demo-row title="基本用法">
            <div class="demo-navigator-page-box">
                <link-navigator-page ref="baseNavigator" id="abc" :root="{path:'/demo-navigator-page-1'}"/>
            </div>
        </demo-row>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        name: "demo-navigator-page",
        data() {
            return {
                msg: null,
            }
        },
        mounted() {
            this.$set(Vue.prototype, 'baseNavigator', this.$refs.baseNavigator)
        },
    }
</script>

<style lang="scss">
    .demo-navigator-page {
        .demo-navigator-page-box {
            height: 200px;
            box-shadow: 0 0 15px 1px #ddd;
        }
    }
</style>