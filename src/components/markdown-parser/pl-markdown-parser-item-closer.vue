<template>
    <div class="pl-markdown-parser-item-closer" @click="e=>$emit('click',e)" v-show="show">
        <div class="pl-markdown-parser-item-closer-inner" :style="{width:`calc(100% - ${leftWidth}px)`}">
            <link-button :prefix-icon="!open?'pl-double-arrow-down':'pl-double-arrow-up'" icon-only box-type="none"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pl-markdown-parser-item-closer",
        props: {
            show: {type: Boolean, default: false},
            open: {type: Boolean, default: false},
            leftWidth: {},
        },
    }
</script>

<style lang="scss">
    .pl-markdown-parser-item-closer {
        @include transition-all;
        cursor: pointer;
        height: 50px;
        position: absolute;
        bottom: -2px;
        left: -1px;
        right: -1px;
        background: linear-gradient(to top, rgba(#eee, 0.3), transparent);
        display: flex;
        align-items: flex-end;
        justify-content: center;
        .pl-markdown-parser-item-closer-inner {
            float: right;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            position: absolute;
            right: 0;
        }
    }
</style>