<template>
    <div class="demo-badge">
        <demo-row title="基本用法">
            <link-badge :data="12">
                <link-button label="消息"/>
            </link-badge>
        </demo-row>
        <demo-row title="颜色">
            <link-badge :data="12" color="primary">
                <link-button label="消息"/>
            </link-badge>
            <link-badge :data="12" color="warn">
                <link-button label="消息"/>
            </link-badge>
            <link-badge :data="12" color="success">
                <link-button label="消息"/>
            </link-badge>
            <link-badge :data="12" color="error">
                <link-button label="消息"/>
            </link-badge>
            <link-badge :data="12" color="info">
                <link-button label="消息"/>
            </link-badge>
        </demo-row>
        <demo-row title="位置">
            <link-badge :data="12" :bottom="false" :start="true">
                <link-button label="消息"/>
            </link-badge>
            <link-badge :data="12" :bottom="false" :start="false">
                <link-button label="消息"/>
            </link-badge>
            <link-badge :data="12" :bottom="true" :start="true">
                <link-button label="消息"/>
            </link-badge>
            <link-badge :data="12" :bottom="true" :start="false">
                <link-button label="消息"/>
            </link-badge>
        </demo-row>
        <demo-row title="只要小红点">
            <link-badge dot>
                <link-button label="消息"/>
            </link-badge>
        </demo-row>
        <demo-row title="最大值">
            <link-badge :max="99" :data="200">
                <link-button label="消息"/>
            </link-badge>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-badge"
    }
</script>

<style lang="scss">
    .demo-badge {

    }
</style>