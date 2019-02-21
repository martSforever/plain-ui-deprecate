<template>
    <div class="demo-navigator-page">
        <demo-row title="基本用法">
            <div class="demo-navigator-page-box">
                <link-navigator-page ref="baseNavigator">
                    <link-button label="打开页面1" @click="$refs.baseNavigator.push('/demo-navigator-page-1',{msg})"/>
                    <link-input v-model="msg"/>
                </link-navigator-page>
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