<template>
    <div class="demo-tooltip">
        <demo-row title="提示内容">
            <link-input v-model="input"/>
        </demo-row>
        <demo-row title="基本用法">
            <span v-link-tooltip="input">基本用法</span>
        </demo-row>
        <demo-row title="带箭头">
            <link-button v-link-tooltip="{content:input,arrow:true}" label="带箭头提示框"/>
        </demo-row>
        <demo-row title="方向位置">
            <link-button-group>
                <link-button v-link-tooltip="{content:input,placement:'top'}" label="上"/>
                <link-button v-link-tooltip="{content:input,placement:'bottom'}" label="下"/>
                <link-button v-link-tooltip="{content:input,placement:'right'}" label="右"/>
                <link-button v-link-tooltip="{content:input,placement:'left'}" label="左"/>
            </link-button-group>
        </demo-row>
        <demo-row title="触发的方式">
            <link-button v-link-tooltip="{content:input,trigger:'click'}" label="click"/>
            <link-button v-link-tooltip="{content:input,trigger:'focus'}" label="focus"/>
            <link-button v-link-tooltip="{content:input,trigger:'mouseenter'}" label="mouseenter"/>
            <link-button v-link-tooltip="{content:input,trigger:'manual'}" label="manual"/>
        </demo-row>
        <demo-row title="其他更多配置参考Tippy.js"/>
    </div>
</template>

<script>


    export default {
        name: "demo-tooltip",
        data() {
            return {
                input: '这把不亏',
            }
        },
    }
</script>

<style lang="scss">
    .demo-tooltip {

    }
</style>