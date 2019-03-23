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
        <demo-row title="tooltip-text组件，超长省略号显示并且鼠标悬浮时tooltip显示">
            <demo-row-item title="基本用法">
                <link-tooltip-text :content="tooltipText"/>
            </demo-row-item>
            <div class="demo-tooltip-box">
                <link-tooltip-text content="tooltip-text组件，超长省略号显示并且鼠标悬浮时tooltip显示" showOverflowTooltip/>
            </div>
            <div class="demo-tooltip-box">
                <link-tooltip-text :content="tooltipText" showOverflowTooltip/>
            </div>
            <div>
                <link-input v-model="tooltipText"/>
            </div>
        </demo-row>
    </div>
</template>

<script>


    export default {
        name: "demo-tooltip",
        data() {
            return {
                input: '这把不亏',
                tooltipText: '非超长文本'
            }
        },
    }
</script>

<style lang="scss">
    .demo-tooltip {
        .demo-tooltip-box {
            width: 150px;
            background-color: #5c677b;
            color: white;
            &:not(:last-child) {
                margin-bottom: 12px;
            }
        }
    }
</style>