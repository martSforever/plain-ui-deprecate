<template>
    <div class="pl-markdown-parser-item-closer" @click="e=>$emit('click',e)" v-show="show">
        <link-button :prefix-icon="!open?'pl-double-arrow-down':'pl-double-arrow-up'" icon-only box-color="info" box-type="none"/>
    </div>
</template>

<script>
    export default {
        name: "pl-markdown-parser-item-closer",
        props: {
            show: {type: Boolean, default: false},
            open: {type: Boolean, default: false},
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
        background: linear-gradient(to top, rgba(#ddd, 0.3), transparent);
        display: flex;
        align-items: flex-end;
        justify-content: center;
    }
</style>