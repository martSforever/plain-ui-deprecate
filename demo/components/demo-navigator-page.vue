<template>
    <div class="demo-navigator-page">
        <demo-row title="基本用法">
            <div class="demo-navigator-page-box">
                <link-navigator-page ref="baasicNavigator">
                    <link-button label="打开【Icon图标】页面" @click="$refs.baasicNavigator.push('/demo-icon')"/>
                </link-navigator-page>
            </div>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-navigator-page"
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